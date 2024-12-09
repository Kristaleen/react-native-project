import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')} 
          style={styles.drawerLogo}
        />
        <Text style={styles.headerText}>FeelTok</Text>
      </View>

      {/* Navigation Links */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => router.push('/')}
        >
          <Feather name="home" size={24} color="#333" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => router.push('/Home')}
        >
          <Feather name="user" size={24} color="#333" />
          <Text style={styles.drawerItemText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => router.push('/Home')}
        >
          <Feather name="settings" size={24} color="#333" />
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with Logout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => console.log('Logout pressed')}
        >
          <Feather name="log-out" size={24} color="#FF4444" />
          <Text style={[styles.drawerItemText, { color: '#FF4444' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
    marginTop: 30,
  },
  drawerLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    paddingBottom: 90,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
});
