'use client';

interface IntensityProps {
  state: string;
  severity: number;
  onChange: (val: number) => void;
}

export default function IntensityModule({
  state,
  severity,
  onChange,
}: IntensityProps) {
  const isNeutral = state === 'Neutral';

  return (
    <div className="space-y-4 px-2">
      <div className="flex justify-between items-end">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {isNeutral ? 'Stability / Functionality' : 'Intensity Score'}
        </label>
        <div className="flex flex-col items-end">
          <span className="text-4xl font-black text-slate-900 leading-none">
            {severity}
          </span>
          <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">
            {isNeutral ? '1=Flat/Numb, 10=Thriving' : '1=Mild, 10=Extreme'}
          </span>
        </div>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={severity}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
      />
    </div>
  );
}
