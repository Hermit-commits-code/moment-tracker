'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DailyLog, MoodEntry } from '@/types/log';

export function useLogs() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('daily_logs')
        .select(
          `
          *,
          mood_entries (*)
        `,
        )
        .order('log_date', { ascending: false });

      if (error) throw error;

      // We define a local interface for the raw DB response to remove 'any'
      const formattedLogs: DailyLog[] = (data as any[]).map((log) => ({
        id: log.id,
        date: log.log_date,
        caffeineEntries: log.caffeine_entries || [], // Kept here
        moodEntries: (log.mood_entries || []).map((entry: any) => ({
          id: entry.id,
          timestamp: entry.timestamp,
          endTime: entry.end_time,
          duration: entry.duration,
          state: entry.state,
          severity: entry.severity,
          energyLevel: entry.energy_level || 5,
          sleepQuality: entry.sleep_quality || 5,
          isMixed: entry.is_mixed,
          isNap: entry.is_nap,
          sleepHours: entry.sleep_hours, // camelCase
          medsTaken: entry.meds_taken, // FIXED: was meds_taken
          note: entry.note,
          symptoms: entry.symptoms || [],
          triggers: entry.triggers || [],
          medChangeNote: entry.med_change_note,
        })),
        // REMOVED DUPLICATE caffeineEntries from here
        medicationEntries: [],
        notes: '',
        tags: [],
      }));

      setLogs(formattedLogs);
    } catch (e) {
      console.error('Error fetching logs:', e);
    } finally {
      setLoading(false);
    }
  }

  // Changed 'any' to 'Partial<MoodEntry> & { caffeineEntries?: any[] }'
  const saveLog = async (formData: any) => {
    const dateKey = formData.timestamp.split('T')[0];

    try {
      const { data: dayLog, error: dayError } = await supabase
        .from('daily_logs')
        .upsert(
          {
            log_date: dateKey,
            caffeine_entries: formData.caffeineEntries,
          },
          { onConflict: 'log_date' },
        )
        .select()
        .single();

      if (dayError) throw dayError;

      const entryData = {
        daily_log_id: dayLog.id,
        timestamp: formData.timestamp,
        end_time: formData.endTime,
        duration: formData.duration,
        state: formData.state,
        severity: formData.severity,
        energy_level: formData.energyLevel,
        sleep_quality: formData.sleepQuality,
        is_mixed: formData.isMixed,
        is_nap: formData.isNap,
        sleep_hours: formData.sleepHours,
        meds_taken: formData.medsTaken,
        note: formData.note,
        symptoms: formData.symptoms,
        triggers: formData.triggers,
        med_change_note: formData.medChangeNote,
      };

      if (formData.id && formData.id.length > 20) {
        await supabase
          .from('mood_entries')
          .update(entryData)
          .eq('id', formData.id);
      } else {
        await supabase.from('mood_entries').insert(entryData);
      }

      await fetchLogs();
    } catch (e) {
      console.error('Error saving log:', e);
    }
  };

  const deleteLog = async (id: string) => {
    try {
      await supabase.from('mood_entries').delete().eq('id', id);
      await fetchLogs();
    } catch (e) {
      console.error('Error deleting log:', e);
    }
  };

  return { logs, loading, saveLog, deleteLog };
}
