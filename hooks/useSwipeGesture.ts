import { Dimensions } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SPRING_CONFIG = { damping: 20, stiffness: 90 };

interface Props {
  onSwipe: (tab: string) => void;
}

type GestureContext = {
  startX: number;
};

export const useSwipeGesture = ({ onSwipe }: Props) => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureContext>({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.startX + event.translationX;
      translateX.value = Math.min(Math.max(newValue, -width), 0);
    },
    onEnd: (event) => {
      const shouldSnapToEnd =
        event.velocityX < -500 ||
        (event.velocityX >= -500 && event.velocityX <= 500 && translateX.value < -width / 2);

      translateX.value = withSpring(shouldSnapToEnd ? -width : 0, SPRING_CONFIG);
      runOnJS(onSwipe)(shouldSnapToEnd ? 'filtered' : 'all');
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { translateX, gestureHandler, animatedStyle };
};
