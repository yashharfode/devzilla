'use client';

import { useState } from 'react';

type Mode = 'analyzer' | 'coach';

export default function AIAssistant({ industry }: { industry: string }) {
  const [mode, setMode] = useState<Mode>('analyzer');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [analyzerResult, setAnalyzerResult] = useState<any>(null);
  const [coachResult, setCoachResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    
    let attempts = 0;
    const maxAttempts = 3;
    let success = false;

    while (attempts < maxAttempts && !success) {
      try {
        if (attempts > 0) {
          setError(`AI format error. Re-analyzing... (Attempt ${attempts + 1}/${maxAttempts})`);
        }

        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: mode === 'analyzer' ? 'analyze_requirements' : 'sales_coach',
            industry: industry || 'General',
            input: input
          })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to communicate with AI');
        }
        
        if (mode === 'analyzer') {
          setAnalyzerResult(data);
        } else {
          setCoachResult(data);
        }
        
        success = true;
        setError(null);
      } catch (err: any) {
        attempts++;
        if (attempts >= maxAttempts) {
          setError(`Final Error: ${err.message}. Please try again.`);
        } else {
          // Wait 1 second before retrying to avoid immediate rate limit hits
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-[#050914] border border-gray-800 rounded-xl p-5 shadow-inner mt-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5 border-b border-gray-800 pb-3 relative z-10">
        <h4 className="text-sm text-gray-300 font-bold uppercase tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-brain text-blue-400 animate-pulse"></i> AI Intelligence
        </h4>
        <div className="flex gap-2">
          <button 
            onClick={() => setMode('analyzer')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors border ${mode === 'analyzer' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-gray-800/50 text-gray-500 border-transparent hover:text-gray-300'}`}
          >
            Requirement Analyzer
          </button>
          <button 
            onClick={() => setMode('coach')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors border ${mode === 'coach' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-gray-800/50 text-gray-500 border-transparent hover:text-gray-300'}`}
          >
            Sales Coach
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <textarea 
          className="w-full h-20 bg-black/50 border border-gray-800 rounded-xl p-3 text-gray-300 text-xs focus:outline-none focus:border-blue-500/50 resize-none custom-scrollbar mb-3"
          placeholder={mode === 'analyzer' ? "Paste raw client requirements or meeting notes here..." : "Type the client's objection (e.g. 'Your price is too high compared to freelancers')..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        ></textarea>

        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] text-gray-600 font-mono">Industry Context: {industry || 'General'}</span>
          <button 
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-bolt"></i>}
            {mode === 'analyzer' ? 'Analyze' : 'Get Response'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs mb-4">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i> {error}
          </div>
        )}

        {/* Results Area */}
        {mode === 'analyzer' && analyzerResult && !loading && (
          <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl mt-4 animate-fade-in text-sm space-y-3">
            <div className="flex justify-between items-center border-b border-blue-500/20 pb-2">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Analysis Result</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${analyzerResult.dealProbabilityScore >= 70 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                Win Probability: {analyzerResult.dealProbabilityScore}%
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Base Package</p>
                <p className="text-white font-mono font-bold capitalize text-sm">{analyzerResult.recommendedBasePackage}</p>
                <p className="text-xs text-blue-300/70 mt-1">{analyzerResult.baseReasoning}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Estimated Timeline</p>
                <p className="text-white font-mono font-bold text-sm">{analyzerResult.estimatedTimeline}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Recommended Add-ons</p>
              <div className="flex flex-wrap gap-2">
                {analyzerResult.recommendedAddons.map((addon: string, i: number) => (
                  <span key={i} className="bg-gray-800 text-gray-300 text-[10px] px-2 py-1 rounded border border-gray-700">{addon}</span>
                ))}
              </div>
              <p className="text-xs text-blue-300/70 mt-2">{analyzerResult.addonsReasoning}</p>
            </div>

            <div className="pt-2 border-t border-blue-500/20">
              <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 flex items-center gap-1.5"><i className="fa-solid fa-forward-step"></i> Next Action</p>
              <p className="text-white text-sm font-medium">{analyzerResult.nextAction}</p>
            </div>
          </div>
        )}

        {mode === 'coach' && coachResult && !loading && (
          <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl mt-4 animate-fade-in text-sm space-y-4">
            <div>
              <p className="text-[10px] text-emerald-500 font-bold uppercase mb-1 flex items-center gap-1.5"><i className="fa-solid fa-magnifying-glass-chart"></i> Objection Analysis</p>
              <p className="text-emerald-100/80 text-xs italic">"{coachResult.objectionAnalysis}"</p>
            </div>
            
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Tactical Responses</p>
              <ul className="space-y-2">
                {coachResult.responses.map((resp: string, i: number) => (
                  <li key={i} className="bg-black/40 border border-gray-800 p-3 rounded-lg text-xs text-gray-200 flex gap-3 group hover:border-emerald-500/30 transition-colors">
                    <span className="text-emerald-500 font-bold font-mono opacity-50 group-hover:opacity-100">0{i+1}</span>
                    <p className="leading-relaxed">{resp}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
