"use client";

interface TriggerChecklistProps {
  selected: string[];
  toggle: (trigger: string) => void;
}

const COMMON_TRIGGERS = [
  "Work Stress",
  "Lack of Sleep",
  "Social Interaction",
  "Conflict",
  "Caffeine",
  "Alcohol",
  "Physical Illness",
  "Financial Stress",
  "Weather Change",
  "Travel",
  "Missed Meds",
  "Heavy Workload",
];

export function TriggerChecklist({ selected, toggle }: TriggerChecklistProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
          Identify Triggers
        </label>
        <span className="text-[9px] font-black text-rose-500 uppercase bg-rose-50 px-2 py-0.5 rounded">
          {selected.length} Selected
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {COMMON_TRIGGERS.map((trigger) => {
          const isSelected = selected.includes(trigger);
          return (
            <button
              key={trigger}
              type="button"
              onClick={() => toggle(trigger)}
              className={`p-3 rounded-2xl text-[10px] font-bold uppercase transition-all border-2 text-center ${
                isSelected
                  ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100"
                  : "bg-white border-slate-100 text-slate-400 hover:border-rose-200"
              }`}
            >
              {trigger}
            </button>
          );
        })}
      </div>
    </div>
  );
}
