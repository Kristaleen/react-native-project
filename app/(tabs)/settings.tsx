import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { router, useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            router.push('/(tabs)/Home');
          }}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john@example.com</Text>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Manage Account</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Country</Text>
          <Text style={styles.rowText}>Select Country</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.rowText}>Push Notifications</Text>
          <Switch />
        </View>
      </View>

      {/* Resources Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RESOURCES</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>About Us</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Rate in App Store</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Terms and Privacy</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout and Deactivate Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deactivateButton}>
          <Text style={styles.deactivateText}>Deactivate Account</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Version */}
      <Text style={styles.version}>App Version 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',  
    justifyContent: 'center',  
    height: 100,
    backgroundColor: '#5AD4CB',
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,  
    height: 60,  

  },
  backButtonText: {
    fontSize: 50,
    color: '#fff',
  },
  headerText: {
    marginTop: 25,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginLeft: 20,
    marginTop: 20,
    marginRight:20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#5AD4CB',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deactivateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF0000',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deactivateText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 10,
  },
});
