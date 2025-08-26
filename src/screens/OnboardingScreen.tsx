import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Text, Button, Icon, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [currentPage, setCurrentPage] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  
  // Onboarding content
  const onboardingPages = [
    {
      title: "Welcome to Equillibria",
      subtitle: "Your personal carbon footprint tracker",
      description: "Take control of your environmental impact and join a community of eco-conscious individuals.",
      imageUrl: "https://img.freepik.com/free-vector/hand-drawn-climate-change-illustration_23-2149397842.jpg",
    },
    {
      title: "Track Your Activities",
      subtitle: "Monitor your daily carbon footprint",
      description: "Log your transportation, food, household activities and more to understand your carbon impact.",
      imageUrl: "https://img.freepik.com/free-vector/hand-drawn-ecology-infographic_23-2149414938.jpg",
    },
    {
      title: "Get Personalized Insights",
      subtitle: "AI-powered recommendations",
      description: "Receive tailored suggestions to reduce your carbon footprint based on your lifestyle and habits.",
      imageUrl: "https://img.freepik.com/free-vector/hand-drawn-climate-change-illustration_23-2149404845.jpg",
    },
    {
      title: "Join a Community",
      subtitle: "Connect with like-minded individuals",
      description: "Participate in challenges, share your achievements, and inspire others on their sustainability journey.",
      imageUrl: "https://img.freepik.com/free-vector/hand-drawn-environment-badges_23-2147495798.jpg",
    },
    {
      title: "Let's Get Started",
      subtitle: "Create your profile",
      description: "Set up your profile to start tracking your carbon footprint and making a positive impact on the environment.",
      imageUrl: "https://img.freepik.com/free-vector/hand-drawn-climate-change-concept_23-2149399273.jpg",
    },
  ];
  
  // Handle navigation to next page or home screen
  const handleNext = () => {
    if (currentPage < onboardingPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Last page, go to home screen
      navigation.navigate('Home');
    }
  };
  
  // Handle navigation to previous page
  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Skip onboarding
  const handleSkip = () => {
    navigation.navigate('Home');
  };
  
  // Render onboarding content
  const renderOnboardingContent = () => {
    const page = onboardingPages[currentPage];
    
    // Render user registration form on the last page
    if (currentPage === onboardingPages.length - 1) {
      return (
        <View style={styles.pageContainer}>
          <Text h1 style={styles.title}>{page.title}</Text>
          <Text h4 style={styles.subtitle}>{page.subtitle}</Text>
          
          <Image 
            source={{ uri: page.imageUrl }} 
            style={styles.image}
            resizeMode="contain"
          />
          
          <Input
            placeholder="Full Name"
            leftIcon={{ name: 'person', color: '#4CAF50' }}
            containerStyle={styles.inputContainer}
          />
          
          <Input
            placeholder="Email Address"
            leftIcon={{ name: 'email', color: '#4CAF50' }}
            containerStyle={styles.inputContainer}
            keyboardType="email-address"
          />
          
          <Button
            title="Get Started"
            containerStyle={styles.buttonContainer}
            onPress={handleNext}
          />
        </View>
      );
    }
    
    // Render regular onboarding page
    return (
      <View style={styles.pageContainer}>
        <Text h1 style={styles.title}>{page.title}</Text>
        <Text h4 style={styles.subtitle}>{page.subtitle}</Text>
        
        <Image 
          source={{ uri: page.imageUrl }} 
          style={styles.image}
          resizeMode="contain"
        />
        
        <Text style={styles.description}>{page.description}</Text>
        
        <Button
          title={currentPage === onboardingPages.length - 2 ? "Continue" : "Next"}
          containerStyle={styles.buttonContainer}
          onPress={handleNext}
        />
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Skip button (not shown on last page) */}
      {currentPage < onboardingPages.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
      
      {/* Back button (not shown on first page) */}
      {currentPage > 0 && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" color="#4CAF50" />
        </TouchableOpacity>
      )}
      
      {/* Onboarding content */}
      {renderOnboardingContent()}
      
      {/* Page indicators */}
      <View style={styles.indicatorContainer}>
        {onboardingPages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentPage && styles.activeIndicator
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#4CAF50',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#757575',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 32,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    color: '#212121',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#4CAF50',
    width: 16,
  },
});

export default OnboardingScreen;
