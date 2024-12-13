import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { account, databases, storage } from "../appwrite/appwriteConfig";
import { ID, Permission, Role } from "react-native-appwrite";

export default function CreatePost() {
  const [text, setText] = useState<string>("");
  const [selectedFeeling, setSelectedFeeling] = useState<string>("Nothing");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserName(user.name || "Unknown User");
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to fetch user data.");
      }
    };
    fetchUser();
  }, []);

  const handleAddPhoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Permission to access media library is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1, // Reduced quality for better upload performance
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        console.log("Selected image URI:", asset);

        setImage(asset);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const uploadImage = async (file: ImagePicker.ImagePickerAsset) => {
    try {
      const fileType = file.type;
      const uri = file.uri;
      const fileSize = file.fileSize;
      const fileName = file.fileName;

      if (fileSize && fileSize && uri && fileName && fileType) {
        const result = await storage.createFile(
          "6751dc3c000511b022fb",
          `${ID.unique()}.${file.uri.split(".")[1]}`,
          {
            name: `${ID.unique()}.${file.uri.split(".")[1]}`,
            type: fileType,
            size: fileSize,
            uri: uri,
          },
          [Permission.read(Role.any())]
        );

        console.log(result);

        return `https://cloud.appwrite.io/v1/storage/buckets/6751dc3c000511b022fb/files/${result.$id}/view?project=674b11a0000e39b3d48f&project=674b11a0000e39b3d48f&mode=admin`;
      }
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const handlePost = async () => {
    // Indicate that the process is in progress
    setIsLoading(true);
    try {
      // Validate that the text is not empty
      if (!text.trim()) {
        Alert.alert("Error", "Please enter some text.");
        setIsLoading(false);
        return;
      }

      if (image) {
        const imageId = await uploadImage(image);

        if (!imageId) {
          Alert.alert(
            "Warning",
            "Failed to upload image, but continuing with text post."
          );
        }

        await databases.createDocument(
          "674b25a90026b3ff8a21",
          "674b25d2001a880f2106",
          ID.unique(),
          {
            text,
            image: imageId,
            feeling: selectedFeeling,
            userName,
            date: new Date().toISOString(),
          }
        );
      }

      Alert.alert("Success", "Post created successfully!");
      setText("");
      setSelectedFeeling("Nothing");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const feelings = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "🤩", value: "Excited" },
    { emoji: "😡", value: "Angry" },
    { emoji: "😐", value: "Nothing" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.postBox}>
          <Text style={styles.header}>Create Post</Text>

          <View style={styles.feelingSelector}>
            <Text style={styles.feelingLabel}>Choose your feeling:</Text>

            <View style={styles.feelingsContainer}>
              {feelings.map(({ emoji, value }) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.feelingButton,
                    selectedFeeling === value && styles.selectedFeelingButton,
                  ]}
                  onPress={() => setSelectedFeeling(value)}
                >
                  <Text
                    style={[
                      styles.feelingButtonText,
                      selectedFeeling === value && styles.selectedFeelingText,
                    ]}
                  >
                    {emoji}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Write your thoughts here..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
            multiline
          />

          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={handleAddPhoto}
          >
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.addPhotoText}>Add Photo</Text>
            )}
          </TouchableOpacity>

          {image && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteImage}
            >
              <Text style={styles.deleteButtonText}>Delete Image</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.postButton, isLoading && styles.disabledButton]}
            onPress={handlePost}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.postButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAF5",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  postBox: {
    backgroundColor: "#FAE1C4",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  feelingSelector: {
    marginBottom: 20,
  },
  feelingLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  feelingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  feelingButton: {
    padding: 10,
    margin: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
  },
  feelingButtonText: {
    fontSize: 25,
  },

  selectedFeelingButton: {
    backgroundColor: "#FF9F9F",
  },
  selectedFeelingText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textInput: {
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  addPhotoText: {
    justifyContent: "center",
  },
  addPhotoButton: {
    backgroundColor: "#EE9E5F",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "#F27D7D",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  postButton: {
    backgroundColor: "#6D9DC5",
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
  },
});
