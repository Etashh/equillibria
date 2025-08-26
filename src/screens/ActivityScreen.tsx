import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Text, Button, Card, Icon, ListItem, Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Activity } from '../types';

type ActivityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Activity'>;

const ActivityScreen = () => {
  const navigation = useNavigation<ActivityScreenNavigationProp>();
  
  // Mock activity data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'transport',
      name: 'Car Commute',
      carbonFootprint: 2.4,
      date: new Date('2025-08-26T08:30:00'),
      description: 'Drove to work, 12 miles roundtrip',
    },
    {
      id: '2',
      type: 'food',
      name: 'Lunch',
      carbonFootprint: 1.2,
      date: new Date('2025-08-26T12:15:00'),
      description: 'Chicken salad',
    },
    {
      id: '3',
      type: 'household',
      name: 'Laundry',
      carbonFootprint: 0.6,
      date: new Date('2025-08-26T18:00:00'),
      description: 'One load of laundry',
    },
  ];

  // Function to get icon for activity type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'transport':
        return { name: 'directions-car', type: 'material', color: '#F44336' };
      case 'food':
        return { name: 'restaurant', type: 'material', color: '#FF9800' };
      case 'household':
        return { name: 'home', type: 'material', color: '#2196F3' };
      case 'shopping':
        return { name: 'shopping-bag', type: 'material', color: '#9C27B0' };
      default:
        return { name: 'more-horiz', type: 'material', color: '#757575' };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon 
          name="arrow-back" 
          color="white" 
          containerStyle={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        />
        <Text h2 style={styles.headerTitle}>Activity Log</Text>
      </View>

      <View style={styles.content}>
        <Button 
          title="Add New Activity" 
          icon={{ name: 'add', color: 'white' }}
          onPress={() => navigation.navigate('AddActivity')}
          containerStyle={styles.addButton}
        />

        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem 
              bottomDivider
              containerStyle={styles.listItem}
            >
              <Avatar 
                rounded
                icon={getActivityIcon(item.type)}
                containerStyle={{ backgroundColor: '#f0f0f0' }}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.activityTitle}>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                <View style={styles.activityFooter}>
                  <Text style={styles.activityDate}>
                    {item.date.toLocaleDateString()} {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={styles.footprintValue}>{item.carbonFootprint} kg CO₂</Text>
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // To center the title accounting for back button
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    marginBottom: 16,
  },
  listItem: {
    borderRadius: 8,
    marginBottom: 8,
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  activityDate: {
    fontSize: 12,
    color: '#757575',
  },
  footprintValue: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default ActivityScreen;
