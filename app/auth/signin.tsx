import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Client, Account } from 'react-native-appwrite';
import * as Google from 'expo-auth-session/providers/google';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
  .setProject('674b11a0000e39b3d48f'); // Appwrite project ID

const account = new Account(client);

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Google sign-in hook
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '145158790263-dkj90d81ak639g6aqv19nk38v1b9831k.apps.googleusercontent.com',
  });

  // Handle email/password sign-in
  const handleEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      console.log('Attempting sign-in...');
      const session = await account.createEmailPasswordSession(email, password);
      console.log('Sign-in successful:', session);

      const userDetails = await account.get();

      setEmail('');
      setPassword('');

      // Navigate based on user role
      if (userDetails.labels?.includes('admin')) {
        router.push('/admin/AdminPage');
      } else {
        router.push('/(tabs)/Home');
      }
    } catch (error) {
    
      Alert.alert('Error', error.message || 'Failed to sign in. Please try again.');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    if (!response || response.type !== 'success') {
      Alert.alert('Error', 'Google sign-in failed.');
      return;
    }

    try {
      const { id_token } = response.params;
      const user = await account.createMagicURLToken('google', id_token);
      console.log('Google sign-in successful:', user);

      setEmail('');
      setPassword('');
      router.push('/(tabs)/Home');
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in with Google.');
    }
  };

  // Handle Guest Sign-In
  const handleGuestSignIn = async () => {
    try {
      // This assumes Appwrite allows anonymous sessions (check Appwrite documentation for anonymous login)
      const session = await account.createAnonymousSession();
      

      router.push('/Home');
    } catch (error) {
      console.error('Guest sign-in error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in as guest.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to reset your password.');
      return;
    }

    try {
      await account.createRecovery('email', email);  // Assuming Appwrite provides this functionality
      Alert.alert('Success', 'Password reset link sent to your email.');
    } catch (error) {
     
      Alert.alert('Error', error.message || 'Failed to send password reset link.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={require('@/assets/images/background.png')} style={styles.backgroundImage} />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Welcome Back</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <View style={styles.row}>
                <Text style={styles.rememberMe}>Remember me</Text>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.signInButton} onPress={handleEmailSignIn}>
                <Text style={styles.signInText}>Sign in</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialSignInButton} onPress={promptAsync}>
                <Text style={styles.socialSignInText}>Sign Up with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.guestSignInButton} onPress={handleGuestSignIn}>
                <Text style={styles.guestSignInText}>Sign in as Guest</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/auth/register')}>
                <Text style={styles.signUpText}>
                  Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  socialSignInButton: {
    backgroundColor: '#DB4437',
    paddingVertical: 12,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  socialSignInText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  guestSignInButton: {
    backgroundColor: '#77A98A',
    paddingVertical: 12,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  guestSignInText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signInText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpText: {
    fontSize: 14,
    color: '#888',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#65BCB5',
  },
});
