import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { account } from "../appwrite/appwriteConfig";

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Google OAuth State
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: "145158790263-glucgp5c60mham66h05cimhqfd4le3li.apps.googleusercontent.com", 
    androidClientId: "145158790263-hch41nd84u6fpkib4cr61uaptde8ek10.apps.googleusercontent.com", 
    iosClientId: "145158790263-hrre01663uol600qkehl5vbg795ldf3u.apps.googleusercontent.com", 
   
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const token = response.authentication.accessToken;
      setAccessToken(token);
      console.log("Received Google OAuth Token:", token);
      fetchUserInfo(token);
    } else if (response?.type === "error") {
      console.error("Google OAuth Error:", response.error);
    }
  }, [response]);

  // Fetch Google User Info
  const fetchUserInfo = async (token: string) => {
    if (!token) {
      console.error("No token received from Google OAuth.");
      return;
    }

    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userInfo = await response.json();
      setUser(userInfo);
      console.log("Google User Info:", userInfo);
      router.push("/Home");
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert("Error", "Failed to retrieve user information.");
    }
  };

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill out all fields.");
      return false;
    }
    if (!email.includes("@")) {
      setErrorMessage("Enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setErrorMessage("");
      try {
        const response = await account.create("unique()", email, password, username);
        console.log("Registration successful:", response);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        router.push("/signin");
      } catch (error: any) {
        setErrorMessage(error.message || "An error occurred during registration.");
        Alert.alert("Error", error.message || "Registration failed.");
      }
    } else {
      Alert.alert("Error", errorMessage);
    }
  };

  const navigateToSignIn = () => {
    router.push("/signin");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined} // Adjust for Android
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/background.png")}
              style={styles.background}
            />
          </View>
          <View style={styles.whiteSection}>
            <Text style={styles.title}>Get started</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
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
                style={[styles.socialButton, { backgroundColor: "#DB4437" }]}
                onPress={() => {
                  console.log("Google OAuth button clicked");
                  promptAsync();
                }}
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
    backgroundColor: "#EDC45A",
  },
  header: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  background: {
    width: "100%",
    height: height * 0.45,
    position: "absolute",
    top: 0,
  },
  whiteSection: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.33,
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: "bold",
    color: "#ED802A",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.02,
    fontWeight: "400",
    color: "#888",
    marginVertical: height * 0.01,
    textAlign: "center",
  },
  input: {
    width: "98%",
    height: height * 0.065,
    fontSize: width * 0.03,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 15,
    marginBottom: height * 0.014,
  },
  signUpButton: {
    backgroundColor: "#ED802A",
    paddingVertical: height * 0.01,
    borderRadius: 50,
    width: "98%",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  signUpText: {
    color: "#FFF",
    fontSize: width * 0.04,
    fontWeight: "500",
  },
  signUpWithContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.001,
  },
  line: {
    height: 1,
    backgroundColor: "#888",
    flex: 1,
    marginHorizontal: 10,
  },
  socialSignInContainer: {
    alignItems: "center",
  },
  socialButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  signInText: {
    fontSize: 14,
    color: "#888",
    marginTop: 20,
  },
  signInLink: {
    color: "#77A98A",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
