'use client';
import { DailyLog, MoodEntry } from '@/types/log';

export default function HistoryCard({ logs, onEditMood }: any) {
  return (
    <div className="space-y-6">
      {logs.map((log: DailyLog) => {
        const nightlySleep =
          log.moodEntries.find((m) => !m.isNap)?.sleepHours || 0;
        const totalCaffeine =
          log.caffeineEntries?.reduce((sum, c) => sum + c.amount, 0) || 0;

        return (
          <div
            key={log.date}
            className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden"
          >
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
                  Sleep: {nightlySleep}h
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
                <div key={m.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                            m.state === 'Elevated'
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {m.state}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          Sev: {m.severity}/10
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight">
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

                        {/* CLEAN BADGE LOGIC: Hides "0" and empty legacy durations */}
                        {m.duration &&
                          m.duration !== '0h 0m' &&
                          m.duration !== '0' &&
                          m.duration !== '0h 00m' && (
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black border border-indigo-100">
                              {m.duration}
                            </span>
                          )}
                      </div>
                    </div>
                    <button
                      onClick={() => onEditMood(m, log.date)}
                      className="text-[10px] font-black text-slate-300 hover:text-indigo-600 uppercase"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {m.triggers?.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[8px] font-black uppercase"
                      >
                        Trigger: {t}
                      </span>
                    ))}
                    {m.symptoms?.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[8px] font-black uppercase"
                      >
                        Symptom: {s}
                      </span>
                    ))}
                  </div>

                  {m.note && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-l-4 border-slate-200">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Notes
                      </p>
                      <p className="text-xs text-slate-600 italic leading-relaxed">
                        "{m.note}"
                      </p>
                    </div>
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
