import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type TopBarProps = {
  toggleMenu: () => void;
};

export default function TopBar({ toggleMenu }: TopBarProps) {
  return (
    <View style={styles.topBar}>
      {/* Left: Hamburger Button */}
      <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
        <Feather name="menu" size={26} color="#333" />
      </TouchableOpacity>

      {/* Center: App Logo */}
      <View style={styles.centerContainer}>
        <Text style={styles.logoText}>FeelTok</Text>
      </View>

      {/* Right: User Icon */}
      <TouchableOpacity style={styles.icon}>
        <Feather name="user" size={26} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 95,
    backgroundColor: '#65BCB5',
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    padding: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
