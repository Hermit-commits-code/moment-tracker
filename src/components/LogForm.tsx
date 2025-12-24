'use client';
import { useState, useEffect } from 'react';
import { TriggerChecklist } from './FormSegments/TriggerChecklist';
import { SymptomChecklist } from './FormSegments/SymptomChecklist';
import { PhysiologicalData } from './FormSegments/PhysiologicalData';

export default function LogForm({ onSave, initialData }: any) {
  const [form, setForm] = useState({
    id: initialData?.id || '',
    timestamp:
      initialData?.timestamp?.slice(0, 16) ||
      new Date().toISOString().slice(0, 16),
    endTime:
      initialData?.endTime?.slice(0, 16) ||
      new Date().toISOString().slice(0, 16),
    duration: initialData?.duration || '',
    state: initialData?.state || 'Neutral',
    severity: initialData?.severity || 5,
    isMixed: initialData?.isMixed || false,
    symptoms: initialData?.symptoms || [],
    triggers: initialData?.triggers || [],
    isNap: initialData?.isNap || false,
    sleepHours: initialData?.sleepHours || 0,
    caffeineAmount: initialData?.caffeineAmount || 0,
    note: initialData?.note || '',
  });

  // Automatically calculate duration string
  useEffect(() => {
    const start = new Date(form.timestamp).getTime();
    const end = new Date(form.endTime).getTime();
    if (end > start) {
      const diff = end - start;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setForm((prev) => ({ ...prev, duration: `${h}h ${m}m` }));
    } else {
      setForm((prev) => ({ ...prev, duration: '' }));
    }
  }, [form.timestamp, form.endTime]);

  const toggleItem = (list: 'symptoms' | 'triggers', val: string) => {
    setForm((prev) => ({
      ...prev,
      [list]: prev[list].includes(val)
        ? prev[list].filter((i) => i !== val)
        : [...prev[list], val],
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-8 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100"
    >
      {/* SEVERITY SECTION - FIXED LABEL */}
      <div className="space-y-4 px-2">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Intensity Score
          </label>
          <div className="flex flex-col items-end">
            <span className="text-4xl font-black text-slate-900">
              {form.severity}
            </span>
            <span className="text-[8px] font-bold text-slate-400 uppercase">
              out of 10
            </span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={form.severity}
          onChange={(e) =>
            setForm({ ...form, severity: Number(e.target.value) })
          }
          className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
        />
      </div>

      {/* TIME SECTION - FIXED DURATION LABEL */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2">
            Start
          </label>
          <input
            type="datetime-local"
            value={form.timestamp}
            onChange={(e) => setForm({ ...form, timestamp: e.target.value })}
            className="w-full p-4 bg-slate-50 border-none rounded-2xl text-xs font-bold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2">
            End {form.duration && `(${form.duration})`}
          </label>
          <input
            type="datetime-local"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            className="w-full p-4 bg-slate-50 border-none rounded-2xl text-xs font-bold"
          />
        </div>
      </div>

      {/* MOOD & MIXED */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {['Elevated', 'Agitated', 'Neutral', 'Anxious', 'Depressed'].map(
            (m) => (
              <button
                key={m}
                type="button"
                onClick={() => setForm({ ...form, state: m })}
                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${
                  form.state === m
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                    : 'bg-white text-slate-400 border-slate-100'
                }`}
              >
                {m}
              </button>
            ),
          )}
        </div>
        {(form.state === 'Elevated' || form.state === 'Depressed') && (
          <label className="flex items-center gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isMixed}
              onChange={(e) => setForm({ ...form, isMixed: e.target.checked })}
              className="w-5 h-5 rounded border-rose-200 text-rose-600"
            />
            <span className="text-[10px] font-black text-rose-900 uppercase">
              DSM-5 Mixed Features
            </span>
          </label>
        )}
      </div>

      <TriggerChecklist
        selected={form.triggers}
        toggle={(t) => toggleItem('triggers', t)}
      />
      <SymptomChecklist
        state={form.state}
        isMixed={form.isMixed}
        selected={form.symptoms}
        toggle={(s) => toggleItem('symptoms', s)}
      />
      <PhysiologicalData
        form={form}
        update={(fields) => setForm({ ...form, ...fields })}
      />

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
          Notes
        </label>
        <textarea
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="Context..."
          className="w-full p-5 bg-slate-50 border-none rounded-[24px] text-sm font-medium min-h-[120px] outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl"
      >
        Save Moment
      </button>
    </form>
  );
}
