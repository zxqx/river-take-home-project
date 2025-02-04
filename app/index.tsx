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
import PostList from '@/components/PostList';
import PostGrid from '@/components/PostGrid';
import PostFeed from '@/components/PostFeed';
import { posts } from '@/sample-data/posts';
import { Menu } from '@/components/Menu';
import { MenuItem } from '@/components/MenuItem';

const { width } = Dimensions.get('window');
const SPRING_CONFIG = { damping: 20, stiffness: 90 };

export default function Index() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'feed' | 'list' | 'grid'>('feed');
  const translateX = useSharedValue(0);

  const filteredPosts = posts.filter((post) => post.createdById === 'C');

  const PostComponent = {
    feed: PostFeed,
    list: PostList,
    grid: PostGrid,
  }[viewMode];

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
        <View style={styles.tabContainer}>
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

        <Menu trigger={<Text style={styles.menuTrigger}>...</Text>}>
          <MenuItem onPress={() => setViewMode('list')} selected={viewMode === 'list'}>
            List
          </MenuItem>
          <MenuItem onPress={() => setViewMode('grid')} selected={viewMode === 'grid'}>
            Grid
          </MenuItem>
          <MenuItem onPress={() => setViewMode('feed')} selected={viewMode === 'feed'}>
            Feed
          </MenuItem>
        </Menu>
      </View>

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
    marginTop: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    justifyContent: 'flex-end',
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
  tabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTrigger: {
    marginTop: 0,
    fontSize: 15,
    paddingHorizontal: 8,
    color: '#000',
    lineHeight: 15,
  },
});
