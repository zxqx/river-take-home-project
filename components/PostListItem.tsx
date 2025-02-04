import { Text, View, Image, StyleSheet } from 'react-native';
import { images } from '@/constants/images';
import { Post } from '@/types';

interface Props {
  post: Post;
}

export default function PostListItem({ post }: Props) {
  const getImageSource = (imageId: string) => {
    return images[imageId as keyof typeof images];
  };

  return (
    <View style={styles.container}>
      <Image source={getImageSource(post.imageId)} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{post.imageId}</Text>
        <Text style={styles.subtitle}>created by {post.createdById}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 48,
    height: 48,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    fontSize: 11.5,
  },
  subtitle: {
    fontSize: 11.5,
    color: '#999',
  },
});
