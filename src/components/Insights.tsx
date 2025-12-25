'use client';
import { DailyLog } from '@/types/log';
import IntensityChart from './Insights/IntensityChart';
import SleepConsistency from './Insights/SleepConsistency';
import MedicationCompliance from './Insights/MedicationCompliance';

export default function Insights({ logs }: { logs: DailyLog[] }) {
  if (!logs || logs.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntensityChart logs={logs} />
        <SleepConsistency logs={logs} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MedicationCompliance logs={logs} />
        {/* Placeholder for future "Trigger Analysis" or "Caffeine Heatmap" */}
        <div className="md:col-span-2 p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {logs.length} Days of Clinical Data Active
          </p>
        </div>
      </div>
    </div>
  );
}
