import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Icon, Input, Card, Slider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Activity } from '../types';

type AddActivityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddActivity'>;

const AddActivityScreen = () => {
  const navigation = useNavigation<AddActivityScreenNavigationProp>();
  
  // Form state
  const [activityType, setActivityType] = useState<Activity['type']>('transport');
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [carbonEstimate, setCarbonEstimate] = useState(0);
  
  // Activity type options with icons
  const activityTypes = [
    { type: 'transport' as const, label: 'Transport', icon: 'directions-car', color: '#F44336' },
    { type: 'food' as const, label: 'Food', icon: 'restaurant', color: '#FF9800' },
    { type: 'household' as const, label: 'Household', icon: 'home', color: '#2196F3' },
    { type: 'shopping' as const, label: 'Shopping', icon: 'shopping-bag', color: '#9C27B0' },
    { type: 'other' as const, label: 'Other', icon: 'more-horiz', color: '#757575' },
  ];
  
  // Quick entry options by category
  const quickEntryOptions = {
    transport: [
      { name: 'Car commute (10 miles)', carbon: 2.3 },
      { name: 'Bus ride (5 miles)', carbon: 0.5 },
      { name: 'Train journey (20 miles)', carbon: 0.6 },
      { name: 'Flight (500 miles)', carbon: 102 },
    ],
    food: [
      { name: 'Beef meal', carbon: 6.0 },
      { name: 'Chicken meal', carbon: 1.8 },
      { name: 'Vegetarian meal', carbon: 0.5 },
      { name: 'Coffee with milk', carbon: 0.2 },
    ],
    household: [
      { name: 'Washing machine load', carbon: 0.6 },
      { name: 'Dishwasher load', carbon: 0.8 },
      { name: 'Heating (4 hours)', carbon: 2.5 },
      { name: 'Hot shower (10 min)', carbon: 1.3 },
    ],
    shopping: [
      { name: 'New t-shirt', carbon: 5.5 },
      { name: 'New smartphone', carbon: 70 },
      { name: 'Pair of jeans', carbon: 25 },
      { name: 'Book', carbon: 2.0 },
    ],
    other: [
      { name: 'Streaming video (2 hours)', carbon: 0.02 },
      { name: 'Using laptop (8 hours)', carbon: 0.3 },
      { name: 'Gym session', carbon: 0.8 },
      { name: 'Online shopping delivery', carbon: 0.5 },
    ],
  };
  
  // Handle quick entry selection
  const handleQuickEntrySelect = (option: { name: string; carbon: number }) => {
    setActivityName(option.name);
    setCarbonEstimate(option.carbon);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // In a real app, we would save the activity here
    navigation.navigate('Activity');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon 
          name="arrow-back" 
          color="white" 
          containerStyle={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Text h2 style={styles.headerTitle}>Add Activity</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Activity Type</Text>
        <View style={styles.activityTypeContainer}>
          {activityTypes.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.activityTypeButton,
                activityType === item.type && { borderColor: item.color }
              ]}
              onPress={() => setActivityType(item.type)}
            >
              <Icon
                name={item.icon}
                type="material"
                color={item.color}
                size={24}
                containerStyle={styles.activityTypeIcon}
              />
              <Text style={[
                styles.activityTypeLabel,
                activityType === item.type && { color: item.color }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Quick Entry</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickEntryContainer}>
          {quickEntryOptions[activityType].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickEntryButton}
              onPress={() => handleQuickEntrySelect(option)}
            >
              <Text style={styles.quickEntryName}>{option.name}</Text>
              <Text style={styles.quickEntryCarbon}>{option.carbon} kg CO₂</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Card containerStyle={styles.formCard}>
          <Input
            label="Activity Name"
            value={activityName}
            onChangeText={setActivityName}
            placeholder="E.g., Car commute to work"
          />
          
          <Input
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="E.g., 10 miles roundtrip"
            multiline
          />
          
          <Text style={styles.sliderLabel}>
            Carbon Footprint Estimate: {carbonEstimate.toFixed(1)} kg CO₂
          </Text>
          <Slider
            value={carbonEstimate}
            onValueChange={setCarbonEstimate}
            maximumValue={100}
            minimumValue={0}
            step={0.1}
            thumbStyle={{ height: 20, width: 20, backgroundColor: '#4CAF50' }}
            thumbProps={{
              children: (
                <Icon
                  name="eco"
                  type="material"
                  size={12}
                  reverse
                  containerStyle={{ bottom: 12, right: 12 }}
                  color="#4CAF50"
                />
              ),
            }}
          />
          
          <Button
            title="Save Activity"
            icon={{ name: 'check', color: 'white' }}
            onPress={handleSubmit}
            containerStyle={styles.saveButton}
          />
        </Card>
      </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  activityTypeButton: {
    width: '18%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  activityTypeIcon: {
    marginBottom: 4,
  },
  activityTypeLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  quickEntryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  quickEntryButton: {
    marginRight: 12,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: 150,
  },
  quickEntryName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quickEntryCarbon: {
    color: '#4CAF50',
  },
  formCard: {
    borderRadius: 12,
    padding: 16,
  },
  sliderLabel: {
    marginBottom: 12,
    marginTop: 8,
    marginLeft: 10,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default AddActivityScreen;
