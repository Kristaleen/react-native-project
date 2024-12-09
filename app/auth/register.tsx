import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, StyleSheet, Dimensions, Image, StatusBar } from 'react-native';
import { Client, Account } from 'react-native-appwrite';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
  .setProject('674b11a0000e39b3d48f'); // Appwrite project ID

const account = new Account(client);

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '145158790263-dkj90d81ak639g6aqv19nk38v1b9831k.apps.googleusercontent.com', 
  });



  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setErrorMessage('');
      try {
        const response = await account.create('unique()', email, password, username);
        console.log('Registration successful:', response);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        router.push('/auth/signin');
      } catch (error) {
        
        setErrorMessage(error.message || 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Error', errorMessage);
    }
  };

  const handleGoogleSignIn = async (idToken) => {
    try {
      // Create OAuth2 session with Google token
      await account.createOAuth2Session('google', idToken, 'https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/674b11a0000e39b3d48f'); 
      
      router.push('/auth/signin');
    } catch (error) {
      
      Alert.alert('Error', error.message || 'An error occurred during Google Sign-In.');
    }
  };

  const navigateToSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image source={require('@/assets/images/background.png')} style={styles.background} />
          </View>
          <View style={styles.whiteSection}>
            <Text style={styles.title}>Get started</Text>
            <TextInput style={styles.input} placeholder="Enter Username" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="New Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signUpWithContainer}>
              <View style={styles.line}></View>
              <Text style={styles.subtitle}>sign up with</Text>
              <View style={styles.line}></View>
            </View>
            <View style={styles.socialSignInContainer}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#DB4437' }] }
                onPress={() => promptAsync()}
              >
                <FontAwesome name="google" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={navigateToSignIn}>
              <Text style={styles.signInText}>
                Already have an account? <Text style={styles.signInLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.33,
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#ED802A',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.020,
    fontWeight: '400',
    color: '#888',
    marginVertical: height * 0.01,
    textAlign: 'center',
  },
  input: {
    width: '98%',
    height: height * 0.065,
    fontSize: width * 0.030,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 15,
    marginBottom: height * 0.014,
  },
  signUpButton: {
    backgroundColor: '#ED802A',
    paddingVertical: height * 0.01,
    borderRadius: 50,
    width: '98%',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  signUpText: {
    color: '#FFF',
    fontSize: width * 0.040,
    fontWeight: '500',
  },
  signUpWithContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.001,
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
  socialButton: {
    width: width * 0.10,
    height: width * 0.10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
