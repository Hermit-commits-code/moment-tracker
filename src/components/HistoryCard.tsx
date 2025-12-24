"use client";
import { DailyLog, MoodEntry } from "@/types/log";

export default function HistoryCard({ logs, onEditMood, onDeleteMood }: any) {
  return (
    <div className="space-y-6">
      {logs.map((log: DailyLog) => {
        const nightlySleep =
          log.moodEntries.find((m) => !m.isNap)?.sleepHours || 0;
        const totalCaffeine =
          log.caffeineEntries?.reduce((sum, c) => sum + c.amount, 0) || 0;

        return (
          <div
            key={log.date}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Day Header */}
            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">
                {new Date(log.date + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase">
                    Sleep
                  </p>
                  <p className="text-xs font-black text-indigo-600">
                    {nightlySleep}h
                  </p>
                </div>
                {totalCaffeine > 0 && (
                  <div className="text-right border-l border-slate-200 pl-4">
                    <p className="text-[8px] font-black text-slate-400 uppercase">
                      Caffeine
                    </p>
                    <p className="text-xs font-black text-emerald-600">
                      {totalCaffeine}mg
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Entries List */}
            <div className="divide-y divide-slate-100">
              {log.moodEntries.map((m: MoodEntry) => (
                <div key={m.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            m.state === "Elevated"
                              ? "bg-green-500 text-white"
                              : "bg-slate-900 text-white"
                          }`}
                        >
                          {m.state}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">
                          Sev: {m.severity}/10
                        </span>
                      </div>
                      {/* ADDED: Time Range Display */}
                      <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight">
                        {new Date(m.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" — "}
                        {new Date(m.endTime || m.timestamp).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => onEditMood(m, log.date)}
                      className="text-[10px] font-black text-slate-300 hover:text-indigo-600 uppercase"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Triggers & Symptoms */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.triggers?.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[8px] font-black uppercase"
                      >
                        Trigger: {t}
                      </span>
                    ))}
                    {m.symptoms?.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[8px] font-black uppercase"
                      >
                        Symptom: {s}
                      </span>
                    ))}
                    {m.isNap && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[8px] font-black uppercase">
                        Nap: {m.sleepHours}h
                      </span>
                    )}
                  </div>

                  {m.note && (
                    <p className="mt-4 text-xs text-slate-500 italic border-l-2 border-slate-100 pl-3">
                      "{m.note}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
