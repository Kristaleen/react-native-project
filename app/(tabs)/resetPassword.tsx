import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { account } from "../appwrite/appwriteConfig"; // Ensure correct import for Appwrite

interface ResetPasswordProps {
  userId: string;
  secret: string;
}

const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({ userId, secret }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please enter both new password and confirmation.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (!userId || !secret) {
      Alert.alert("Error", "User ID or secret missing.");
      return;
    }

    try {
      // Call Appwrite's updateRecovery method to reset the password
      await account.updateRecovery(userId, secret, newPassword);

      Alert.alert("Success", "Your password has been reset.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to reset password.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Reset Password</Text>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPasswordScreen;
