'use client';
import { DailyLog } from '@/types/log';

export default function IntensityChart({ logs }: { logs: DailyLog[] }) {
  const moodToValue = (s: string) =>
    ({ Elevated: 100, Agitated: 90, Neutral: 50, Anxious: 40, Depressed: 20 }[
      s
    ] || 10);

  const last7Days = logs.slice(0, 7).reverse();

  return (
    <section className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-8 tracking-widest">
        7-Day Intensity
      </h3>
      <div className="flex items-end justify-between h-32 gap-2 border-b border-slate-100">
        {last7Days.map((log) => {
          const peak = log.moodEntries.reduce(
            (p, c) => (p.severity > c.severity ? p : c),
            log.moodEntries[0],
          );
          if (!peak) return null;

          return (
            <div
              key={log.date}
              className="flex-1 flex flex-col items-center group relative"
            >
              {/* Tooltip on Hover */}
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[8px] font-black py-1 px-2 rounded uppercase whitespace-nowrap z-10">
                {peak.state} ({peak.severity}/10)
              </div>
              <div
                className={`w-full max-w-[30px] rounded-t-lg transition-all ${
                  peak.state === 'Elevated'
                    ? 'bg-yellow-400'
                    : peak.state === 'Agitated'
                    ? 'bg-orange-600'
                    : peak.state === 'Depressed'
                    ? 'bg-indigo-500'
                    : 'bg-slate-300'
                }`}
                style={{ height: `${moodToValue(peak.state)}%` }}
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
