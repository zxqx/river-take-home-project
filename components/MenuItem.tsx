import { useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MenuContext } from '@/components/Menu';

interface MenuItemProps {
  onPress: () => void;
  selected?: boolean;
  children: React.ReactNode;
  index?: number;
}

export function MenuItem({ onPress, selected, children, index = 0 }: MenuItemProps) {
  const { closeMenu, isLastItem } = useContext(MenuContext);

  const handlePress = () => {
    onPress();
    closeMenu();
  };

  return (
    <Pressable
      style={[styles.menuItem, isLastItem(index) && styles.lastMenuItem]}
      onPress={handlePress}
    >
      <Text style={[styles.menuItemText, selected && styles.selectedMenuItemText]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 11.5,
    color: '#999',
  },
  selectedMenuItemText: {
    color: '#000',
  },
});
