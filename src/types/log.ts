export interface MoodEntry {
  id: string;
  timestamp: string; // We use ISO dates in web apps
  state: string; // e.g., Elevated, Depressed
  severity: number; // 1-10
  note: string;
}

export interface DailyLog {
  id: string;
  date: string; // The calendar day (yyyy-mm-dd)
  moodEntries: MoodEntry[];
  sleepHours?: number; // The '?' means this is optional
  caffeineEntries: CaffeineEntry[];
  medicationEntries: MedicationEntry[];
  notes: string;
  tags: string[]; // An array of strings.
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
