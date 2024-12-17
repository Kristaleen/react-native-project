import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ensure expo-vector-icons is installed
import { useRouter } from 'expo-router'; // Navigation using expo-router

const { width } = Dimensions.get('window');

export default function About() {
  const router = useRouter(); // Use router for navigation

  return (
    <ScrollView style={styles.container}>
      {/* Header Section with Back Button */}
      <View style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('./settings')} // Navigate back to settings
        >
          <Feather color="#000" name="chevron-left" size={30} />
        </TouchableOpacity>

        {/* Page Header */}
        <Text style={styles.headerText}>About FeelTok</Text>
      </View>

      {/* Description Section */}
      <Text style={styles.description}>
        FeelTok is a safe space to express your feelings and connect with a community built on positivity 
        and support. Whether you want to share what’s on your mind, inspire others, or uplift someone’s day, 
        FeelTok is here to make that happen.
      </Text>

      {/* Our Mission Section */}
      <Text style={styles.missionHeader}>Our Mission</Text>
      <Text style={styles.missionDescription}>
        Spreading Positivity, One Post at a Time. We believe that everyone has a story, a feeling, or a thought that deserves to be shared.
        Our mission is to create a kind and compassionate environment where users can feel free to be themselves, find encouragement,
        and build meaningful connections.
      </Text>

      {/* Contact Us Section */}
      <Text style={styles.contactHeader}>Contact Us</Text>
      <Text style={styles.contactDescription}>
        If you have any questions, suggestions, or just want to say hello, feel free to reach out to our team at 
        <Text style={styles.email}> support@feeltok.com</Text>.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    paddingHorizontal: 20,
    paddingBottom: 40, // Padding at the bottom to avoid content cut-off
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
    marginTop: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1, 
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 20,
  },
  missionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'left',
  },
  missionDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 20,
  },
  contactHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'left',
  },
  contactDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'left',
    lineHeight: 24,
  },
  email: {
    color: 'blue',
    fontWeight: '400',
  },
});
