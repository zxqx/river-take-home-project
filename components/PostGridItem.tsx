import { Text, View, Image, StyleSheet } from 'react-native';
import { Post } from '@/types';
import { images } from '@/constants/images';

interface Props {
  post: Post;
}

export default function PostGridItem({ post }: Props) {
  const getImageSource = (imageId: string) => {
    return images[imageId as keyof typeof images];
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={getImageSource(post.imageId)} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>created by {post.createdById}</Text>
      </View>
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
