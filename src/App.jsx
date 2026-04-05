import React, { useState, useEffect } from 'react';
import './App.css';

const BASE_URL = 'https://ponchoed-meri-unidly.ngrok-free.dev';

function App() {
  const [prompt, setPrompt] = useState('Build a blog API with JWT authentication');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('No output yet');
  const [status, setStatus] = useState('idle');

  // Poll for results
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/result`);
        const data = await res.json();
        setOutput(data.output || 'Processing...');
        
        if (!data.is_running) {
          setIsRunning(false);
          setStatus('complete');
        }
      } catch (err) {
        console.error('Error fetching result:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const runPipeline = async () => {
    setIsRunning(true);
    setStatus('running');
    setOutput('Pipeline started...');

    try {
      const res = await fetch(`${BASE_URL}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const error = await res.json();
        setOutput(`Error: ${error.message}`);
        setIsRunning(false);
        setStatus('error');
      }
    } catch (err) {
      setOutput(`Connection error: ${err.message}`);
      setIsRunning(false);
      setStatus('error');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 AgentForge AI</h1>
        <p>Multi-Agent System for Code Generation</p>
      </header>

      <div className="card input-card">
        <h2>📝 Project Request</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your project..."
          disabled={isRunning}
          className="input-textarea"
        />
        <button
          onClick={runPipeline}
          disabled={isRunning || !prompt.trim()}
          className={`btn btn-primary ${isRunning ? 'loading' : ''}`}
        >
          {isRunning ? '⏳ Running Pipeline...' : '▶ Start CodeForge'}
        </button>
      </div>

      <div className="card output-card">
        <h2>📊 Output</h2>
        <div className={`status-badge status-${status}`}>
          {status === 'idle' && '⚪ Idle'}
          {status === 'running' && '🟡 Running'}
          {status === 'complete' && '🟢 Complete'}
          {status === 'error' && '🔴 Error'}
        </div>
        <pre className="output-text">{output}</pre>
      </div>

      <div className="endpoints">
        <h3>API Endpoints</h3>
        <ul>
          <li><code>POST /run</code> - Start pipeline</li>
          <li><code>GET /result</code> - Get results</li>
          <li><code>GET /status</code> - Check status</li>
          <li><code>GET /</code> - Health check</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
