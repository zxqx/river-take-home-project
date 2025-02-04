import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useState } from 'react';
import PostList from '@/components/PostList';
import PostGrid from '@/components/PostGrid';
import PostFeed from '@/components/PostFeed';
import { posts } from '@/sample-data/posts';

export default function Index() {
  const [activeTab, setActiveTab] = useState('all');

  const getTabStyle = (tab: string) => {
    return tab === activeTab ? { ...styles.headerText, ...styles.active } : styles.headerText;
  };

  const filteredPosts = posts.filter((post) => post.createdById === 'C');

  return (
    <View style={styles.container}>
      <View style={styles.safeArea} />
      <View style={styles.headerContainer}>
        <Pressable onPress={() => setActiveTab('all')}>
          <Text style={getTabStyle('all')}>All</Text>
        </Pressable>

        <Text style={{ ...styles.headerText, ...styles.separator }}>/</Text>

        <Pressable onPress={() => setActiveTab('filtered')}>
          <Text style={getTabStyle('filtered')}>Filtered</Text>
        </Pressable>
      </View>

      <PostFeed posts={activeTab === 'all' ? posts : filteredPosts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    height: 55,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
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
  },
  active: {
    color: '#000',
  },
});
