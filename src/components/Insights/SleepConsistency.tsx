'use client';
import { DailyLog } from '@/types/log';

export default function SleepConsistency({ logs }: { logs: DailyLog[] }) {
  const last7Days = [...logs].slice(0, 7).reverse();

  return (
    <section className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-8 tracking-widest">
        7-Day Sleep Architecture
      </h3>
      <div className="flex items-end justify-between h-32 gap-2 border-b border-slate-100">
        {last7Days.map((log) => {
          const totalSleep = log.moodEntries.reduce(
            (sum, m) => sum + (Number(m.sleepHours) || 0),
            0,
          );
          // Scale: 12 hours = 100% height
          const height = Math.min((totalSleep / 12) * 100, 100);

          return (
            <div
              key={log.date}
              className="flex-1 flex flex-col items-center group relative"
            >
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-indigo-600 text-white text-[8px] font-black py-1 px-2 rounded uppercase z-10">
                {totalSleep} Hours
              </div>
              <div
                className="w-full max-w-[30px] bg-indigo-100 rounded-t-lg transition-all group-hover:bg-indigo-500"
                style={{ height: `${height}%` }}
              />
              <span className="text-[8px] font-black text-slate-400 mt-2 uppercase">
                {new Date(log.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'narrow',
                })}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
