import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Card, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { CarbonStats } from '../types';

type InsightsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Insights'>;

const InsightsScreen = () => {
  const navigation = useNavigation<InsightsScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  
  // Mock data for carbon stats
  const carbonStats: CarbonStats = {
    daily: 4.2,
    weekly: 29.8,
    monthly: 122.4,
    yearly: 1524.6,
    byCategory: {
      transport: 45,
      food: 30,
      household: 15,
      shopping: 8,
      other: 2,
    },
  };

  // Data for the weekly line chart
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3.8, 4.5, 3.9, 5.2, 4.1, 4.8, 3.5],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['kg CO₂'],
  };

  // Data for the categories pie chart
  const categoryData = [
    {
      name: 'Transport',
      value: carbonStats.byCategory.transport,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Food',
      value: carbonStats.byCategory.food,
      color: '#FF9800',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Household',
      value: carbonStats.byCategory.household,
      color: '#2196F3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Shopping',
      value: carbonStats.byCategory.shopping,
      color: '#9C27B0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Other',
      value: carbonStats.byCategory.other,
      color: '#757575',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  // Data for the monthly comparison chart
  const monthlyComparisonData = {
    labels: ['May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        data: [145.8, 138.2, 130.6, 122.4],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
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
        <Text h2 style={styles.headerTitle}>Insights</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card containerStyle={styles.summaryCard}>
          <Card.Title>Carbon Footprint Summary</Card.Title>
          <Card.Divider />
          
          <View style={styles.summaryItems}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Today</Text>
              <Text style={styles.summaryValue}>{carbonStats.daily} kg</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>This Week</Text>
              <Text style={styles.summaryValue}>{carbonStats.weekly} kg</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>This Month</Text>
              <Text style={styles.summaryValue}>{carbonStats.monthly} kg</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>This Year</Text>
              <Text style={styles.summaryValue}>{carbonStats.yearly} kg</Text>
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.chartCard}>
          <Card.Title>This Week's Carbon Footprint</Card.Title>
          <Card.Divider />
          
          <LineChart
            data={weeklyData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card>

        <Card containerStyle={styles.chartCard}>
          <Card.Title>Footprint by Category</Card.Title>
          <Card.Divider />
          
          <PieChart
            data={categoryData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card>

        <Card containerStyle={styles.chartCard}>
          <Card.Title>Monthly Comparison</Card.Title>
          <Card.Divider />
          
          <BarChart
            data={monthlyComparisonData}
            width={screenWidth - 64}
            height={220}
            yAxisLabel=""
            yAxisSuffix=" kg"
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Card>

        <Button 
          title="Generate Report" 
          icon={{ name: 'description', color: 'white' }}
          containerStyle={styles.reportButton}
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
  summaryCard: {
    borderRadius: 12,
  },
  summaryItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#757575',
    marginBottom: 8,
  },
  summaryValue: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4CAF50',
  },
  chartCard: {
    borderRadius: 12,
    marginTop: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  reportButton: {
    marginVertical: 24,
  },
});

export default InsightsScreen;
