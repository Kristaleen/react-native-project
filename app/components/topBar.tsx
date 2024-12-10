import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import { Client, Account } from 'react-native-appwrite';

// Initialize Appwrite Client and Account
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
  .setProject('674b11a0000e39b3d48f'); // Appwrite project ID

const account = new Account(client);

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* TopBar component */}
      <TopBarComponent toggleMenu={toggleMenu} />

      {/* Backdrop */}
      {menuOpen && <View style={styles.backdrop} onTouchEnd={toggleMenu} />}

      {/* Popup Menu */}
      {menuOpen && <PopupMenu toggleMenu={toggleMenu} handleLogout={handleLogout} />}
    </View>
  );
}

const TopBarComponent = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <View style={styles.topBar}>
    {/* Hamburger Menu Button */}
    <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
      <Feather name="menu" size={24} color="#333" />
    </TouchableOpacity>

    {/* Center: Logo and Text */}
    <View style={styles.centerContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.logoText}>FeelTok</Text>
    </View>

    {/* User Icon */}
    <TouchableOpacity style={styles.icon}>
      <View style={styles.circle}>
        <Feather name="user" size={24} color="#333" />
      </View>
    </TouchableOpacity>
  </View>
);

const PopupMenu = ({
  toggleMenu,
  handleLogout,
}: {
  toggleMenu: () => void;
  handleLogout: () => void;
}) => (
  <View style={styles.popupMenu}>
    {/* Logo and Text */}
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.popupLogo}
      />
      <Text style={styles.popupLogoText}>FeelTok</Text>
    </View>

    {/* Home */}
    <TouchableOpacity
      style={styles.menuOption}
      onPress={() => {
        toggleMenu();
        router.push('/(tabs)/Home'); 
      }}
    >
      <View style={styles.menuItem}>
        <Feather name="home" size={20} color="#333" />
        <Text style={styles.menuText}>  Home</Text>
      </View>
    </TouchableOpacity>

    {/* Profile */}
    <TouchableOpacity
      style={styles.menuOption}
      onPress={() => {
        toggleMenu();
        router.push('/(tabs)/profile'); // Adjust route as needed
      }}
    >
      <View style={styles.menuItem}>
        <Feather name="user" size={20} color="#333" />
        <Text style={styles.menuText}>  Profile</Text>
      </View>
    </TouchableOpacity>

    {/* About Us */}
    <TouchableOpacity
      style={styles.menuOption}
      onPress={() => {
        toggleMenu();
        router.push('/(tabs)/aboutus');
      }}
    >
      <View style={styles.menuItem}>
        <Feather name="info" size={20} color="#333" />
        <Text style={styles.menuText}>  About Us</Text>
      </View>
    </TouchableOpacity>

    {/* Settings */}
    <TouchableOpacity 
      style={styles.menuOption} 
      onPress={() => {
        toggleMenu();
        router.push('/(tabs)/settings');
      }}
    >
      <View style={styles.menuItem}>
        <Feather name="settings" size={20} color="#333" />
        <Text style={styles.menuText}>  Settings</Text>
      </View>
    </TouchableOpacity>


    {/* Logout Button */}
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <View style={styles.menuItem}>
        <Feather name="log-out" size={20} color="#8B0000" />
        <Text style={styles.logoutText}>Log Out</Text>
      </View>
    </TouchableOpacity>
  </View>
);


const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    backgroundColor: '#5AD4CB',
    paddingHorizontal: 15,
    shadowColor: '#C36922',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 1,
    zIndex: 2,
  },

  icon: {
    padding: 20,
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    marginTop: 20
  },

  centerContainer: {
    flexDirection: 'column', 
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
    marginBottom: -10, 
    marginTop: 30,
  },
  logoText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#333',
  },

  circle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },

  popupMenu: {
    position: 'absolute',
    top: '100%', 
    left: 0,
    right: '20%',
    backgroundColor: '#fff',
    zIndex: 2, 
    padding: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    height: 800,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5, 
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },

  menuOption: {
    marginVertical: 15,
  },

  menuText: {
    fontSize: 20,
    color: '#333',
  },

  // Popup-Logo
  logoContainer: {
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: -30
  },

  popupLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: -20, 
  },

  popupLogoText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#333',
  },


  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Log Out Button Styles
  logoutButton: {
    marginTop: 150,
    backgroundColor: '#fff', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },

  logoutText: {
    fontSize: 18,
    color: '#8B0000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
