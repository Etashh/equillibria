import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Icon, Card, Avatar, Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CommunityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Community'>;

const CommunityScreen = () => {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  
  // Mock community data
  const communityPosts = [
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        level: 'Carbon Champion',
      },
      content: "Just installed a smart thermostat and already seeing a reduction in energy use. It's projected to save 280kg of CO₂ annually!",
      likes: 24,
      comments: 5,
      timeAgo: '2h ago',
      carbonSaved: 280,
    },
    {
      id: '2',
      user: {
        name: 'Marcus Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        level: 'Climate Advocate',
      },
      content: "Started biking to work twice a week instead of driving. It's been a month and I've saved approximately 40kg of CO₂ emissions!",
      likes: 43,
      comments: 12,
      timeAgo: '5h ago',
      carbonSaved: 40,
    },
    {
      id: '3',
      user: {
        name: 'Ava Williams',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        level: 'Eco Warrior',
      },
      content: "Our community garden project is in full swing! We've got 15 families growing their own vegetables now, reducing food miles and packaging waste.",
      likes: 67,
      comments: 8,
      timeAgo: '1d ago',
      carbonSaved: 120,
    },
  ];
  
  // Mock challenges data
  const challenges = [
    {
      id: '1',
      title: 'Meat-Free Monday',
      description: 'Skip meat for one day each week',
      participants: 342,
      duration: '4 weeks',
      potentialSaving: 16, // kg CO₂ per month
    },
    {
      id: '2',
      title: 'Bike Commuter',
      description: 'Bike to work at least once a week',
      participants: 156,
      duration: 'Ongoing',
      potentialSaving: 20, // kg CO₂ per month
    },
    {
      id: '3',
      title: 'Zero Waste Week',
      description: 'Minimize packaging and waste for 7 days',
      participants: 208,
      duration: '1 week',
      potentialSaving: 5, // kg CO₂ per week
    },
  ];
  
  // Mock leaderboard data
  const leaderboard = [
    { id: '1', name: 'Chris Wong', avatar: 'https://randomuser.me/api/portraits/men/72.jpg', carbonSaved: 428 },
    { id: '2', name: 'Elena Patel', avatar: 'https://randomuser.me/api/portraits/women/54.jpg', carbonSaved: 385 },
    { id: '3', name: 'Miguel Sanchez', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', carbonSaved: 346 },
    { id: '4', name: 'Sofia Kim', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', carbonSaved: 312 },
    { id: '5', name: 'Jordan Taylor', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', carbonSaved: 290 },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon 
          name="arrow-back" 
          color="white" 
          containerStyle={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        />
        <Text h2 style={styles.headerTitle}>Community</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.challengesContainer}>
          {challenges.map((challenge) => (
            <Card key={challenge.id} containerStyle={styles.challengeCard}>
              <Card.Title>{challenge.title}</Card.Title>
              <Card.Divider />
              <Text style={styles.challengeDescription}>{challenge.description}</Text>
              <View style={styles.challengeDetails}>
                <Text style={styles.challengeParticipants}>
                  <Icon name="people" size={14} color="#757575" /> {challenge.participants} participants
                </Text>
                <Text style={styles.challengeDuration}>
                  <Icon name="schedule" size={14} color="#757575" /> {challenge.duration}
                </Text>
              </View>
              <Text style={styles.challengeSaving}>Potential saving: {challenge.potentialSaving} kg CO₂</Text>
              <Button
                title="Join Challenge"
                type="outline"
                containerStyle={styles.joinButton}
              />
            </Card>
          ))}
        </ScrollView>
        
        <View style={styles.leaderboardHeader}>
          <Text style={styles.sectionTitle}>Monthly Leaderboard</Text>
          <Button
            title="See All"
            type="clear"
            titleStyle={{ fontSize: 14 }}
          />
        </View>
        
        <Card containerStyle={styles.leaderboardCard}>
          {leaderboard.map((user, index) => (
            <View key={user.id}>
              <View style={styles.leaderboardItem}>
                <Text style={styles.leaderboardRank}>{index + 1}</Text>
                <Avatar
                  rounded
                  source={{ uri: user.avatar }}
                  size="small"
                  containerStyle={styles.leaderboardAvatar}
                />
                <Text style={styles.leaderboardName}>{user.name}</Text>
                <Text style={styles.leaderboardSaved}>{user.carbonSaved} kg CO₂</Text>
              </View>
              {index < leaderboard.length - 1 && <Divider style={{ marginVertical: 8 }} />}
            </View>
          ))}
        </Card>
        
        <Text style={styles.sectionTitle}>Community Feed</Text>
        
        {communityPosts.map((post) => (
          <Card key={post.id} containerStyle={styles.postCard}>
            <View style={styles.postHeader}>
              <Avatar
                rounded
                source={{ uri: post.user.avatar }}
                size="medium"
              />
              <View style={styles.postHeaderText}>
                <Text style={styles.postUserName}>{post.user.name}</Text>
                <Text style={styles.postUserLevel}>{post.user.level}</Text>
              </View>
              <Text style={styles.postTime}>{post.timeAgo}</Text>
            </View>
            
            <Text style={styles.postContent}>{post.content}</Text>
            
            {post.carbonSaved > 0 && (
              <View style={styles.postSavingContainer}>
                <Icon name="eco" color="#4CAF50" size={16} />
                <Text style={styles.postSaving}>Saved {post.carbonSaved} kg CO₂</Text>
              </View>
            )}
            
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction}>
                <Icon name="thumb-up-off-alt" color="#757575" />
                <Text style={styles.postActionText}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.postAction}>
                <Icon name="chat-bubble-outline" color="#757575" />
                <Text style={styles.postActionText}>{post.comments}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.postAction}>
                <Icon name="share" color="#757575" />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
        
        <Button
          title="Create Post"
          icon={{ name: 'create', color: 'white' }}
          containerStyle={styles.createPostButton}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  challengesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  challengeCard: {
    width: 250,
    borderRadius: 12,
    marginRight: 16,
  },
  challengeDescription: {
    marginBottom: 12,
  },
  challengeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  challengeParticipants: {
    fontSize: 12,
    color: '#757575',
  },
  challengeDuration: {
    fontSize: 12,
    color: '#757575',
  },
  challengeSaving: {
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 12,
  },
  joinButton: {
    marginTop: 8,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaderboardCard: {
    borderRadius: 12,
    padding: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  leaderboardRank: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 30,
  },
  leaderboardAvatar: {
    marginRight: 12,
  },
  leaderboardName: {
    flex: 1,
  },
  leaderboardSaved: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  postCard: {
    borderRadius: 12,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postUserLevel: {
    fontSize: 12,
    color: '#4CAF50',
  },
  postTime: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  postContent: {
    marginBottom: 16,
    lineHeight: 22,
  },
  postSavingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  postSaving: {
    marginLeft: 8,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  postActionText: {
    marginLeft: 4,
    color: '#757575',
  },
  createPostButton: {
    marginVertical: 24,
  },
});

export default CommunityScreen;
