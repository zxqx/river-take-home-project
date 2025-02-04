import { Text, View, Image, StyleSheet } from 'react-native';
import ImagePreview from '@/components/ImagePreview';
import { Post } from '@/types';
import { images } from '@/constants/images';

interface Props {
  post: Post;
}

export default function PostGridItem({ post }: Props) {
  const image = images[post.imageId as keyof typeof images];

  return (
    <View style={styles.container}>
      <ImagePreview image={image}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>created by {post.createdById}</Text>
        </View>
      </ImagePreview>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  textContainer: {
    paddingTop: 8,
  },
  title: {
    fontSize: 11.5,
  },
});
