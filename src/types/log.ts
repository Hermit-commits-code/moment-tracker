export interface MoodEntry {
  id: string;
  timestamp: string;
  endTime?: string;
  duration?: string;
  state: 'Elevated' | 'Depressed' | 'Stable';
  severity: number;
  energyLevel: number;
  sleepQuality: number;
  isMixed: boolean;
  isNap: boolean;
  sleepHours: number;
  medsTaken: boolean;
  medChangeNote?: string;
  note?: string;
  symptoms: string[];
  triggers: string[];
}

export interface DailyLog {
  id: string;
  date: string;
  moodEntries: MoodEntry[];
  caffeineEntries: any[]; // You can define a CaffeineEntry type later
  medicationEntries: any[];
  notes: string;
  tags: string[];
}
