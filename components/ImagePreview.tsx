import { useState } from 'react';
import { TouchableOpacity, Modal, Image, Pressable, StyleSheet, Dimensions } from 'react-native';

interface Props {
  image: number;
  children: React.ReactNode;
}

export default function ImagePreview({ image, children }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} activeOpacity={1}>
        {children}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable style={styles.modalContainer} onPress={() => setIsModalVisible(false)}>
          <Image source={image} style={styles.modalImage} />
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
  },
  modalImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
