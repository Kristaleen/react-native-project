import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
        iosClientId: '<YOUR_IOS_CLIENT_ID>',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log('Google sign-in success:', result);
        // You can also add further actions after a successful sign-in, e.g., navigate to the home screen
      } else {
        console.log('Google sign-in canceled');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleSocialSignIn = (platform) => {
    console.log(`Sign in with ${platform}`);
    // Add your implementation for Twitter, Facebook, etc.
  };

  const navigateToSignIn = () => {
    router.push('/signin'); // Modify this path as per your routing setup
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/background.png')}
          style={styles.background}
        />
      </View>

      <View style={styles.whiteSection}>
        <Text style={styles.title}>Get started</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signUpWithContainer}>
          <View style={styles.line}></View>
          <Text style={styles.subtitle}>Sign up with</Text>
          <View style={styles.line}></View>
        </View>

        <View style={styles.socialSignInContainer}>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
              onPress={() => handleSocialSignIn('Twitter')}
            >
              <FontAwesome name="twitter" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#DB4437' }]}
              onPress={handleGoogleSignIn}
            >
              <FontAwesome name="google" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#4267B2' }]}
              onPress={() => handleSocialSignIn('Facebook')}
            >
              <FontAwesome name="facebook" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        
       {/* Sign Up Link */}
       <TouchableOpacity onPress={() => router.push('/signin')}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDC45A',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  background: {
    width: '100%',
    height: height * 0.45,
    position: 'absolute',
    top: 0,
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
    marginTop: height * 0.33,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ED802A',
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#888',
    marginVertical: 15,
    textAlign: 'center',
  },
  input: {
    width: '85%',
    height: 65,
    fontSize: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 25,
  },
  signUpButton: {
    backgroundColor: '#ED802A',
    paddingVertical: 20,
    borderRadius: 40,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:10,
  },
  signUpText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
  },
  signUpWithContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#888',
    flex: 1,
    marginHorizontal: 10,
  },
  socialSignInContainer: {
    alignItems: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 25,
  },
  socialButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
  signInLink: {
    color: '#77A98A',
    fontWeight: '600',
  },
});
