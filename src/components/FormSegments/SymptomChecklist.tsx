const MANIC = [
  "Racing Thoughts",
  "Pressured Speech",
  "Decreased Sleep Need",
  "Increased Energy",
  "Grandiosity",
];
const DEPRESSIVE = [
  "Anhedonia",
  "Physically Slowed",
  "Worthlessness/Guilt",
  "Low Concentration",
  "Fatigue",
];

export function SymptomChecklist({ state, isMixed, selected, toggle }: any) {
  const showManic = state === "Elevated" || state === "Agitated" || isMixed;
  const showDepressed = state === "Depressed" || isMixed;

  if (!showManic && !showDepressed) return null;

  return (
    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-6">
      {showManic && (
        <div>
          <h4 className="text-[10px] font-black text-orange-500 uppercase mb-3">
            Manic Symptoms
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {MANIC.map((s) => (
              <label
                key={s}
                className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-100 text-[11px] font-bold"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(s)}
                  onChange={() => toggle(s)}
                />{" "}
                {s}
              </label>
            ))}
          </div>
        </div>
      )}
      {showDepressed && (
        <div>
          <h4 className="text-[10px] font-black text-blue-500 uppercase mb-3">
            Depressive Symptoms
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {DEPRESSIVE.map((s) => (
              <label
                key={s}
                className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-100 text-[11px] font-bold"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(s)}
                  onChange={() => toggle(s)}
                />{" "}
                {s}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
