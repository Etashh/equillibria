import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Icon, Card, Badge } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CarbonTip } from '../types';

type TipsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tips'>;

const TipsScreen = () => {
  const navigation = useNavigation<TipsScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<CarbonTip['category'] | 'all'>('all');
  
  // Mock tips data
  const carbonTips: CarbonTip[] = [
    {
      id: '1',
      title: 'Bike to work once a week',
      description: 'Substituting just one day of driving with cycling can save approximately 5kg of CO₂ emissions for a typical 10-mile round trip commute.',
      category: 'transport',
      potentialSaving: 5,
      difficulty: 'medium',
    },
    {
      id: '2',
      title: 'Reduce meat consumption',
      description: 'Going meat-free for just one day per week can reduce your carbon footprint by up to 4kg CO₂ per week, or over 200kg per year.',
      category: 'food',
      potentialSaving: 4,
      difficulty: 'easy',
    },
    {
      id: '3',
      title: 'Wash clothes at 30°C',
      description: 'Washing clothes at 30°C instead of 40°C uses around 40% less electricity, saving approximately 0.5kg CO₂ per wash.',
      category: 'household',
      potentialSaving: 0.5,
      difficulty: 'easy',
    },
    {
      id: '4',
      title: 'Buy second-hand clothes',
      description: 'Buying second-hand instead of new clothes can save around 6kg of CO₂ per item, while reducing waste and saving money.',
      category: 'shopping',
      potentialSaving: 6,
      difficulty: 'medium',
    },
    {
      id: '5',
      title: 'Install smart home thermostat',
      description: 'Smart thermostats can reduce your heating emissions by up to 15%, saving approximately 300kg of CO₂ annually for the average household.',
      category: 'household',
      potentialSaving: 300,
      difficulty: 'hard',
    },
    {
      id: '6',
      title: 'Use public transportation',
      description: 'Taking the bus instead of driving can reduce your carbon emissions by up to 70% per mile traveled.',
      category: 'transport',
      potentialSaving: 3,
      difficulty: 'medium',
    },
    {
      id: '7',
      title: 'Try plant-based alternatives',
      description: 'Substituting dairy milk with plant-based alternatives like oat or almond milk can save up to 0.6kg CO₂ per liter.',
      category: 'food',
      potentialSaving: 0.6,
      difficulty: 'easy',
    },
  ];
  
  // Filter tips based on selected category
  const filteredTips = selectedCategory === 'all' 
    ? carbonTips 
    : carbonTips.filter(tip => tip.category === selectedCategory);
    
  // Color mapping for categories
  const categoryColors: Record<string, string> = {
    transport: '#F44336',
    food: '#FF9800',
    household: '#2196F3',
    shopping: '#9C27B0',
    other: '#757575',
    all: '#4CAF50',
  };
  
  // Icon mapping for categories
  const categoryIcons: Record<string, string> = {
    transport: 'directions-car',
    food: 'restaurant',
    household: 'home',
    shopping: 'shopping-bag',
    other: 'more-horiz',
    all: 'eco',
  };
  
  // Color for difficulty badges
  const difficultyColors: Record<string, string> = {
    easy: '#4CAF50',
    medium: '#FF9800',
    hard: '#F44336',
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
        <Text h2 style={styles.headerTitle}>Carbon-Saving Tips</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Filter by Category</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
          {['all', 'transport', 'food', 'household', 'shopping', 'other'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && { backgroundColor: categoryColors[category] }
              ]}
              onPress={() => setSelectedCategory(category as any)}
            >
              <Icon
                name={categoryIcons[category]}
                type="material"
                color={selectedCategory === category ? 'white' : categoryColors[category]}
                size={18}
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category && { color: 'white' }
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {filteredTips.map((tip) => (
          <Card key={tip.id} containerStyle={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Icon
                name={categoryIcons[tip.category]}
                type="material"
                color={categoryColors[tip.category]}
                containerStyle={styles.tipCategoryIcon}
              />
              <Text style={styles.tipTitle}>{tip.title}</Text>
            </View>
            
            <Text style={styles.tipDescription}>{tip.description}</Text>
            
            <View style={styles.tipFooter}>
              <Badge
                value={tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                status="primary"
                containerStyle={{ marginRight: 8 }}
                badgeStyle={{ backgroundColor: difficultyColors[tip.difficulty] }}
              />
              <Text style={styles.savingsText}>
                Potential Saving: <Text style={styles.savingsValue}>{tip.potentialSaving} kg CO₂</Text>
              </Text>
            </View>
            
            <Button
              title="I'll Try This!"
              type="outline"
              containerStyle={styles.tryButton}
            />
          </Card>
        ))}
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
  categoryFilters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryText: {
    marginLeft: 4,
  },
  tipCard: {
    borderRadius: 12,
    marginBottom: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipCategoryIcon: {
    marginRight: 8,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  tipDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  tipFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  savingsText: {
    flex: 1,
  },
  savingsValue: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tryButton: {
    borderRadius: 8,
  },
});

export default TipsScreen;
