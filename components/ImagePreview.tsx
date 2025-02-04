import { useState } from 'react';
import { Modal, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

interface Props {
  image: number;
  children: React.ReactNode;
}

export default function ImagePreview({ image, children }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <TapGestureHandler
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.ACTIVE) {
            setIsModalVisible(true);
          }
        }}
        maxDurationMs={250}
        maxDist={10}
      >
        <Pressable>{children}</Pressable>
      </TapGestureHandler>

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
