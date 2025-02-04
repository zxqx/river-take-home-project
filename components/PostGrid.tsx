import { FlatList, View, StyleSheet } from 'react-native';
import PostGridItem from '@/components/PostGridItem';
import { Post } from '@/types';

interface Props {
  posts: Post[];
}

export default function PostGrid({ posts }: Props) {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostGridItem post={item} />}
      keyExtractor={(item) => item.postId}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
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
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  columnWrapper: {
    gap: 16,
  },
  separator: {
    height: 24,
  },
});
