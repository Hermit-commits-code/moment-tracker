'use client';

interface MedProps {
  medsTaken: boolean;
  medChangeNote: string;
  onChange: (fields: { medsTaken?: boolean; medChangeNote?: string }) => void;
}

export default function MedicationModule({
  medsTaken,
  medChangeNote,
  onChange,
}: MedProps) {
  return (
    <div className="p-6 bg-slate-900 rounded-[32px] text-white space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Medication Adherence
          </h4>
          <p className="text-[9px] text-slate-500 uppercase font-bold">
            Vital for clinical correlation
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange({ medsTaken: !medsTaken })}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
            medsTaken
              ? 'bg-emerald-500 text-white'
              : 'bg-rose-500 text-white shadow-lg shadow-rose-900'
          }`}
        >
          {medsTaken ? '✓ Meds Taken' : 'Meds Missed'}
        </button>
      </div>
      <input
        type="text"
        value={medChangeNote}
        onChange={(e) => onChange({ medChangeNote: e.target.value })}
        placeholder="Dosage changes or notes..."
        className="w-full bg-slate-800 border-none rounded-xl p-3 text-xs placeholder:text-slate-600 outline-none focus:ring-1 focus:ring-slate-700"
      />
    </div>
  );
}
