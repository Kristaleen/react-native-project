import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { account } from '../appwrite/appwriteConfig';

export default function SettingsScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await account.get();
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Unable to fetch user data.');
      }
    };
    fetchUserData();
  }, []);

  // Toggle notifications state (local state)
  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
  };

  // Log out the user
  const handleLogOut = async () => {
    try {
      await account.deleteSession('current');
      router.push('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Failed', 'Unable to log out. Please try again.');
    }
  };

 
  const handleDeactivateAccount = async () => {
    Alert.alert(
      'Confirm Deactivation',
      'Are you sure you want to deactivate your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Deactivate',
          onPress: async () => {
            try {
              // Deactivate the account using account.delete()
              await account.listIdentities();
              // Log the user out
              await account.deleteSession('current');
              Alert.alert('Success', 'Your account has been deactivated.');
              router.push('/register');
            } catch (error) {
              console.error('Error deactivating account:', error);
              Alert.alert('Error', 'Unable to deactivate account. Try again later.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  
  

  if (!userData) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/Home')}
        >
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
          <Text style={styles.profileName}>{userData.name || 'User'}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/manageAccount')}
        >
          <Text style={styles.rowText}>Manage Account</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.rowText}>Push Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
          />
        </View>
      </View>

      {/* Resources Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RESOURCES</Text>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/aboutus')}>
          <Text style={styles.rowText}>About Us</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/newpage')}>
          <Text style={styles.rowText}>Terms and Privacy</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout and Deactivate Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deactivateButton} onPress={handleDeactivateAccount}>
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
    backgroundColor: '#F7F7F7' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 100, 
    backgroundColor: '#5AD4CB' 
  },
  backButton: { 
    position: 'absolute', 
    left: 10, 
    justifyContent: 'center', 
    width: 60, 
    height: 60 
  },
  backButtonText: { 
    fontSize: 50, 
    color: '#fff' 
  },
  headerText: { 
    marginTop: 25, 
    fontSize: 25, 
    fontWeight: 'bold',
    color: '#fff' 
  },
  profileSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0' 
  },
  profileImage: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    marginRight: 15, 
    marginLeft: 20 
  },
  profileName: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333' 
  },
  profileEmail: { 
    fontSize: 14, 
    color: '#666' 
  },
  section: { 
    margin: 20 
  },
  sectionTitle: { 
    fontSize: 14, 
    color: '#888', 
    marginBottom: 10 
  },
  row: { flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0' 
  },
  rowText: { 
    fontSize: 16, 
    color: '#333' 
  },
  arrow: { 
    fontSize: 18, 
    color: '#888' 
  },
  footer: { 
    marginTop: 30, 
    alignItems: 'center' 
  },
  logoutButton: { 
    backgroundColor: '#5AD4CB', 
    paddingVertical: 15, 
    width: '90%', 
    borderRadius: 5, 
    alignItems: 'center', 
    marginBottom: 10 
  },
  logoutText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600'
  },
  deactivateButton: { 
    backgroundColor: '#fff', 
    borderWidth: 1,
    borderColor: '#FF0000', 
    paddingVertical: 15, 
    width: '90%', 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  deactivateText: { 
    color: '#FF0000', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  version: { 
    fontSize: 12, 
    color: '#AAA', 
    textAlign: 'center', 
    marginTop: 10 
  },
  loadingText: { 
    marginTop: 50, 
    textAlign: 'center', 
    fontSize: 16 
  },
});
