import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const entermain = () => {
    router.push('/mainscreen'); // Navigate to the Main page
  }

  const handleForgotPassword = () => {
    console.log('Forgot Password pressed');
    // Navigate to Forgot Password screen or logic here
  };

  const handleSignIn = () => {
    console.log('Sign in pressed');
    // Add sign-in logic here, e.g., API call
  };

  const handleSocialSignIn = (platform) => {
    console.log(`Sign in with ${platform}`);
    // Implement the social sign-in logic for each platform
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/background.png')} 
          style={styles.backgroundImage}
        />
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Remember Me and Forgot Password */}
        <View style={styles.row}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.rememberMe}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={entermain}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>

        {/* Social Sign-In */}
        <View style={styles.socialSignInContainer}>
          <Text style={styles.orText}>Sign in with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
              onPress={() => handleSocialSignIn('Twitter')}
            >
              <FontAwesome name="twitter" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#DB4437' }]}
              onPress={() => handleSocialSignIn('Google')}
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
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.signUpText}>
            Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
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
    width: '100%',
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    padding: 20,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#65BCB5',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    fontSize: 14,
    color: '#888',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#77A98A',
  },
  signInButton: {
    backgroundColor: '#65BCB5',
    paddingVertical: 12,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialSignInContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  orText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
  signUpLink: {
    color: '#65BCB5',
    fontWeight: '600',
  },
});
