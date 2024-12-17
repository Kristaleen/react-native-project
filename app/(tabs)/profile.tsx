import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { account, databases } from "../appwrite/appwriteConfig";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reactions, setReactions] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Fetch user details
  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
     
    }
  };

  // Fetch posts from Appwrite and filter by userName
  const fetchPosts = async () => {
    if (user) {
      try {
        const response = await databases.listDocuments(
          "674b25a90026b3ff8a21",
          "674b25d2001a880f2106"
        );
        const userPosts = response.documents.filter((post: any) => post.userName === user.name);
        setPosts(userPosts);
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const intervalId = setInterval(() => {
        fetchPosts(); // Re-fetch posts every 5 seconds
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [user]);

  const handleReaction = (postId: string, emoji: string) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: emoji,
    }));
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      try {
        await databases.deleteDocument("674b25a90026b3ff8a21", "674b25d2001a880f2106", postToDelete);
        setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== postToDelete));
      } catch (error) {
        
      } finally {
        setModalVisible(false);
        setPostToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setPostToDelete(null);
  };

  const renderPost = ({ item }: { item: any }) => {
    return (
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/profile.jpg")} // Modify to user-specific image if available
            style={styles.profilePic}
          />
          <Text style={styles.name}>{item.userName || "Anonymous"}</Text>
        </View>
        <Text style={styles.postText}>{item.text}</Text>
        {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
        <View style={styles.emojisContainer}>
          {["😀", "😠", "❤️", "😢", "😱"].map((emoji) => (
            <TouchableOpacity
              key={emoji}
              style={styles.emojiButton}
              onPress={() => handleReaction(item.$id, emoji)}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.reactionText}>
          {reactions[item.$id] ? `You reacted with ${reactions[item.$id]}` : "No reaction yet"}
        </Text>
        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            setPostToDelete(item.$id);
            setModalVisible(true);
          }}
        >
          <Ionicons name="trash-bin" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitial}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.profileName}>{user?.name || "Loading..."}</Text>
        </View>

        {/* Posts Section */}
        <View style={styles.postsContainer}>
          <Text style={styles.subheading}>My Posts</Text>

          {loading ? (
            <Text style={styles.loadingText}>Loading posts...</Text>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item) => item.$id}
            />
          )}
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete this post?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={handleDeletePost}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelDelete}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -32,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  profileSection: {
    backgroundColor: "#F08A5D",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 1,
  },
  profileImagePlaceholder: {
    backgroundColor: "#FFD460",
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileInitial: {
    fontSize: 30,
    color: "#fff",
  },
  profileName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  postsContainer: {
    flex: 1,
    padding: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  postContainer: {
    backgroundColor: "#FAE1C4",
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  postText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
  postImage: {
    width: "113.13%",
    height: 350,
    marginLeft: -20,
    marginTop: 10,
  },
  emojisContainer: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between", 
    width: "30%",
  },
  emojiButton: {
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: -5
  },
  emojiText: {
    fontSize: 28,
  },
  reactionText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#E74C3C",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#58B19F",
    width: 120,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default Profile;
