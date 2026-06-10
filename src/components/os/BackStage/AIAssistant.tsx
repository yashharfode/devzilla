'use client';

import { useState, useEffect } from 'react';

type Mode = 'analyzer' | 'coach';
type ChatMessage = { role: 'user' | 'assistant', content: string };

const LOADING_MESSAGES = [
  "Analyzing Psychology...",
  "Calculating Probabilities...",
  "Running Deep Inference...",
  "Formulating Tactical Response..."
];

export default function AIAssistant({ industry }: { industry: string }) {
  const [mode, setMode] = useState<Mode>('analyzer');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("nvidia/nemotron-3-super-120b-a12b:free");
  
  const [analyzerResult, setAnalyzerResult] = useState<any>(null);
  const [coachResult, setCoachResult] = useState<any>(null);
  
  // Continuous Conversation Context
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    setLoadingTextIdx(0);
    
    // Optimistically add user input to history
    const currentInput = input;
    const currentHistory = [...chatHistory, { role: 'user', content: currentInput } as ChatMessage];
    
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
            input: currentInput,
            history: chatHistory,
            model: selectedModel
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
        
        // Update history with success
        setChatHistory([
          ...currentHistory,
          { role: 'assistant', content: JSON.stringify(data) }
        ]);
        
        // Clear input for next prompt
        setInput('');
        success = true;
        setError(null);
      } catch (err: any) {
        attempts++;
        if (attempts >= maxAttempts) {
          setError(`Final Error: ${err.message}. Please try again.`);
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    setLoading(false);
  };

  const clearHistory = () => {
    setChatHistory([]);
    setAnalyzerResult(null);
    setCoachResult(null);
    setInput('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-inner mt-6 relative overflow-hidden flex flex-col h-full max-h-[800px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3 relative z-10 shrink-0">
        <h4 className="text-sm text-gray-700 font-bold uppercase tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-brain text-[#0d9488] animate-pulse"></i> AI Intelligence
        </h4>
        <div className="flex gap-2">
          <button 
            onClick={() => setMode('analyzer')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors border ${mode === 'analyzer' ? 'bg-teal-500/10 text-[#0d9488] border-teal-500/30' : 'bg-gray-200/50 text-gray-500 border-transparent hover:text-gray-700'}`}
          >
            Analyzer
          </button>
          <button 
            onClick={() => setMode('coach')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors border ${mode === 'coach' ? 'bg-teal-500/10 text-[#0d9488] border-teal-500/30' : 'bg-gray-200/50 text-gray-500 border-transparent hover:text-gray-700'}`}
          >
            Coach
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4 space-y-4">
        {chatHistory.length > 0 && (
          <div className="flex justify-end mb-2">
            <button onClick={clearHistory} className="text-[10px] text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1">
              <i className="fa-solid fa-trash-can"></i> Clear Context
            </button>
          </div>
        )}

        {/* Existing Results mapping (we could map history, but showing the latest is fine, or we map history) */}
        {/* Actually, mapping history makes it a real chat. Let's show the latest result blocks and a basic chat trail */}
        {chatHistory.map((msg, idx) => (
          msg.role === 'user' ? (
            <div key={idx} className="bg-gray-100 border border-gray-300/50 rounded-lg p-3 text-xs text-gray-700 self-end max-w-[85%]">
              <span className="text-gray-500 font-bold block mb-1">You:</span>
              {msg.content}
            </div>
          ) : (
            <div key={idx} className="self-start w-full">
              {/* Only render fully formatted UI for the very last message to keep it clean, or just show text */}
              {idx === chatHistory.length - 1 && mode === 'analyzer' && analyzerResult && !loading && (
                <div className="bg-teal-50 border border-teal-500/20 p-4 rounded-xl animate-fade-in text-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-teal-500/20 pb-2">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Analysis Result</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${analyzerResult.dealProbabilityScore >= 70 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                      Win Probability: {analyzerResult.dealProbabilityScore}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Base Package</p>
                      <p className="text-[#1e293b] font-mono font-bold capitalize text-sm">{analyzerResult.recommendedBasePackage}</p>
                      <p className="text-xs text-blue-300/70 mt-1">{analyzerResult.baseReasoning}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Estimated Timeline</p>
                      <p className="text-[#1e293b] font-mono font-bold text-sm">{analyzerResult.estimatedTimeline}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Recommended Add-ons</p>
                    <div className="flex flex-wrap gap-2">
                      {analyzerResult.recommendedAddons?.map((addon: string, i: number) => (
                        <span key={i} className="bg-gray-200 text-gray-700 text-[10px] px-2 py-1 rounded border border-gray-300">{addon}</span>
                      ))}
                    </div>
                    <p className="text-xs text-blue-300/70 mt-2">{analyzerResult.addonsReasoning}</p>
                  </div>
                  <div className="pt-2 border-t border-teal-500/20">
                    <p className="text-[10px] text-[#0d9488] font-bold uppercase mb-1 flex items-center gap-1.5"><i className="fa-solid fa-forward-step"></i> Next Action</p>
                    <p className="text-[#1e293b] text-sm font-medium">{analyzerResult.nextAction}</p>
                  </div>
                </div>
              )}
              {idx === chatHistory.length - 1 && mode === 'coach' && coachResult && !loading && (
                <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl animate-fade-in text-sm space-y-4">
                  <div>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase mb-1 flex items-center gap-1.5"><i className="fa-solid fa-magnifying-glass-chart"></i> Objection Analysis</p>
                    <p className="text-emerald-100/80 text-xs italic">"{coachResult.objectionAnalysis}"</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Tactical Responses</p>
                    <ul className="space-y-2">
                      {coachResult.responses?.map((resp: string, i: number) => (
                        <li key={i} className="bg-gray-100 border border-gray-200 p-3 rounded-lg text-xs text-gray-800 flex gap-3 group hover:border-emerald-500/30 transition-colors">
                          <span className="text-emerald-500 font-bold font-mono opacity-50 group-hover:opacity-100">0{i+1}</span>
                          <p className="leading-relaxed">{resp}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* If it's not the last message, just show a minimized summary to save space */}
              {idx !== chatHistory.length - 1 && (
                <div className="bg-teal-50/50 border border-blue-500/10 p-2 rounded-lg text-xs text-blue-200/50 italic flex items-center gap-2 w-fit">
                  <i className="fa-solid fa-check-circle text-[10px]"></i> AI Response Received
                </div>
              )}
            </div>
          )
        ))}
        
        {/* Skeleton Loader Array */}
        {loading && (
          <div className="self-start w-full bg-white border border-gray-200/50 p-4 rounded-xl animate-pulse space-y-4 mt-2">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-circle-notch fa-spin text-[#0d9488]"></i>
              <span className="text-sm font-bold text-[#0d9488] font-mono tracking-wide">{LOADING_MESSAGES[loadingTextIdx]}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
          </div>
        )}
      </div>

      <div className="relative z-10 shrink-0 mt-2">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-2 rounded-lg text-xs mb-3 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i> {error}
          </div>
        )}
        
        <textarea 
          className="w-full h-16 bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 text-xs focus:outline-none focus:border-teal-500/30 resize-none custom-scrollbar mb-2"
          placeholder={mode === 'analyzer' ? "Paste raw client requirements or notes here..." : "Type the client's objection (e.g. 'Your price is too high')..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        ></textarea>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-600 font-mono">Context: {industry || 'General'}</span>
            <select 
              className="bg-gray-50 border border-gray-200 rounded p-1 text-[9px] text-gray-500 outline-none w-24 truncate"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              title="Select AI Model"
            >
              <option value="nvidia/nemotron-3-super-120b-a12b:free">Nemotron 120B (Best)</option>
              <option value="liquid/lfm-2.5-1.2b-instruct:free">Liquid LFM (Fast)</option>
            </select>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="bg-[#0d9488] hover:bg-[#0f766e] disabled:opacity-50 disabled:cursor-not-allowed text-[#1e293b] text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-md shadow-teal-500/20"
          >
            {loading ? <i className="fa-solid fa-hourglass-half"></i> : <i className="fa-solid fa-paper-plane"></i>}
            {mode === 'analyzer' ? 'Analyze' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
