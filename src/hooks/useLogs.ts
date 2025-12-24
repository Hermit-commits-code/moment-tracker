'use client';
import { useState, useEffect } from 'react';
import { DailyLog, MoodEntry, CaffeineEntry } from '@/types/log';

export function useLogs() {
  const [logs, setLogs] = useState<DailyLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mood-logs');
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        setLogs([]);
      }
    }
  }, []);

  const saveLog = (data: any) => {
    // Group by the Start Date (timestamp)
    const timestamp = data.timestamp || new Date().toISOString();
    const dateKey = timestamp.split('T')[0];

    setLogs((prevLogs) => {
      const updatedLogs = JSON.parse(JSON.stringify(prevLogs)) as DailyLog[];
      let dayIndex = updatedLogs.findIndex((l) => l.date === dateKey);

      const newEntry: MoodEntry = {
        id: data.id || Math.random().toString(36).substr(2, 9),
        timestamp,
        endTime: data.endTime || timestamp,
        duration: data.duration || '0h 0m',
        state: data.state || 'Neutral',
        severity: Number(data.severity) || 5,
        isMixed: !!data.isMixed,
        isNap: !!data.isNap,
        sleepHours: Number(data.sleepHours) || 0,
        triggers: data.triggers || [],
        symptoms: data.symptoms || [],
        note: data.note || '',
      };

      const newCaff: CaffeineEntry | null =
        data.caffeineAmount > 0
          ? {
              id: Math.random().toString(36).substr(2, 9),
              timestamp,
              type: data.caffeineType || 'Coffee',
              amount: data.caffeineAmount,
            }
          : null;

      if (dayIndex > -1) {
        const mIdx = updatedLogs[dayIndex].moodEntries.findIndex(
          (m) => m.id === newEntry.id,
        );
        if (mIdx > -1) updatedLogs[dayIndex].moodEntries[mIdx] = newEntry;
        else updatedLogs[dayIndex].moodEntries.push(newEntry);

        if (newCaff) {
          if (!updatedLogs[dayIndex].caffeineEntries)
            updatedLogs[dayIndex].caffeineEntries = [];
          updatedLogs[dayIndex].caffeineEntries.push(newCaff);
        }
      } else {
        updatedLogs.push({
          id: Math.random().toString(36).substr(2, 9),
          date: dateKey,
          moodEntries: [newEntry],
          caffeineEntries: newCaff ? [newCaff] : [],
          medicationEntries: [],
          notes: '',
          tags: [],
        });
      }

      const sorted = updatedLogs.sort((a, b) => b.date.localeCompare(a.date));
      localStorage.setItem('mood-logs', JSON.stringify(sorted));
      return sorted;
    });
  };

  const deleteLog = (id: string, date: string) => {
    setLogs((prev) => {
      const updated = prev
        .map((log) => {
          if (log.date === date) {
            return {
              ...log,
              moodEntries: log.moodEntries.filter((m) => m.id !== id),
            };
          }
          return log;
        })
        .filter(
          (log) =>
            log.moodEntries.length > 0 ||
            (log.caffeineEntries?.length || 0) > 0,
        );
      localStorage.setItem('mood-logs', JSON.stringify(updated));
      return updated;
    });
  };

  return { logs, saveLog, deleteLog };
}
