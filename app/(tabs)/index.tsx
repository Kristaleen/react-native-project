import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/auth/register'); // Navigate to the register page
  };
  
  const handleSignIn = () => {
    router.push('/auth/signin'); // Navigate to the sign-in page
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/background.png')}
            style={styles.background}
          />
        </View>

        <View style={styles.logoContainer}>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDC45A',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: height * 0.45, 
    position: 'relative',
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    position: 'absolute',
    top: height * 0.12,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
    marginTop: height * 0.10,
    marginBottom: -230,
  },
  headerTitle: {
    fontSize: width * 0.15,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',  
    top: height * 0.25,    
  },
  whiteSection: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.02,
    marginTop: height * 0.10,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.040,
    color: '#555',
    marginBottom: height * 0.04,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#60C5A8',
    paddingVertical: height * 0.010,
    borderRadius: 50,
    width: width * 0.75,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  signInText: {
    color: '#FFF',
    fontSize: width * 0.055,
    fontWeight: '600',
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: height * 0.010,
    borderRadius: 50,
    width: width * 0.75,
    alignItems: 'center',
  },
  registerText: {
    color: '#000',
    fontSize: width * 0.055,
    fontWeight: '600',
  },
});
