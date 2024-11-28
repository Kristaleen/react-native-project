import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    name: 'Bojan Tunguz',
    post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('@/assets/images/sample-image.jpg'), // Replace with your image
  },
  {
    id: '2',
    name: 'Bojan Tunguz',
    post: 'Another post here. Lorem ipsum dolor sit amet.',
    image: require('@/assets/images/sample-image.jpg'), // Replace with your image
  },
];

export default function HomePage() {
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/profile.jpg')} style={styles.profilePic} />
        <Text style={styles.name}>{item.name}</Text>
        <FontAwesome name="share-alt" size={18} color="#333" />
      </View>
      <Text style={styles.postText}>{item.post}</Text>
      <View style={styles.emojisContainer}>
        <Text>😀 😠 ❤️ 😢 😱</Text>
      </View>
      <TextInput style={styles.commentInput} placeholder="Leave a comment" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <FontAwesome name="search" size={20} color="#333" />
        <TextInput style={styles.searchInput} placeholder="Search" />
        <FontAwesome name="user-circle" size={20} color="#333" />
      </View>

      {/* Posts List */}
      <FlatList
        data={data}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />

      {/* Add Post Button */}
      <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#77A98A',
  },
  searchInput: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  postContainer: {
    backgroundColor: '#FFE5B0',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  postText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  emojisContainer: {
    marginTop: 10,
  },
  commentInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 15,
    height: 40,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ED802A',
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

