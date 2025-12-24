'use client';
import { useLogs } from '@/hooks/useLogs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

export default function Insights() {
  const { logs } = useLogs();

  // 1. Prepare data: Map logs to a format Recharts understands
  // We sort them chronologically for the chart
  const chartData = [...logs]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7) // Take the last 7 days of entries
    .map((day) => {
      // Calculate average severity for the day
      const avgSeverity =
        day.moodEntries.length > 0
          ? day.moodEntries.reduce((sum, m) => sum + m.severity, 0) /
            day.moodEntries.length
          : 0;

      // Calculate total caffeine for the day
      const totalCaffeine =
        day.caffeineEntries?.reduce((sum, c) => sum + c.amount, 0) || 0;

      return {
        displayDate: new Date(day.date + 'T12:00:00').toLocaleDateString(
          'en-US',
          { month: 'short', day: 'numeric' },
        ),
        severity: Number(avgSeverity.toFixed(1)),
        caffeine: totalCaffeine,
      };
    });

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          No data for the last 7 days
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-slate-900 uppercase tracking-widest text-[12px]">
          Mood Intensity vs. Caffeine
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-[8px] font-black text-slate-400 uppercase">
              Severity
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[8px] font-black text-slate-400 uppercase">
              Caffeine
            </span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
              dy={10}
            />
            <YAxis
              hide // Keep it clean, use tooltips for values
            />
            <Tooltip
              contentStyle={{
                borderRadius: '20px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                fontSize: '10px',
                fontWeight: 'bold',
              }}
            />
            <Area
              type="monotone"
              dataKey="severity"
              stroke="#6366f1"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorSev)"
            />
            <Line
              type="monotone"
              dataKey="caffeine"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ fill: '#34d399', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
