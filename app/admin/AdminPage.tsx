import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Client, Account } from 'react-native-appwrite';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('674b11a0000e39b3d48f'); // Your Appwrite project ID

const account = new Account(client);

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);  // Store logged-in user data
  const router = useRouter();

  // Fetch current user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();  // Get current logged-in user
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        Alert.alert('Error', 'Failed to fetch user details.');
      }
    };

    fetchUser();
  }, []);

  // Handle log out
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');  // Delete current session
      router.push('/signin');  // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading user details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>User ID: {user.$id}</Text>
        <Text style={styles.userInfoText}>Email: {user.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Add additional admin actions here */}
      {/* For example, listing users, managing data, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#65BCB5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
