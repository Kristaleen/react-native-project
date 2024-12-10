import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert } from 'react-native';
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
  feeling: string; // User's feeling (Happy, Sad, Excited, etc.)
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
        feeling: doc.feeling || 'Nothing', // Add feeling data
      }));

      setPosts(postList); // Set the state with the fetched posts
    } catch (error) {
      console.error(error);
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
      {/* Feeling box */}
      <View style={styles.feelingBox}>
        <Text style={styles.feelingText}>Feeling: {item.feeling}</Text>
      </View>
      <View style={styles.header}>
        <Image source={require('@/assets/images/profile.jpg')} style={styles.profilePic} />
        <Text style={styles.name}>{item.name}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fc', // Light grayish-blue background
    paddingTop: 10,
  },
  postContainer: {
    backgroundColor: '#FAE1C4', // White background for posts
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  feelingBox: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFCCBC', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  feelingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D32F2F', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
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
    color: '#333',
  },
  postText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 15,
  },
  emojisContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
  },
  emojiButton: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  emojiText: {
    fontSize: 28,
  },
  reactionText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
});
