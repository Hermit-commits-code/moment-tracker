'use client';
import { useState } from 'react';
import { useLogs } from '@/hooks/useLogs';
import LogForm from '@/components/LogForm';
import HistoryCard from '@/components/HistoryCard';
import Insights from '@/components/Insights';
import { MoodEntry } from '@/types/log';
import { exportToPDF } from '@/lib/exportService';

export default function Home() {
  const { logs, loading, saveLog, deleteLog } = useLogs();
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const [activeTab, setActiveTab] = useState<'log' | 'history' | 'insights'>(
    'log',
  );

  const handleSave = async (data: any) => {
    await saveLog(data);
    setEditingEntry(null);
    setActiveTab('history');
  };

  const handleEdit = (entry: MoodEntry) => {
    setEditingEntry(entry);
    setActiveTab('log');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Syncing Clinical Data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 no-print">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
              Bipolar <span className="text-indigo-600">Architect</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Clinical Monitoring v2.0
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['log', 'history', 'insights'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-8">
        {activeTab === 'log' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight px-2">
              {editingEntry ? 'Edit Moment' : 'New Moment'}
            </h2>
            <LogForm onSave={handleSave} initialData={editingEntry} />
          </div>
        )}

        {/* Combined View for History and Insights when Exporting */}
        {(activeTab === 'history' || activeTab === 'insights') && (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2 no-print">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {activeTab === 'history' ? 'History' : 'Insights'}
              </h2>
              <button
                onClick={() =>
                  exportToPDF('clinical-report', 'Bipolar-Architect-Report')
                }
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print Report
              </button>
            </div>

            <div id="clinical-report" className="space-y-8">
              {/* PRINT-ONLY HEADER: This only appears in the PDF */}
              <div className="hidden print:block clinical-report-header">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
                    Clinical Mood Report
                  </h1>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Patient Observation Data
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Generated
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {activeTab === 'insights' ? (
                <Insights logs={logs} />
              ) : (
                <HistoryCard
                  logs={logs}
                  onEditMood={handleEdit}
                  onDeleteMood={deleteLog}
                />
              )}

              {/* PRINT-ONLY FOOTER */}
              <div className="hidden print:block pt-12 text-center border-t border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  End of Clinical Record
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
