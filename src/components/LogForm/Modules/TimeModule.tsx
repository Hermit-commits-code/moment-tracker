'use client';
import { useEffect } from 'react';

interface TimeProps {
  timestamp: string;
  endTime: string;
  duration: string;
  onChange: (fields: {
    timestamp?: string;
    endTime?: string;
    duration?: string;
  }) => void;
}

export default function TimeModule({
  timestamp,
  endTime,
  duration,
  onChange,
}: TimeProps) {
  useEffect(() => {
    const start = new Date(timestamp).getTime();
    const end = new Date(endTime).getTime();
    if (end > start) {
      const diff = end - start;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      onChange({ duration: `${h}h ${m}m` });
    }
  }, [timestamp, endTime]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-[9px] font-black text-slate-400 uppercase ml-2">
          Start Time
        </label>
        <input
          type="datetime-local"
          value={timestamp}
          onChange={(e) => onChange({ timestamp: e.target.value })}
          className="w-full p-4 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-slate-200 outline-none"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-black text-slate-400 uppercase ml-2">
          End Time {duration && `(${duration})`}
        </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => onChange({ endTime: e.target.value })}
          className="w-full p-4 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-slate-200 outline-none"
        />
      </div>
    </div>
  );
}
