'use client';
import { DailyLog, MoodEntry } from '@/types/log';

interface HistoryCardProps {
  logs: DailyLog[];
  onEditMood: (entry: MoodEntry) => void;
  onDeleteMood: (id: string) => void;
}

export default function HistoryCard({
  logs,
  onEditMood,
  onDeleteMood,
}: HistoryCardProps) {
  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-8">
      {logs.map((day) => (
        <div
          key={day.id}
          className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm"
        >
          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter">
              {new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </h3>
            {/* FIX: Changed sleep_hours to sleepHours */}
            <span className="text-[10px] font-black text-indigo-600 uppercase">
              Sleep: {day.moodEntries[0]?.sleepHours || 0}h
            </span>
          </div>

          <div className="p-4 space-y-4">
            {day.caffeineEntries?.length > 0 && (
              <div className="px-4 py-1 flex flex-wrap gap-2">
                {day.caffeineEntries.map(
                  (
                    c: any,
                    i: number, // Note: Replace 'any' with CaffeineEntry type if available
                  ) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-[9px] font-black uppercase border border-amber-100"
                    >
                      🥤 {c.type} {c.amount && `(${c.amount})`} x{c.quantity}
                    </span>
                  ),
                )}
              </div>
            )}

            {day.moodEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        entry.state === 'Elevated'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-indigo-500 text-white'
                      }`}
                    >
                      {entry.state}
                    </span>
                    {/* FIX: Changed meds_taken to medsTaken */}
                    {entry.medsTaken && (
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-blue-100">
                        💊 {entry.medChangeNote || 'Meds Taken'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    {formatTime(entry.timestamp)}{' '}
                    {entry.endTime && ` — ${formatTime(entry.endTime)}`}
                  </p>
                  {entry.duration && (
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[9px] font-bold">
                      {entry.duration}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1 text-center">
                      Energy
                    </p>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400"
                        style={{ width: `${(entry.energyLevel || 5) * 10}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1 text-center">
                      Sleep Quality
                    </p>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-400"
                        style={{ width: `${(entry.sleepQuality || 5) * 10}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* FIX: Escaped quotes for ESLint */}
                {entry.note && (
                  <div className="bg-white/50 p-4 rounded-2xl border border-slate-100 italic text-slate-600 text-sm mb-4">
                    &ldquo;{entry.note}&rdquo;
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {entry.triggers?.map((t: string) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-wider border border-rose-100"
                    >
                      Trigger: {t}
                    </span>
                  ))}
                  {entry.symptoms?.map((s: string) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-wider border border-indigo-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
