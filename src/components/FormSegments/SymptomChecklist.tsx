'use client';

const CRITERIA = {
  Manic: [
    'Pressured Speech',
    'Racing Thoughts',
    'Grandiosity',
    'Decreased Sleep Need',
    'Distractibility',
    'Risk Taking',
  ],
  Depressive: [
    'Suicidal Ideation',
    'Anhedonia',
    'Psychomotor Retardation',
    'Fatigue',
    'Worthlessness',
    'Excessive Guilt',
  ],
};

export function SymptomChecklist({ state, isMixed, selected, toggle }: any) {
  // If Elevated and Mixed: Show Depressive criteria
  // If Depressed and Mixed: Show Manic criteria
  const showOpposite =
    isMixed && (state === 'Elevated' || state === 'Depressed');
  const criteriaToShow = showOpposite
    ? state === 'Elevated'
      ? CRITERIA.Depressive
      : CRITERIA.Manic
    : state === 'Elevated'
    ? CRITERIA.Manic
    : state === 'Depressed'
    ? CRITERIA.Depressive
    : [];

  if (criteriaToShow.length === 0) return null;

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
        {showOpposite ? 'Mixed Features Criteria' : 'Mood Criteria'}
      </label>
      <div className="grid grid-cols-2 gap-2">
        {criteriaToShow.map((s: string) => (
          <button
            key={s}
            type="button"
            onClick={() => toggle(s)}
            className={`p-3 rounded-2xl text-[9px] font-black uppercase transition-all border-2 ${
              selected.includes(s)
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                : 'bg-white border-slate-100 text-slate-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
