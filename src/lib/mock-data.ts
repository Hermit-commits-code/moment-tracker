import { DailyLog } from "@/types/log";

export const MOCK_LOGS: DailyLog[] = [
  {
    id: "1",
    date: "2025-12-21",
    notes: "First log in the new web app!",
    tags: ["Initial", "Setup"],
    sleepHours: 8,
    moodEntries: [
      {
        id: "m1",
        timestamp: "2025-12-21T10:00:00Z",
        state: "Neutral",
        severity: 5,
        note: "Woke up feeling ok.",
      },
    ],
    caffeineEntries: [
      {
        id: "c1",
        timestamp: "2025-12-21T08:30:00Z",
        type: "Coffee",
        amount: 1,
      },
    ],
    medicationEntries: [
      {
        id: "med1",
        timestamp: "2025-12-21T09:00:00Z",
        name: "Vitamin D",
        dosage: "2000iu",
        taken: true,
      },
    ],
  },
];
