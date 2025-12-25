'use client';
import { useState } from 'react';
import IntensityModule from './LogForm/Modules/IntensityModule';
import MedicationModule from './LogForm/Modules/MedicationModule';
import TimeModule from './LogForm/Modules/TimeModule';
import MoodModule from './LogForm/Modules/MoodModule';
import { TriggerChecklist } from './FormSegments/TriggerChecklist';
import { SymptomChecklist } from './FormSegments/SymptomChecklist';
import { PhysiologicalData } from './FormSegments/PhysiologicalData';

export default function LogForm({ onSave, initialData }: any) {
  const [form, setForm] = useState({
    ...initialData,
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
    medsTaken: initialData?.medsTaken ?? true,
    medChangeNote: initialData?.medChangeNote || '',
    triggers: initialData?.triggers || [],
    symptoms: initialData?.symptoms || [],
    note: initialData?.note || '',
    // Sleep/Caffeine data handled within PhysiologicalData but stored here
    isNap: initialData?.isNap || false,
    sleepHours: initialData?.sleepHours || 0,
  });

  const updateForm = (fields: any) =>
    setForm((prev) => ({ ...prev, ...fields }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-8 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100"
    >
      <TimeModule
        timestamp={form.timestamp}
        endTime={form.endTime}
        duration={form.duration}
        onChange={updateForm}
      />

      <MoodModule
        state={form.state}
        isMixed={form.isMixed}
        onChange={updateForm}
      />

      <IntensityModule
        state={form.state}
        severity={form.severity}
        onChange={(val) => updateForm({ severity: val })}
      />

      <MedicationModule
        medsTaken={form.medsTaken}
        medChangeNote={form.medChangeNote}
        onChange={updateForm}
      />

      <TriggerChecklist
        selected={form.triggers}
        toggle={(t) =>
          updateForm({
            triggers: form.triggers.includes(t)
              ? form.triggers.filter((i: string) => i !== t)
              : [...form.triggers, t],
          })
        }
      />

      <SymptomChecklist
        state={form.state}
        isMixed={form.isMixed}
        selected={form.symptoms}
        toggle={(s) =>
          updateForm({
            symptoms: form.symptoms.includes(s)
              ? form.symptoms.filter((i: string) => i !== s)
              : [...form.symptoms, s],
          })
        }
      />

      <PhysiologicalData form={form} update={updateForm} />

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
          Clinical Notes
        </label>
        <textarea
          value={form.note}
          onChange={(e) => updateForm({ note: e.target.value })}
          placeholder="Internal experience, thought patterns..."
          className="w-full p-5 bg-slate-50 border-none rounded-[24px] text-sm font-medium min-h-[120px] outline-none focus:ring-2 focus:ring-slate-100"
        />
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all"
      >
        Save Moment
      </button>
    </form>
  );
}
