import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Client, Account, Databases } from 'react-native-appwrite';

// Initialize Appwrite Client and Account
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
  .setProject('674b11a0000e39b3d48f'); // Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);

interface Post {
  id: string;
  name: string; // User's name
  post: string; // Post content
  image: string | null; // Post image URL or null
}

export default function HomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [reactions, setReactions] = useState<{ [key: string]: string }>({}); // Store reactions for each post

  // Fetch posts from Appwrite database
  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments(
        '674b25a90026b3ff8a21', // Database ID
        '674b25d2001a880f2106'  // Collection ID
      );

      // Map fetched data to our Post interface
      const postList = response.documents.map((doc: any) => ({
        id: doc.$id,
        name: doc.userName || 'Anonymous',
        post: doc.text,
        image: doc.image || null,
      }));

      setPosts(postList); // Set the state with the fetched posts
    } catch (error) {
      
    }
  };

  // Polling the posts every 5 seconds
  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts

    const intervalId = setInterval(() => {
      fetchPosts(); // Re-fetch posts every 5 seconds
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Log out the current session
      router.push('/'); // Redirect to the login (or splash) page
    } catch (error) {

      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  // Handle emoji reaction
  const handleReaction = (postId: string, emoji: string) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: emoji,
    }));
  };

  // Render each post
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/profile.jpg')} style={styles.profilePic} />
        <Text style={styles.name}>{item.name}</Text>
        <FontAwesome name="share-alt" size={18} color="#333" />
      </View>
      <Text style={styles.postText}>{item.post}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      <View style={styles.emojisContainer}>
        {['😀', '😠', '❤️', '😢', '😱'].map((emoji) => (
          <TouchableOpacity
            key={emoji}
            style={styles.emojiButton}
            onPress={() => handleReaction(item.id, emoji)}
          >
            <Text style={styles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.reactionText}>
        {reactions[item.id] ? `You reacted with ${reactions[item.id]}` : 'No reaction yet'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={25} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  emojisContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  emojiButton: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 24,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 90,
    left: 30,
    backgroundColor: '#ED802A',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  reactionText: {
    marginTop: 10,
    fontSize: 15,
    color: '#333',
  },
});
