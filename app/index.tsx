import { View, StyleSheet } from 'react-native';
import PostList from '@/components/PostList';
import PostGrid from '@/components/PostGrid';
import PostFeed from '@/components/PostFeed';
import { posts } from '@/sample-data/posts';

export default function Index() {
  return (
    <View style={styles.container}>
      <PostGrid posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
