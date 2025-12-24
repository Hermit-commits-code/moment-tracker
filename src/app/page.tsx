"use client";
import { useState, useEffect } from "react";
import LogForm from "@/components/LogForm";
import HistoryCard from "@/components/HistoryCard";
import Insights from "@/components/Insights";
import { useLogs } from "@/hooks/useLogs";
import { MoodEntry } from "@/types/log";

export default function TrackerPage() {
  const { logs, saveLog, deleteLog } = useLogs();
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          Moment Tracker
        </h1>
        <p className="text-slate-500 font-bold uppercase text-[10px]">
          Clinical Mood & Sleep Architecture
        </p>
      </header>

      <Insights logs={logs} />

      <section>
        <LogForm
          key={editingEntry?.id || "new"}
          onSave={(data) => {
            saveLog(data);
            setEditingEntry(null);
          }}
          initialData={editingEntry}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-black uppercase tracking-tighter">
          History
        </h2>
        <HistoryCard
          logs={logs}
          onEditMood={(mood) => {
            setEditingEntry(mood);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onDeleteMood={deleteLog}
        />
      </section>
    </main>
  );
}
