import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TopBar from '../components/topBar';

export default function App() {
  
  const [menuOpen, setMenuOpen] = useState(false);

  // Animated value to control the menu sliding
  const slideAnim = new Animated.Value(-250); 

  // Function to toggle the menu
  const toggleMenu = () => {
    console.log("Toggling menu, menuOpen:", menuOpen); 

    
    setMenuOpen((prevState) => !prevState);

    // Animate the menu sliding in or out
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -250 : 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close the menu if overlay is pressed
  const closeMenu = () => {
    console.log("Closing menu");
    setMenuOpen(false);
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar toggleMenu={toggleMenu} />

      {/* Overlay when the menu is open */}
      {menuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
      )}

      {/* Side menu */}
      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}
      >
        <View style={styles.menuItems}>
          <Text style={styles.menuText}>Home</Text>
          <Text style={styles.menuText}>Profile</Text>
          <Text style={styles.menuText}>Settings</Text>
          <Text style={styles.menuText}>Logout</Text>
        </View>
      </Animated.View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text>Welcome to the Home Screen!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    zIndex: 2,
    paddingTop: 60, 
    paddingLeft: 20,
  },
  menuItems: {
    flexDirection: 'column',
  },
  menuText: {
    fontSize: 20,
    marginVertical: 15,
    color: '#333',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
