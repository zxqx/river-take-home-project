import { FlatList, View, StyleSheet } from 'react-native';
import PostFeedItem from '@/components/PostFeedItem';
import { Post } from '@/types';

interface Props {
  posts: Post[];
}

export default function PostFeed({ posts }: Props) {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostFeedItem post={item} />}
      keyExtractor={(item) => item.postId}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  contentContainer: {
    paddingTop: 10,
  },
  columnWrapper: {
    gap: 16,
  },
  separator: {
    height: 20,
  },
});
