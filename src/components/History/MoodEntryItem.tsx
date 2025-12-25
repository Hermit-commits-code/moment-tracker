'use client';
import { MoodEntry } from '@/types/log';

interface Props {
  entry: MoodEntry;
  dateKey: string;
  onEdit: (entry: MoodEntry) => void;
  onDelete: (id: string, date: string) => void;
}

export default function MoodEntryItem({
  entry,
  dateKey,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="p-6 hover:bg-slate-50/50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {/* Clinical State Label */}
            <span
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                entry.isMixed
                  ? 'bg-purple-600 text-white shadow-lg animate-pulse'
                  : entry.state === 'Elevated'
                  ? 'bg-green-500 text-white'
                  : entry.state === 'Depressed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-white'
              }`}
            >
              {entry.isMixed ? '⚠ Mixed Features' : entry.state}
            </span>

            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              {entry.state === 'Neutral' ? 'Stability' : 'Sev'}:{' '}
              {entry.severity}/10
            </span>

            {/* Red Flag for missed meds */}
            {!entry.medsTaken && (
              <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-md text-[8px] font-black uppercase border border-rose-100">
                Meds Missed
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight">
              {new Date(entry.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              —{' '}
              {new Date(entry.endTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            {entry.duration && entry.duration !== '0h 0m' && (
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black border border-indigo-100">
                {entry.duration}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Restored and Protected */}
        <div className="flex gap-4">
          <button
            onClick={() => onEdit(entry)}
            className="text-[10px] font-black text-slate-300 hover:text-indigo-600 uppercase transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Delete this moment permanently?'))
                onDelete(entry.id, dateKey);
            }}
            className="text-[10px] font-black text-slate-300 hover:text-rose-600 uppercase transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Medication Change Notes */}
      {entry.medChangeNote && (
        <p className="text-[9px] font-black text-slate-900 uppercase bg-amber-50 p-2 rounded-lg mb-4 border border-amber-100">
          Note: {entry.medChangeNote}
        </p>
      )}

      {/* Symptoms & Triggers */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {entry.triggers?.map((t) => (
          <span
            key={t}
            className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[8px] font-black uppercase"
          >
            Trigger: {t}
          </span>
        ))}
        {entry.symptoms?.map((s) => (
          <span
            key={s}
            className="px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[8px] font-black uppercase"
          >
            {s}
          </span>
        ))}
      </div>

      {entry.note && (
        <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-l-4 border-slate-200 text-xs italic text-slate-600 leading-relaxed">
          "{entry.note}"
        </div>
      )}
    </div>
  );
}
