'use client';
import { DailyLog } from '@/types/log';

export default function MedicationCompliance({ logs }: { logs: DailyLog[] }) {
  const last7Logs = logs.slice(0, 7);
  const totalEntries = last7Logs.flatMap((l) => l.moodEntries).length;
  const takenCount = last7Logs
    .flatMap((l) => l.moodEntries)
    .filter((m) => m.medsTaken).length;

  const adherenceRate =
    totalEntries > 0 ? Math.round((takenCount / totalEntries) * 100) : 0;

  return (
    <section className="p-6 bg-slate-900 rounded-3xl shadow-xl text-white">
      <h3 className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">
        Treatment Adherence
      </h3>
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-800"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={220}
              strokeDashoffset={220 - (220 * adherenceRate) / 100}
              className={`${
                adherenceRate > 90 ? 'text-emerald-500' : 'text-rose-500'
              } transition-all duration-1000`}
            />
          </svg>
          <span className="absolute text-lg font-black">{adherenceRate}%</span>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase text-slate-400">
            7-Day Consistency
          </p>
          <p className="text-xs font-bold text-slate-200 mt-1">
            {adherenceRate >= 100
              ? 'Perfect Adherence'
              : 'Missed doses detected'}
          </p>
        </div>
      </div>
    </section>
  );
}
