'use client';

interface MoodProps {
  state: string;
  isMixed: boolean;
  onChange: (fields: { state?: string; isMixed?: boolean }) => void;
}

const MOODS = ['Elevated', 'Agitated', 'Neutral', 'Anxious', 'Depressed'];

export default function MoodModule({ state, isMixed, onChange }: MoodProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MOODS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange({ state: m })}
            className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${
              state === m
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {(state === 'Elevated' || state === 'Depressed') && (
        <label className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-100 cursor-pointer transition-colors hover:bg-purple-100">
          <input
            type="checkbox"
            checked={isMixed}
            onChange={(e) => onChange({ isMixed: e.target.checked })}
            className="w-5 h-5 rounded border-purple-200 text-purple-600 focus:ring-purple-500"
          />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-purple-900 uppercase">
              DSM-5 Mixed Features
            </span>
            <span className="text-[8px] font-bold text-purple-400 uppercase italic">
              Co-occurring manic & depressive symptoms
            </span>
          </div>
        </label>
      )}
    </div>
  );
}
