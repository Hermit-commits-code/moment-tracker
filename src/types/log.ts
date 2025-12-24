export interface MoodEntry {
  id: string;
  timestamp: string;
  endTime?: string;
  duration?: string;
  state: string;
  severity: number;
  isMixed: boolean;
  isNap: boolean;
  sleepHours: number;
  bedTime?: string; // Added to track picker values
  wakeTime?: string; // Added to track picker values
  triggers: string[];
  symptoms: string[];
  note: string;
}

export interface DailyLog {
  id: string;
  date: string;
  moodEntries: MoodEntry[];
  sleepHours?: number; // Total nightly sleep for the day
  caffeineEntries: CaffeineEntry[];
  medicationEntries: MedicationEntry[];
  notes: string;
  tags: string[];
}
export interface CaffeineEntry {
  id: string;
  timestamp: string;
  type: string; //e.g., "Coffee", "Energy Drink"
  amount: number; // e.g., 80(mg)
}

export interface MedicationEntry {
  id: string;
  timestamp: string;
  name: string;
  dosage: string;
  taken: boolean;
}
