"use client";
import { useState } from 'react';

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLength, setVideoLength] = useState(5); // 5 or 10
  const [credits, setCredits] = useState(5);

  const handleGenerate = async () => {
    const cost = videoLength === 5 ? 3 : 7;
    if (credits < cost) {
      alert(`You need ${cost} credits to make a ${videoLength}s video. You only have ${credits} left. Please watch an ad or buy a plan!`);
      return;
    }

    setIsGenerating(true);
    setCredits(prev => prev - cost);
    // Simulating AI delay
    setTimeout(() => {
        setVideoUrl("https://media.w3.org/2010/05/sintel/trailer.mp4");
        setIsGenerating(false);
    }, 5000);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ flex: 1, marginTop: "4rem" }}>
          <p style={{ color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.7rem", marginBottom: "1rem" }}>History</p>
          <div className="sidebar-item" style={{ marginBottom: "1rem", height: "40px", background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "0.8rem", display: "flex", alignItems: "center" }}>Cyberpunk City...</div>
        </div>

        <div className="credit-badge">
          Remaining: {credits} Credits
        </div>
        <a href="/#pricing" style={{ marginTop: "1rem", textDecoration: "none", color: "white", textAlign: "center", fontSize: "0.8rem" }}>Get More Credits</a>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem" }}>
          <h2>Create <span style={{ color: "var(--accent-1)" }}>Video</span></h2>
          <div style={{ color: "var(--text-secondary)" }}>Guest Mode Active (5 Free Credits)</div>
        </header>

        <div className="prompt-area">
          <textarea 
            placeholder="Describe the video you want to generate in detail..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Video Length:</label>
            <select 
              value={videoLength} 
              onChange={(e) => setVideoLength(Number(e.target.value))}
              style={{ background: "transparent", border: "1px solid var(--border-color)", color: "white", padding: "0.5rem", borderRadius: "8px" }}
            >
              <option value={5} style={{ color: "black" }}>5 Seconds (3 Credits)</option>
              <option value={10} style={{ color: "black" }}>10 Seconds (7 Credits)</option>
            </select>
          </div>

          <div className="controls">
            <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>AI Model: Stable Video Diffusion</div>
            <button 
              className="btn-primary" 
              onClick={handleGenerate}
              disabled={isGenerating || prompt === ""}
              style={{ opacity: isGenerating || prompt === "" ? 0.5 : 1 }}
            >
              {isGenerating ? "Generating..." : `Generate (${videoLength === 5 ? 3 : 7} Credits)`}
            </button>
          </div>
        </div>

        <div className="video-player-container">
          {isGenerating ? (
            <div style={{ textAlign: "center" }}>
                <span className="loader"></span>
                <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>AI is crafting your {videoLength}s video...</p>
            </div>
          ) : videoUrl ? (
            <video controls width="100%" style={{ borderRadius: "12px", height: "100%", width: "100%", objectFit: "cover" }} autoPlay>
                <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div style={{ color: "var(--text-secondary)" }}>Your masterpiece will appear here.</div>
          )}
        </div>
      </main>
    </div>
  );
}
