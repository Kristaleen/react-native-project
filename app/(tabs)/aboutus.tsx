import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function About() {
  return (
    <View style={styles.container}>
      {/* Page Header */}
      <Text style={styles.headerText}>About FeelTok</Text>

      {/* Description Section */}
      <Text style={styles.description}>
        FeelTok is a safe space to express your feelings and connect with a community built on positivity 
        and support.Whether you want to share what’s on your mind, inspire others, or uplift someone’s day, 
        FeelTok is here to make that happen.
      </Text>

      {/* Header for Our Mission */}
      <Text style={styles.missionHeader}>Our Mission</Text>

      {/* Mission Description */}
      <Text style={styles.missionDescription}>
        Spreading Positivity, One Post at a Time, we believe that everyone has a story, a feeling, or a thought that deserves to be shared.
        Our mission is to create a kind and compassionate environment where users can feel free to be themselves, find encouragement,
        and build meaningful connections.
      </Text>

      {/* Header for Contact Us */}
      <Text style={styles.contactHeader}>Contact Us</Text>

      {/* Contact Description */}
      <Text style={styles.contactDescription}>
        If you have any questions, suggestions, or just want to say hello, feel free to reach out to our team at 
        <Text style={styles.email}>support@feeltok.com</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    paddingHorizontal: 20, // Added padding for better layout
    justifyContent: 'flex-start',  
    alignItems: 'flex-start',      
    marginTop: 0,                 
  },

  rectangle: {
    width: 412,
    height: 72,
    backgroundColor: '#65BCB5', 
    marginTop: 0,               
    marginLeft: 0,              
    marginRight: 0,             
  },

  // User Icon
  icon: {
    position: 'absolute',  
    right: 20,             
    top: '50%',            
    transform: [{ translateY: -17 }],  
  },

  // Menu Icon
  iconBars: {
    position: 'absolute',
    left: 20,           
    top: '50%',
    transform: [{ translateY: -15 }],
  },

  //style for about feeltok header
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 20,
    textAlign: 'left',   
    width: '100%',       
    marginTop: 40,
    paddingHorizontal: 20,
  },

  //style for about feeltok description
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'left',   
    lineHeight: 24,
    paddingHorizontal: 20,
    width: '100%',       
  },

  //style for our mission header
  missionHeader: {
    fontSize: 24,
    fontWeight: 'bold',    
    fontStyle: 'italic',
    color: '#000',
    marginTop: 40,        
    marginBottom: 20,     
    textAlign: 'left',   
    width: '100%',       
    paddingHorizontal: 20,
  },

  //style for our mission description
  missionDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'left',    
    lineHeight: 24,
    paddingHorizontal: 20,
    width: '100%',        
  },

  //style for contact header
  contactHeader: {
    fontSize: 24,
    fontWeight: 'bold',    
    fontStyle: 'italic',
    color: '#000',
    marginTop: 40,        
    marginBottom: 20,     
    textAlign: 'left',    
    width: '100%',       
    paddingHorizontal: 20,
  },

  //style for contact description
  contactDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'left',   
    lineHeight: 24,
    paddingHorizontal: 20,
    width: '100%',
  },

  //style for the email address
  email: {
    color: 'blue',  
    fontWeight: '400',
  },
});
