import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Card, Icon, Avatar, Badge, Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { User, Badge as BadgeType } from '../types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  // Mock user data
  const user: User = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/lego/1.jpg',
    carbonGoal: 150, // kg CO2 per month
    streak: 12, // days
    badges: [
      {
        id: '1',
        name: 'Early Adopter',
        description: 'Joined Equillibria in the first month of launch',
        icon: 'star',
        dateEarned: new Date('2025-07-15'),
      },
      {
        id: '2',
        name: 'Streak Master',
        description: 'Logged activities for 7 consecutive days',
        icon: 'local-fire-department',
        dateEarned: new Date('2025-08-10'),
      },
      {
        id: '3',
        name: 'Carbon Cutter',
        description: 'Reduced carbon footprint by 20% in a month',
        icon: 'trending-down',
        dateEarned: new Date('2025-08-20'),
      },
    ],
  };

  // Current month's carbon footprint (mock data)
  const currentMonthCarbonFootprint = 95; // kg CO2
  const percentageToGoal = (currentMonthCarbonFootprint / user.carbonGoal!) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon 
          name="arrow-back" 
          color="white" 
          containerStyle={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        />
        <Text h2 style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Avatar
            size="xlarge"
            rounded
            source={{ uri: user.profilePicture }}
            containerStyle={styles.avatar}
          />
          <Text h3 style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.streakContainer}>
            <Icon name="local-fire-department" color="#FF9800" size={28} />
            <Text style={styles.streakText}>{user.streak} day streak!</Text>
          </View>
        </View>

        <Card containerStyle={styles.goalCard}>
          <Card.Title>Monthly Carbon Goal</Card.Title>
          <Card.Divider />
          <View style={styles.goalContent}>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalProgressText}>{currentMonthCarbonFootprint} kg / {user.carbonGoal} kg</Text>
              <Text style={styles.goalDescription}>
                {percentageToGoal < 100 
                  ? `You're using ${percentageToGoal.toFixed(0)}% of your monthly carbon budget` 
                  : "You've exceeded your monthly carbon budget"}
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${Math.min(percentageToGoal, 100)}%`,
                    backgroundColor: percentageToGoal < 80 ? '#4CAF50' : percentageToGoal < 100 ? '#FF9800' : '#F44336'
                  }
                ]} 
              />
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.badgesCard}>
          <Card.Title>Achievements</Card.Title>
          <Card.Divider />
          
          {user.badges.map((badge) => (
            <View key={badge.id} style={styles.badgeItem}>
              <Avatar 
                rounded
                icon={{ name: badge.icon as any, type: 'material' }}
                containerStyle={{ backgroundColor: '#f0f0f0' }}
              />
              <View style={styles.badgeContent}>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                <Text style={styles.badgeDate}>Earned on {badge.dateEarned.toLocaleDateString()}</Text>
              </View>
            </View>
          ))}
          
          <Button 
            title="View All Achievements" 
            type="outline"
            containerStyle={{ marginTop: 16 }}
          />
        </Card>
        
        <Button 
          title="Edit Profile" 
          containerStyle={styles.editButton}
        />
        
        <Button 
          title="Log Out" 
          type="outline"
          containerStyle={styles.logoutButton}
        />
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
  profileHeader: {
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'white',
  },
  userName: {
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#757575',
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  streakText: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  goalCard: {
    borderRadius: 12,
  },
  goalContent: {
    padding: 8,
  },
  goalTextContainer: {
    marginBottom: 12,
  },
  goalProgressText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  goalDescription: {
    color: '#757575',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  badgesCard: {
    borderRadius: 12,
    marginTop: 16,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeContent: {
    marginLeft: 16,
    flex: 1,
  },
  badgeName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  badgeDescription: {
    color: '#757575',
    marginVertical: 4,
  },
  badgeDate: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  editButton: {
    marginTop: 24,
  },
  logoutButton: {
    marginTop: 12,
    marginBottom: 24,
  },
});

export default ProfileScreen;
