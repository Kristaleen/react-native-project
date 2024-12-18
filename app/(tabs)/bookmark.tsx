import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Bookmarks = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>FeelTok</Text>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bookmarks Section */}
      <View style={styles.bookmarksContainer}>
        <Text style={styles.subheading}>My Bookmarks</Text>

        {/* Bookmark Card */}
        <View style={styles.card}>
          {/* User Info */}
          <View style={styles.cardHeader}>
            <View style={styles.userIcon}>
              <Text style={styles.userInitial}>B</Text>
            </View>
            <Text style={styles.userName}>Bojan Tunguz</Text>
            <TouchableOpacity style={styles.shareIcon}>
              <Ionicons name="share-social-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Image */}
          <Image
            source={{ uri: "https://via.placeholder.com/300x150" }}
            style={styles.postImage}
          />

          {/* Emojis */}
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>😀</Text>
            <Text style={styles.emoji}>😡</Text>
            <Text style={styles.emoji}>❤️</Text>
            <Text style={styles.emoji}>😮</Text>
            <Text style={styles.emoji}>😢</Text>
            <Text style={styles.emoji}>🤯</Text>
          </View>

          {/* Comment Section */}
          <TextInput
            style={styles.commentInput}
            placeholder="Leave a comment"
            placeholderTextColor="#aaa"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE1C4",
  },
  header: {
    backgroundColor: "#58B19F",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bookmarksContainer: {
    flex: 1,
    padding: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#C36922",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    backgroundColor: "#FFD460",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  userInitial: {
    fontSize: 16,
    color: "#fff",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  shareIcon: {
    marginLeft: "auto",
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Bookmarks;
