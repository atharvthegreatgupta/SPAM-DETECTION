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
      const response = await fetch('https://spam-detection-q6ez.onrender.com/predict', {
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
    // Changed slate to zinc for a warmer dark background, and selection color to amber
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans text-zinc-200 selection:bg-orange-500/30">
      
      {/* Sleek Glassmorphic Card */}
      <div className="w-full max-w-2xl bg-zinc-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 p-8 relative overflow-hidden">
        
        {/* Decorative Background Glow - Switched to Yellow/Orange/Amber */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
        
        {/* Ambient background glow inside the card */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2 tracking-tight relative z-10">
          Email Checker
        </h1>
        <p className="text-zinc-400 mb-8 text-lg relative z-10">
          Paste an email below and let the machine learning model analyze it in real-time.
        </p>
        
        <textarea 
          className="relative z-10 w-full h-48 bg-zinc-950 border border-zinc-700 rounded-xl p-5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none shadow-inner" 
          placeholder="e.g., URGENT! You've been selected to win a $500 gift card. Click here now..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        ></textarea>

        <button 
          className="relative z-10 mt-6 w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-zinc-950 font-extrabold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-orange-900/20"
          onClick={analyzeEmail}
          disabled={loading || !emailText.trim()}
        >
          {loading ? 'Scanning Message...' : 'Analyze Message'}
        </button>

        {/* Dynamic Results Display */}
        {result && (
          <div className={`relative z-10 mt-8 p-6 rounded-xl border-l-4 transition-all animate-in fade-in slide-in-from-bottom-4 ${
            result.result === 'SPAM' ? 'bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
            result.result === 'SAFE' ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
            'bg-orange-950/40 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
          }`}>
            <h3 className={`text-2xl font-black tracking-wide ${
              result.result === 'SPAM' ? 'text-red-400' : 
              result.result === 'SAFE' ? 'text-emerald-400' : 'text-orange-400'
            }`}>
              {result.result}
            </h3>
            <p className="mt-2 text-zinc-300 text-lg leading-relaxed">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App