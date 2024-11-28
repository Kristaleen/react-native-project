import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const handleRegister = () => {
    router.push('/register'); // Navigate to the register page
  };
  const handleSignIn = () => {
    router.push('/signin'); // Navigate to the sign-in page
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/background.png')}
          style={styles.background}
        />
      </View>

      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>FeelTok</Text>
      </View>

      <View style={styles.whiteSection}>
        <Text style={styles.title}>Let’s get started</Text>
        <Text style={styles.subtitle}>Welcome to a World of Positivity!</Text>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDC45A',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: height * 0.50, 
    position: 'absolute', 
    top: 0,
  },
  logo: {
    width: width * 0.35, 
    height: width * 0.35, 
    resizeMode: 'contain',
    marginTop: 350, 
  },
  headerTitle: {
    fontSize: 100, 
    fontWeight: 'bold',
    color: '#000',
    marginTop: -50, 
  },
  whiteSection: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 100, 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#60C5A8',
    paddingVertical: 14,
    borderRadius: 25,
    width: width * 0.75,
    alignItems: 'center',
    marginBottom: 15,
  },
  signInText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 14,
    borderRadius: 25,
    width: width * 0.75,
    alignItems: 'center',
  },
  registerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
