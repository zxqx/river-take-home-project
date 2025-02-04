import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import ImagePreview from '@/components/ImagePreview';
import { images } from '@/constants/images';
import { Post } from '@/types';

interface Props {
  post: Post;
}

export default function PostListItem({ post }: Props) {
  const image = images[post.imageId as keyof typeof images];

  return (
    <ImagePreview image={image}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{post.imageId}</Text>
          <Text style={styles.subtitle}>created by {post.createdById}</Text>
        </View>
      </View>
    </ImagePreview>
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
