import { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Header from '@/components/Header';
import PostList from '@/components/PostList';
import PostGrid from '@/components/PostGrid';
import PostFeed from '@/components/PostFeed';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { posts } from '@/constants/posts';

const VIEW_TYPES = {
  list: PostList,
  grid: PostGrid,
  feed: PostFeed,
};

const { width } = Dimensions.get('window');

export default function Index() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'feed' | 'list' | 'grid'>('feed');
  const { translateX, gestureHandler, animatedStyle } = useSwipeGesture({ onSwipe: setActiveTab });

  const filteredPosts = posts.filter((post) => post.createdById === 'C');
  const PostComponent = VIEW_TYPES[viewMode];

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <Header
          activeTab={activeTab}
          viewMode={viewMode}
          setActiveTab={setActiveTab}
          setViewMode={setViewMode}
          translateX={translateX}
        />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.feedContainer, animatedStyle]}>
            <View style={styles.pageContainer}>
              <PostComponent posts={posts} />
            </View>

            <View style={styles.pageContainer}>
              <PostComponent posts={filteredPosts} />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
