import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { account } from "../appwrite/appwriteConfig";

const MFAChallengePage = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  // This function is triggered when the user enters their OTP
  const handleVerifyOTP = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (!userId || !secret || !otp) {
      Alert.alert("Error", "Please enter a valid OTP.");
      return;
    }

    try {
      // Verify the OTP using Appwrite API
      await account.updateVerification(userId, secret, otp);
      Alert.alert("Success", "Your email has been verified.");
      router.push("/Home"); // Redirect to the home screen or another page after successful verification
    } catch (error) {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

export default MFAChallengePage;
