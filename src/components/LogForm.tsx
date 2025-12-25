'use client';
import { useState, useEffect } from 'react';
import IntensityModule from './LogForm/Modules/IntensityModule';
import MedicationModule from './LogForm/Modules/MedicationModule';
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
    state: initialData?.state || 'Neutral',
    severity: initialData?.severity || 5,
    medsTaken: initialData?.medsTaken ?? true,
    medChangeNote: initialData?.medChangeNote || '',
    triggers: initialData?.triggers || [],
    symptoms: initialData?.symptoms || [],
    note: initialData?.note || '',
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-8 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100"
    >
      {/* MODULE 1: INTENSITY */}
      <IntensityModule
        state={form.state}
        severity={form.severity}
        onChange={(val) => setForm({ ...form, severity: val })}
      />

      {/* MODULE 2: MEDICATION */}
      <MedicationModule
        medsTaken={form.medsTaken}
        medChangeNote={form.medChangeNote}
        onChange={(fields) => setForm({ ...form, ...fields })}
      />

      {/* Rest of the form structure... */}
      <button
        type="submit"
        className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em]"
      >
        Save Moment
      </button>
    </form>
  );
}
