import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@rneui/themed';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InsightsScreen from '../screens/InsightsScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import TipsScreen from '../screens/TipsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

// Theme
import theme from '../utils/theme';

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Activity: undefined;
  Profile: undefined;
  Insights: undefined;
  AddActivity: undefined;
  Tips: undefined;
  Community: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  // For first-time users, show onboarding
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName={isFirstLaunch ? 'Onboarding' : 'Home'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Activity" component={ActivityScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Insights" component={InsightsScreen} />
          <Stack.Screen name="AddActivity" component={AddActivityScreen} />
          <Stack.Screen name="Tips" component={TipsScreen} />
          <Stack.Screen name="Community" component={CommunityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
