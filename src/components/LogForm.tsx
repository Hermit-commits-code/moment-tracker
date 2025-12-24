'use client';
import { useState } from 'react';
import { MoodEntry } from '@/types/log';
import { SymptomChecklist } from './FormSegments/SymptomChecklist';
import { PhysiologicalData } from './FormSegments/PhysiologicalData';
import { TriggerChecklist } from './FormSegments/TriggerChecklist';

export default function LogForm({
  onSave,
  initialData,
}: {
  onSave: (data: any) => void;
  initialData: MoodEntry | null;
}) {
  const [form, setForm] = useState({
    id: initialData?.id || '',
    timestamp:
      initialData?.timestamp?.slice(0, 16) ||
      new Date().toISOString().slice(0, 16),
    endTime:
      initialData?.endTime?.slice(0, 16) ||
      new Date().toISOString().slice(0, 16),
    state: initialData?.state || 'Neutral',
    severity: initialData?.severity || 5,
    isMixed: initialData?.isMixed || false,
    symptoms: initialData?.symptoms || ([] as string[]),
    triggers: initialData?.triggers || ([] as string[]),
    isNap: initialData?.isNap || false,
    sleepHours: initialData?.sleepHours || 0,
    caffeineAmount: initialData?.caffeineAmount || 0,
    note: initialData?.note || '', // RESTORED
  });

  const toggleItem = (listName: 'symptoms' | 'triggers', value: string) => {
    setForm((prev) => ({
      ...prev,
      [listName]: prev[listName].includes(value)
        ? prev[listName].filter((i) => i !== value)
        : [...prev[listName], value],
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
      {/* SEVERITY SLIDER */}
      <div className="space-y-4 px-2">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Intensity
          </label>
          <span className="text-4xl font-black text-slate-900 leading-none">
            {form.severity}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={form.severity}
          onChange={(e) =>
            setForm({ ...form, severity: Number(e.target.value) })
          }
          className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
        />
      </div>

      {/* MOOD STATE & MIXED TOGGLE */}
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
        update={(fields: any) => setForm({ ...form, ...fields })}
      />

      {/* NOTES AREA (RESTORED) */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
          Observation Notes
        </label>
        <textarea
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="Describe internal experience, thought patterns, or context..."
          className="w-full p-5 bg-slate-50 border-none rounded-[24px] text-sm font-medium min-h-[120px] focus:ring-2 focus:ring-slate-200 outline-none placeholder:text-slate-300"
        />
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200"
      >
        {initialData ? 'Update Moment' : 'Save Moment'}
      </button>
    </form>
  );
}
