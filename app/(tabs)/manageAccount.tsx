import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { account } from "../appwrite/appwriteConfig";

export default function ManageAccount() {
  const [userName, setUserName] = useState(''); // State for userName
  const [user, setUser] = useState<any>(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the current user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await account.get(); // Fetch logged-in user's data
      setUser(userData);
      setUserName(userData.name); // Set initial username
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Unable to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update user account name
  const updateUserName = async () => {
    try {
      if (!userName.trim()) {
        Alert.alert('Invalid Input', 'Username cannot be empty.');
        return;
      }
      await account.updateName(userName); // Update user's name in Appwrite
      Alert.alert('Success', 'Your account details have been updated!');
      fetchUserData(); // Refresh user data
    } catch (error) {
      console.error('Error updating userName:', error);
      Alert.alert('Error', 'Unable to update username. Please try again.');
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Account</Text>
      
      {/* UserName Input */}
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={(text) => setUserName(text)}
        placeholder="Enter your new username"
      />

      <Button title="Update Username" onPress={updateUserName} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFAF5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
