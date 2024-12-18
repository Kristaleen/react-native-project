import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 
import { account } from "../appwrite/appwriteConfig";

const Admin = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  const mockPosts = [
    {
      id: "1",
      user: "Blue Actuals",
      content: "Beautiful sunset on the beach!",
      image: "https://via.placeholder.com/300",
      timestamp: "3:33 PM",
    },
    {
      id: "2",
      user: "Bread Actual",
      content: "Had an amazing hike today!",
      image: "https://via.placeholder.com/300",
      timestamp: "2:22 PM",
    },
    {
      id: "3",
      user: "Clues Blues",
      content: "Loving the new coffee shop downtown!",
      image: "https://via.placeholder.com/300",
      timestamp: "4:44 PM",
    },
    {
      id: "4",
      user: "Actual Blue",
      content: "Exploring a hidden waterfall in the forest!",
      image: "https://via.placeholder.com/300",
      timestamp: "1:11 PM",
    },
  ];

  const deletePost = (postId: string) => {
    console.log(`Post with ID: ${postId} deleted`);
  };
  
  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Log out user
      router.push("/"); // Redirect to home
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    } finally {
      setIsMenuVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Menu */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Dashboard</Text>
        <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Pop-up Menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuHeader}>Menu</Text>
            <Button title="Logout" color="#ff5252" onPress={handleLogout} />
            <Button
              title="Close"
              onPress={() => setIsMenuVisible(false)}
              color="#58B19F"
            />
          </View>
        </View>
      </Modal>

      {/* Posts */}
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* User Info */}
            <View style={styles.cardHeader}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              <TouchableOpacity onPress={() => deletePost(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#ff5252" />
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <Text style={styles.content}>{item.content}</Text>

            {/* Image (if exists) */}
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.postImage}
                resizeMode="cover"
              />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE1C4",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#58B19F",
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  user: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#777",
  },
  content: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Admin;
