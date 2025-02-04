import { useState, createContext, cloneElement, Children, ReactElement } from 'react';
import { View, Pressable, StyleSheet, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

interface MenuContext {
  closeMenu: () => void;
  isLastItem: (index: number) => boolean;
}

export const MenuContext = createContext<MenuContext>({
  closeMenu: () => {},
  isLastItem: () => false,
});

export function Menu({ trigger, children }: Props) {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => setVisible(false);
  const insets = useSafeAreaInsets();

  const childrenList = Children.toArray(children);
  const isLastItem = (index: number) => index === childrenList.length - 1;

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>{trigger}</Pressable>

      <Modal visible={visible} transparent onRequestClose={closeMenu}>
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <MenuContext.Provider value={{ closeMenu, isLastItem }}>
            <View style={[styles.container, { top: insets.top + 40 }]}>
              {Children.map(children, (child, index) =>
                cloneElement(child as ReactElement, { index })
              )}
            </View>
          </MenuContext.Provider>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    right: 16,
    width: 118,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 4,
  },
});
