import { FlatList, StyleSheet } from 'react-native';
import PostListItem from '@/components/PostListItem';
import { Post } from '@/types';

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      keyExtractor={(item) => item.postId}
      contentContainerStyle={styles.container}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 16,
    gap: 10,
  },
});
