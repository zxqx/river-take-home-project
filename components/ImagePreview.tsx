import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Dimensions } from 'react-native';
import { TapGestureHandler, State, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface Props {
  image: number;
  children: React.ReactNode;
}

export default function ImagePreview({ image, children }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * baseScale.value }],
  }));

  return (
    <>
      <TapGestureHandler
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.ACTIVE) {
            setIsModalVisible(true);
          }
        }}
        maxDurationMs={250}
        maxDist={10}
      >
        <Pressable>{children}</Pressable>
      </TapGestureHandler>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
          setTimeout(() => {
            scale.value = 1;
            baseScale.value = 1;
          }, 300);
        }}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => {
            setIsModalVisible(false);
            setTimeout(() => {
              scale.value = 1;
              baseScale.value = 1;
            }, 300);
          }}
        >
          <PinchGestureHandler
            onGestureEvent={(event) => {
              scale.value = event.nativeEvent.scale;
            }}
            onEnded={() => {
              baseScale.value = scale.value * baseScale.value;
              scale.value = 1;
            }}
          >
            <Animated.Image source={image} style={[styles.modalImage, animatedStyle]} />
          </PinchGestureHandler>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
  },
  modalImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
