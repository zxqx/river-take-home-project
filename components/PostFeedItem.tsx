import { Text, View, Image, StyleSheet } from 'react-native';
import ImagePreview from '@/components/ImagePreview';
import { images } from '@/constants/images';
import { Post } from '@/types';

interface Props {
  post: Post;
}

export default function PostFeedItem({ post }: Props) {
  const image = images[post.imageId as keyof typeof images];

  return (
    <ImagePreview image={image}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>created by {post.createdById}</Text>
          <Text style={styles.subtitle}>{post.caption}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
      </View>
    </ImagePreview>
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
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingLeft: 10,
    paddingBottom: 12,
  },
  title: {
    fontSize: 11.5,
  },
  subtitle: {
    fontSize: 11.5,
    color: '#999',
  },
});
