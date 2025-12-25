'use client';
import { DailyLog, MoodEntry } from '@/types/log';

interface HistoryCardProps {
  logs: DailyLog[];
  onEditMood: (entry: MoodEntry, date: string) => void;
  onDeleteMood: (id: string, date: string) => void; // Pass logic as prop
}

export default function HistoryCard({
  logs,
  onEditMood,
  onDeleteMood,
}: HistoryCardProps) {
  return (
    <div className="space-y-6">
      {logs.map((log: DailyLog) => {
        const totalCaffeine =
          log.caffeineEntries?.reduce(
            (sum, c) => sum + (Number(c.amount) || 0),
            0,
          ) || 0;
        const totalSleep = log.moodEntries.reduce(
          (sum, m) => sum + (Number(m.sleepHours) || 0),
          0,
        );

        return (
          <div
            key={log.date}
            className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Day Header */}
            <div className="bg-slate-50/50 px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">
                {new Date(log.date + 'T12:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </h3>
              <div className="flex gap-4">
                <span className="text-[10px] font-black text-indigo-600 uppercase">
                  Sleep: {totalSleep}h
                </span>
                {totalCaffeine > 0 && (
                  <span className="text-[10px] font-black text-emerald-600 uppercase border-l border-slate-200 pl-4">
                    Caffeine: {totalCaffeine}mg
                  </span>
                )}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {log.moodEntries.map((m: MoodEntry) => (
                <div
                  key={m.id}
                  className="p-6 hover:bg-slate-50/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                            m.isMixed
                              ? 'bg-purple-600 text-white'
                              : m.state === 'Elevated'
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {m.isMixed ? '⚠ Mixed State' : m.state}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">
                          Sev: {m.severity}/10
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase">
                        {new Date(m.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        —{' '}
                        {new Date(m.endTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => onEditMood(m, log.date)}
                        className="text-[10px] font-black text-slate-300 hover:text-indigo-600 uppercase"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this entry?'))
                            onDeleteMood(m.id, log.date);
                        }}
                        className="text-[10px] font-black text-slate-300 hover:text-rose-600 uppercase"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Tags and Notes */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.symptoms.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[8px] font-black uppercase"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {m.note && (
                    <p className="mt-3 text-xs text-slate-500 italic border-l-2 border-slate-200 pl-3">
                      "{m.note}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
