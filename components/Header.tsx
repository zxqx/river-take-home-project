import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import Animated, { withSpring } from 'react-native-reanimated';
import { Menu } from '@/components/Menu';
import { MenuItem } from '@/components/MenuItem';

const SPRING_CONFIG = { damping: 20, stiffness: 90 };
const { width } = Dimensions.get('window');

interface Props {
  activeTab: string;
  viewMode: 'list' | 'grid' | 'feed';
  setViewMode: (mode: 'list' | 'grid' | 'feed') => void;
  setActiveTab: (tab: string) => void;
  translateX: Animated.SharedValue<number>;
}

export default function Header({
  activeTab,
  viewMode,
  setViewMode,
  setActiveTab,
  translateX,
}: Props) {
  const getTabStyle = (tab: string) => {
    return tab === activeTab ? [styles.headerText, styles.active] : styles.headerText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => {
            translateX.value = withSpring(0, SPRING_CONFIG);
            setActiveTab('all');
          }}
        >
          <Text style={getTabStyle('all')}>All</Text>
        </Pressable>

        <Text style={[styles.headerText, styles.separator]}>/</Text>

        <Pressable
          onPress={() => {
            translateX.value = withSpring(-width, SPRING_CONFIG);
            setActiveTab('filtered');
          }}
        >
          <Text style={getTabStyle('filtered')}>Filtered</Text>
        </Pressable>
      </View>

      <Menu trigger={<Text style={styles.menuTrigger}>...</Text>}>
        <MenuItem onPress={() => setViewMode('list')} selected={viewMode === 'list'}>
          List
        </MenuItem>
        <MenuItem onPress={() => setViewMode('grid')} selected={viewMode === 'grid'}>
          Grid
        </MenuItem>
        <MenuItem onPress={() => setViewMode('feed')} selected={viewMode === 'feed'}>
          Feed
        </MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  headerText: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.3,
    color: '#999',
  },
  separator: {
    marginHorizontal: 8,
    color: '#000',
  },
  active: {
    color: '#000',
  },
  tabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTrigger: {
    marginTop: 0,
    paddingHorizontal: 8,
    fontSize: 15,
    color: '#000',
    lineHeight: 15,
  },
});
