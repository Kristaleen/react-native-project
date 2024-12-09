import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, ActivityIndicator, Alert, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { databases } from '../config/appwriteConfig';
import * as FileSystem from 'expo-file-system';
import { Client, Account, Storage, ID } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('674b11a0000e39b3d48f');

const account = new Account(client);
const storage = new Storage(client);

export default function CreatePost() {
  const [text, setText] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState('Nothing');
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await account.get();
        setUserName(user.name);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch user details. Please make sure you are logged in.');
      }
    };

    fetchUserName();
  }, []);

  const uploadImage = async (fileUri) => {
    try {
      // Read the image file using FileSystem.readAsStringAsync() method
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      // Prepare the file using FormData
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: 'image.jpg',  // Dynamically change the file name if needed
        type: 'image/jpeg', // Ensure correct MIME type
      });

      // Upload the file to Appwrite Storage using the SDK
      const uploadResponse = await storage.createFile(
        '6751dc3c000511b022fb', // Bucket ID
        ID.unique(),             // Unique file ID
        formData
      );

      console.log('File uploaded successfully:', uploadResponse);

      // Return the fileId from the response
      return uploadResponse.$id;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handlePost = async () => {
    setIsLoading(true);

    try {
      if (!userName) {
        Alert.alert('Error', 'User Name is missing. Please ensure you are logged in.');
        setIsLoading(false);
        return;
      }

      let imageUrl = null;

      // Only upload image if imageUri exists
      if (imageUri) {
        const fileId = await uploadImage(imageUri); // Upload the image and get fileId
        if (fileId) {
          imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/6751dc3c000511b022fb/files/${fileId}/view`;
        } else {
          setIsLoading(false);
          return;
        }
      }

      // Create the post document in your Appwrite database
      const postResponse = await databases.createDocument(
        '674b25a90026b3ff8a21',  // Database ID
        '674b25d2001a880f2106',  // Collection ID
        ID.unique(),             // Unique document ID
        {
          text: text,
          image: imageUrl,  // Use the URL with the correct fileId
          feeling: selectedFeeling,
          userName: userName,
        }
      );

      console.log('Post created successfully:', postResponse);
      setText('');
      setSelectedFeeling('Nothing');
      setImageUri(null);
    } catch (error) {
      console.error('Error creating post:', error.message || error);
      Alert.alert('Error', `Failed to create post: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri;
      setImageUri(imageUri);
    }
  };

  const handleDeleteImage = () => {
    setImageUri(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.postBox}>
          <Text style={styles.header}>Create Post</Text>

          <Picker
            selectedValue={selectedFeeling}
            onValueChange={(itemValue) => setSelectedFeeling(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="What are you feeling?" value="Nothing" />
            <Picker.Item label="Happy" value="Happy" />
            <Picker.Item label="Sad" value="Sad" />
            <Picker.Item label="Excited" value="Excited" />
            <Picker.Item label="Angry" value="Angry" />
          </Picker>

          <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.addPhotoText}>Add Photo</Text>
            )}
          </TouchableOpacity>

          {imageUri && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteImage}>
              <Text style={styles.deleteButtonText}>Delete Image</Text>
            </TouchableOpacity>
          )}

          <TextInput
            style={styles.textInput}
            placeholder="Write something..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
            multiline
          />

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

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    paddingHorizontal: width * 0.02,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  postBox: {
    flex: 0.8,
    backgroundColor: '#FAE1C4',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#C36922',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  picker: {
    marginBottom: 10,
    backgroundColor: '#3DB7AD',
    height: 65,
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: width * 0.04,
  },
  addPhotoButton: {
    backgroundColor: '#EE9E5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: 200,
    borderRadius: 20,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  addPhotoText: {
    color: '#fff',
    fontSize: width * 0.05,
  },
  deleteButton: {
    backgroundColor: '#F27D7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
  },
  textInput: {
    fontSize: width * 0.04,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: height * 0.15,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#6D9886',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#B4B4B4',
  },
  postButtonText: {
    fontSize: width * 0.05,
    color: '#fff',
    fontWeight: 'bold',
  },
});
