import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import PostFeed from '@/components/PostFeed';
import { posts } from '@/sample-data/posts';

const { width } = Dimensions.get('window');
const SPRING_CONFIG = { damping: 20, stiffness: 90 };

export default function Index() {
  const [activeTab, setActiveTab] = useState('all');
  const translateX = useSharedValue(0);

  const filteredPosts = posts.filter((post) => post.createdById === 'C');

  const updateActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
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

      runOnJS(updateActiveTab)(shouldSnapToEnd ? 'filtered' : 'all');
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const getTabStyle = (tab: string) => {
    return tab === activeTab ? { ...styles.headerText, ...styles.active } : styles.headerText;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.safeArea} />
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => {
            translateX.value = withSpring(0, SPRING_CONFIG);
            setActiveTab('all');
          }}
        >
          <Text style={getTabStyle('all')}>All</Text>
        </Pressable>

        <Text style={{ ...styles.headerText, ...styles.separator }}>/</Text>

        <Pressable
          onPress={() => {
            translateX.value = withSpring(-width, SPRING_CONFIG);
            setActiveTab('filtered');
          }}
        >
          <Text style={getTabStyle('filtered')}>Filtered</Text>
        </Pressable>
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.feedContainer, animatedStyle]}>
          <View style={styles.pageContainer}>
            <PostFeed posts={posts} />
          </View>
          <View style={styles.pageContainer}>
            <PostFeed posts={filteredPosts} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    height: 55,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  headerText: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.3,
    color: '#999',
  },
  separator: {
    marginHorizontal: 8,
  },
  active: {
    color: '#000',
  },
  feedContainer: {
    flex: 1,
    flexDirection: 'row',
    width: width * 2,
  },
  pageContainer: {
    width: width,
  },
});
