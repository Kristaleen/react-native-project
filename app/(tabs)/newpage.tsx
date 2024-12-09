import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from "expo-router";

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => { router.navigate('./settings') }}
        >
          <Feather
            color="#000"
            name="chevron-left"
            size={30}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Terms and Conditions</Text>

        {/* Section 1 */}
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>2. Use License</Text>
        <Text style={styles.text}>
          Permission is granted to temporarily download one copy of the app for personal, non-commercial transitory viewing only.
        </Text>

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
        <Text style={styles.text}>
          Your use of the app is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the app and informs users of our data collection practices.
        </Text>

        {/* Section 4 */}
        <Text style={styles.sectionTitle}>4. Disclaimer</Text>
        <Text style={styles.text}>
          The materials on the app are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </Text>

        {/* Section 5 */}
        <Text style={styles.sectionTitle}>5. Limitations</Text>
        <Text style={styles.text}>
          In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our app.
        </Text>

        {/* Last Updated */}
        <Text style={styles.lastUpdated}>Last updated: November 27, 2024</Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    flexGrow: 1, 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  lastUpdated: {
    marginTop: 30,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default TermsAndConditionsScreen;
