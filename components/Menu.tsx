import { useState, createContext } from 'react';
import { View, Pressable, StyleSheet, Modal } from 'react-native';
import React from 'react';

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

  const childrenList = React.Children.toArray(children);
  const isLastItem = (index: number) => index === childrenList.length - 1;

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>{trigger}</Pressable>
      <Modal visible={visible} transparent onRequestClose={closeMenu}>
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <MenuContext.Provider value={{ closeMenu, isLastItem }}>
            <View style={styles.menuContainer}>
              {React.Children.map(children, (child, index) =>
                React.cloneElement(child as React.ReactElement, { index })
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
  menuContainer: {
    position: 'absolute',
    top: 100,
    right: 16,
    width: 118,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 4,
  },
});
