import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, Icon, ThemeProvider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  // Mock data for daily stats
  const todaysFootprint = 4.2; // kg CO2
  const weeklyAverage = 5.6; // kg CO2
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h1>Equillibria</Text>
        <Text style={styles.subtitle}>Balance your carbon footprint</Text>
      </View>
      
      <Card containerStyle={styles.dashboardCard}>
        <Card.Title>Today's Carbon Footprint</Card.Title>
        <Card.Divider />
        <View style={styles.footprintContainer}>
          <Text h2>{todaysFootprint} kg</Text>
          <Text>CO₂ equivalent</Text>
          
          <View style={styles.comparisonContainer}>
            {todaysFootprint < weeklyAverage ? (
              <Text style={styles.goodNews}>
                <Icon name="arrow-downward" color="green" size={16} /> 
                {((weeklyAverage - todaysFootprint) / weeklyAverage * 100).toFixed(0)}% below your weekly average
              </Text>
            ) : (
              <Text style={styles.badNews}>
                <Icon name="arrow-upward" color="red" size={16} /> 
                {((todaysFootprint - weeklyAverage) / weeklyAverage * 100).toFixed(0)}% above your weekly average
              </Text>
            )}
          </View>
        </View>
      </Card>

      <View style={styles.actionsContainer}>
        <Button 
          title="Add Activity" 
          icon={{ name: 'add', color: 'white' }}
          onPress={() => navigation.navigate('AddActivity')}
          containerStyle={styles.actionButton}
        />
        <Button 
          title="View Insights" 
          icon={{ name: 'insights', type: 'material', color: 'white' }}
          onPress={() => navigation.navigate('Insights')}
          containerStyle={styles.actionButton}
        />
      </View>
      
      <Card containerStyle={styles.tipsCard}>
        <Card.Title>Eco Tip of the Day</Card.Title>
        <Card.Divider />
        <Text style={styles.tipText}>Try going meat-free for one day this week to save up to 4kg of CO₂ emissions!</Text>
        <Button 
          title="More Tips" 
          type="outline"
          onPress={() => navigation.navigate('Tips')}
        />
      </Card>
      
      <View style={styles.navigationButtons}>
        <Button 
          title="Activity Log" 
          icon={{ name: 'history', color: 'white' }}
          onPress={() => navigation.navigate('Activity')}
          containerStyle={styles.navButton}
        />
        <Button 
          title="Community" 
          icon={{ name: 'people', color: 'white' }}
          onPress={() => navigation.navigate('Community')}
          containerStyle={styles.navButton}
        />
        <Button 
          title="Profile" 
          icon={{ name: 'person', color: 'white' }}
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.navButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  dashboardCard: {
    marginTop: -20,
    borderRadius: 12,
    padding: 16,
  },
  footprintContainer: {
    alignItems: 'center',
    padding: 16,
  },
  comparisonContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    width: '100%',
  },
  goodNews: {
    color: 'green',
    textAlign: 'center',
  },
  badNews: {
    color: 'red',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  actionButton: {
    width: '45%',
  },
  tipsCard: {
    borderRadius: 12,
    padding: 16,
  },
  tipText: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  navigationButtons: {
    padding: 16,
    marginBottom: 24,
  },
  navButton: {
    marginBottom: 12,
  },
});

export default HomeScreen;
