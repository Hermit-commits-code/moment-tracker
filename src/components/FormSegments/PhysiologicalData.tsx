"use client";
import { calculateSleepDuration } from "@/lib/utils";

const CAFFEINE_MAP: Record<string, number> = {
  Coffee: 12, // ~95mg per 8oz
  Tea: 4, // ~30mg per 8oz
  "Energy Drink": 10, // ~160mg per 16oz
  Soda: 3, // ~35mg per 12oz
  Espresso: 64, // ~64mg per 1oz shot
};

interface PhysiologicalDataProps {
  form: {
    isNap: boolean;
    bedTime?: string;
    wakeTime?: string;
    sleepHours: number;
    caffeineType?: string;
    caffeineOz?: number;
    caffeineQty?: number; // New field for multiple drinks
    caffeineAmount?: number;
  };
  update: (fields: any) => void;
}

export function PhysiologicalData({ form, update }: PhysiologicalDataProps) {
  const handleTimeChange = (bed: string, wake: string) => {
    const hours = calculateSleepDuration(bed, wake);
    update({ bedTime: bed, wakeTime: wake, sleepHours: hours });
  };

  // Improved calculation: (mg/oz * oz) * quantity
  const handleCaffeineChange = (type: string, oz: number, qty: number) => {
    const mgPerOz = CAFFEINE_MAP[type] || 0;
    const count = qty > 0 ? qty : 1; // Default to 1 if empty
    const totalMg = Math.round(oz * mgPerOz * count);

    update({
      caffeineType: type,
      caffeineOz: oz,
      caffeineQty: qty,
      caffeineAmount: totalMg,
    });
  };

  return (
    <div
      className={`p-6 rounded-3xl border transition-all ${
        form.isNap
          ? "bg-amber-50 border-amber-100"
          : "bg-indigo-50/50 border-indigo-100"
      }`}
    >
      {/* 1. REST TYPE TOGGLE */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          Rest Type: {form.isNap ? "Nap" : "Primary Sleep"}
        </h4>
        <button
          type="button"
          onClick={() => update({ isNap: !form.isNap })}
          className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 transition-all ${
            form.isNap
              ? "bg-amber-500 border-amber-500 text-white"
              : "bg-white border-slate-200 text-slate-400"
          }`}
        >
          {form.isNap ? "Set as Night Sleep" : "Set as Nap"}
        </button>
      </div>

      {/* 2. SLEEP PICKERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2">
            Bed/Start
          </label>
          <input
            type="datetime-local"
            value={form.bedTime || ""}
            onChange={(e) =>
              handleTimeChange(e.target.value, form.wakeTime || "")
            }
            className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-400 uppercase ml-2">
            Wake/End
          </label>
          <input
            type="datetime-local"
            value={form.wakeTime || ""}
            onChange={(e) =>
              handleTimeChange(form.bedTime || "", e.target.value)
            }
            className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold"
          />
        </div>
      </div>

      {/* 3. CAFFEINE CALCULATOR WITH QTY */}
      <div className="mt-6 pt-6 border-t border-slate-200/60">
        <div className="flex items-center justify-between mb-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Caffeine Calculator
          </label>
          {form.caffeineAmount ? (
            <div className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-black">
              Total: {form.caffeineAmount}mg
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-12 gap-2">
          <select
            value={form.caffeineType || "Coffee"}
            onChange={(e) =>
              handleCaffeineChange(
                e.target.value,
                form.caffeineOz || 0,
                form.caffeineQty || 1
              )
            }
            className="col-span-5 p-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold"
          >
            {Object.keys(CAFFEINE_MAP).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <div className="col-span-4 relative">
            <input
              type="number"
              placeholder="Oz"
              value={form.caffeineOz || ""}
              onChange={(e) =>
                handleCaffeineChange(
                  form.caffeineType || "Coffee",
                  Number(e.target.value),
                  form.caffeineQty || 1
                )
              }
              className="w-full p-3 pr-7 bg-white border border-slate-200 rounded-2xl text-xs font-bold"
            />
            <span className="absolute right-2.5 top-3.5 text-[8px] font-black text-slate-300 uppercase">
              oz
            </span>
          </div>

          <div className="col-span-3 relative">
            <input
              type="number"
              placeholder="Qty"
              value={form.caffeineQty || ""}
              onChange={(e) =>
                handleCaffeineChange(
                  form.caffeineType || "Coffee",
                  form.caffeineOz || 0,
                  Number(e.target.value)
                )
              }
              className="w-full p-3 pr-7 bg-white border border-slate-200 rounded-2xl text-xs font-bold"
            />
            <span className="absolute right-2.5 top-3.5 text-[8px] font-black text-slate-300 uppercase">
              x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
