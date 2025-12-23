"use client";

import { useState, useEffect } from "react";
import { MOCK_LOGS } from "@/lib/mock-data";
import {
  DailyLog,
  MoodEntry,
  CaffeineEntry,
  MedicationEntry,
} from "@/types/log";

export default function HomePage() {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedMood, setSelectedMood] = useState("Neutral");
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState<DailyLog[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("moment-logs");
      return saved ? JSON.parse(saved) : MOCK_LOGS;
    }
    return [];
  });
  const latestLog = logs.length > 0 ? logs[0] : null;
  const [severity, setSeverity] = useState(5);

  const handleSave = () => {
    // 1. Create the new Mood Entry Object
    const newEntry: MoodEntry = {
      id: Date.now().toString(), //A simple way to get a unique ID
      timestamp: selectedDateTime,
      state: selectedMood,
      severity: severity, //We can add a slider later for this!
      note: note,
    };

    // 2. Update the logs list
    // I create a copy of the old logs, but update the first one.
    const updatedLogs = [...logs];
    updatedLogs[0] = {
      ...updatedLogs[0],
      moodEntries: [newEntry, ...updatedLogs[0].moodEntries],
    };

    setLogs(updatedLogs);

    // 3. Clear the form
    setNote("");
  };

  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem("moment-logs", JSON.stringify(logs));
    }
  }, [logs]);

  return (
    <main className="p-8 font-sans">
      <section className="mb-10 p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
        <h2 className="text-xl font-bold mb-4 text-blue-800">
          Log a new Moment
        </h2>
        {/* Date and Time Picker */}
        <div>
          <label htmlFor="" className="block text-sm font-semibold mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded-md"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
          />
        </div>
        {/* Mood Dropdown */}
        <div>
          <label htmlFor="" className="block text-sm font-semibold mb-1">
            Current Mood:
          </label>
          <select
            name=""
            id=""
            className="w-full p-2 border rounded-md"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            <option value={"Elevated"}>Elevated</option>
            <option value={"Neutral"}>Neutral</option>
            <option value={"Depressed"}>Depressed</option>
            <option value={"Anxious"}>Anxious</option>
          </select>
        </div>

        {/* Notes to fill in */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold mb-1">
            Notes
          </label>
          <textarea
            name=""
            id="notes"
            className="w-full p-2 border rounded-md h-20"
            placeholder="How are you feeling?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        {/* Severity of Mood */}
        <div>
          <label htmlFor="" className="block text-sm font-semibold mb-1">
            Severity: {severity}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Moment
        </button>

        <p className="text-sm text-blue-500 italic">
          Preview: Logging {selectedMood} at {selectedDateTime || "..."}
        </p>
      </section>
      <h1 className="text-2xl font-bold mb-4">Clinical Moment Tracker</h1>
      {latestLog ? (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold">{latestLog.date}</h2>
          <p className="text-gray-600 italic">&quot;{latestLog.notes}&quot;</p>

          <div className="mt-4">
            <h3 className="font-bold">Mood Moments</h3>
            {latestLog.moodEntries.map((entry: MoodEntry) => (
              <div key={entry.id} className="ml-4 border-l-2 pl-2 mt-2">
                {/* 1. Formatted timestamp update */}
                <p className="text-xs text-blue-500 font-semibold">
                  {entry.timestamp
                    ? new Date(entry.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "No Time"}
                </p>
                <p>
                  {entry.state} - Severity: {entry.severity}
                </p>
                <p className="text-sm text-gray-400">{entry.note}</p>
              </div>
            ))}
          </div>
          {/* Caffeine Section */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-bold text-orange-700">Caffeine Intake</h3>
            {latestLog.caffeineEntries.map((caf: CaffeineEntry) => (
              <div key={caf.id} className="ml-4 mt-2">
                <p>
                  {caf.type}: {caf.amount} servings/mg
                </p>
              </div>
            ))}

            {/* Medication Section */}
            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold text-emerald-700">Medications</h3>
              {latestLog.medicationEntries.map((med: MedicationEntry) => (
                <div key={med.id} className="ml-4 mt-2 flex items-center gap-2">
                  <input type="checkbox" checked={med.taken} readOnly />
                  <p className={med.taken ? "line-through text-gray-400" : ""}>
                    {med.name} ({med.dosage})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 text-center border-2 border-dashed rounded-lg text-gray-400">
          No Logs found. Start by adding a moment above!
        </div>
      )}
    </main>
  );
}
