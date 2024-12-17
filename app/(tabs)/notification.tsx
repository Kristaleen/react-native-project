import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

export default function About() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title Section */}
        <Text style={styles.title}>Notifications</Text>

        {/* Notifications List */}
        <ScrollView style={styles.scrollContainer}>
          {/* Notification 1 */}
          <View style={styles.notificationItem}>
            <Ionicons name="notifications" size={24} color="#65BCB5" style={styles.notificationIcon} />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>Welcome to FeelTok!</Text>
              <Text style={styles.notificationBody}>
                Thank you for joining FeelTok. Start sharing positivity today!
              </Text>
            </View>
          </View>
          {/* You can add more notifications here */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFAF5',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,  
    marginBottom: 20,
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
  },
});
