export interface Activity {
  id: string;
  type: 'transport' | 'food' | 'household' | 'shopping' | 'other';
  name: string;
  carbonFootprint: number; // in kg CO2
  date: Date;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  carbonGoal?: number; // target carbon footprint in kg CO2 per month
  streak: number; // consecutive days of tracking
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: Date;
}

export interface CarbonTip {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'food' | 'household' | 'shopping' | 'other';
  potentialSaving: number; // potential carbon saving in kg CO2
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CarbonStats {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  byCategory: {
    transport: number;
    food: number;
    household: number;
    shopping: number;
    other: number;
  };
}
