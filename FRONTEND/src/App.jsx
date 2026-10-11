import { useState } from 'react'

function App() {
  const [emailText, setEmailText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeEmail = async () => {
    if (!emailText.trim()) return
    
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: emailText })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ result: "ERROR", message: "Could not connect to the Python backend API." })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-200 selection:bg-purple-500/30">
      
      {/* Sleek Glassmorphic Card */}
      <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800 p-8 relative overflow-hidden">
        
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 tracking-tight">
          AI Spam Detector
        </h1>
        <p className="text-slate-400 mb-8 text-lg">
          Paste an email below and let the machine learning model analyze it in real-time.
        </p>
        
        <textarea 
          className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none shadow-inner" 
          placeholder="e.g., URGENT! You've been selected to win a $500 gift card. Click here now..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        ></textarea>

        <button 
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-900/20"
          onClick={analyzeEmail}
          disabled={loading || !emailText.trim()}
        >
          {loading ? 'Analyzing Neural Patterns...' : 'Analyze Message'}
        </button>

        {/* Dynamic Results Display */}
        {result && (
          <div className={`mt-8 p-6 rounded-xl border-l-4 transition-all animate-in fade-in slide-in-from-bottom-4 ${
            result.result === 'SPAM' ? 'bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
            result.result === 'SAFE' ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
            'bg-yellow-950/40 border-yellow-500'
          }`}>
            <h3 className={`text-2xl font-black tracking-wide ${
              result.result === 'SPAM' ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {result.result}
            </h3>
            <p className="mt-2 text-slate-300 text-lg leading-relaxed">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App