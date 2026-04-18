"use client";
import { useState } from "react";

function PricingButton({ plan, label, className }: { plan: string; label: string; className: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (e) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} className={className} disabled={loading}
      style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer', width: '100%' }}>
      {loading ? 'Redirecting...' : label}
    </button>
  );
}

export default function Home() {
  return (
    <main>
      <header className="hero">
        <h1>Transform Your Prompts into <span>Cinematic Reality</span></h1>
        <p>The next generation of AI video creation. High quality, fast, and simple. Stop dreaming, start generating.</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/dashboard" className="btn-primary">Create Video Now</a>
          <a href="#pricing" className="btn-outline">View Plans</a>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="dashboard-preview" id="dashboard">
          <div className="preview-top">
            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
          </div>
          <div className="preview-body">
            <div className="preview-sidebar">
              <div className="sidebar-item" style={{ width: "100%", height: "20px", background: "var(--primary)", opacity: 0.2 }}></div>
              <div className="sidebar-item" style={{ width: "80%" }}></div>
              <div className="sidebar-item" style={{ width: "90%" }}></div>
              <div className="sidebar-item" style={{ width: "70%" }}></div>
              <div style={{ marginTop: "auto" }} className="sidebar-item"></div>
            </div>
            <div className="preview-main">
              <div className="input-mock">
                &quot;A cinematic shot of a futuristic city in Mars with flying vehicles, neon lighting, 8k resolution...&quot;
              </div>
              <div className="video-mock"></div>
            </div>
          </div>
        </div>
      </header>

      <section id="pricing" className="pricing">
        <h2 className="section-title">Transparent <span>Pricing</span></h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "1.1rem" }}>
          5 Sec Video = <strong>3 Credits</strong> &nbsp; | &nbsp; 10 Sec Video = <strong>7 Credits</strong>
        </p>
        <div className="pricing-grid">

          {/* Starter Plan */}
          <div className="price-card">
            <h3>Starter</h3>
            <div className="price-value">$4<span>.99<span>/mo</span></span></div>
            <div className="credits-count">30 Credits / Month</div>
            <ul className="features-list">
              <li>~ 10 Short Videos</li>
              <li>720p Resolution</li>
              <li>Standard Speed</li>
              <li>Email Support</li>
            </ul>
            <PricingButton plan="starter" label="Choose Starter" className="btn-outline" />
          </div>

          {/* Pro Plan */}
          <div className="price-card popular">
            <div className="popular-tag">Best Value</div>
            <h3>Pro</h3>
            <div className="price-value">$11<span>.99<span>/mo</span></span></div>
            <div className="credits-count">90 Credits / Month</div>
            <ul className="features-list">
              <li>~ 30 Short Videos</li>
              <li>1080p Crystal Clear</li>
              <li>Priority Generation</li>
              <li>Commercial Rights</li>
            </ul>
            <PricingButton plan="pro" label="Get Pro Now" className="btn-primary" />
          </div>

          {/* Elite Plan */}
          <div className="price-card">
            <h3>Elite</h3>
            <div className="price-value">$24<span>.99<span>/mo</span></span></div>
            <div className="credits-count">180 Credits / Month</div>
            <ul className="features-list">
              <li>~ 60 Short Videos</li>
              <li>4K AI Upscaling</li>
              <li>Instant Generation</li>
              <li>Dedicated Manager</li>
            </ul>
            <PricingButton plan="elite" label="Choose Elite" className="btn-outline" />
          </div>

        </div>
      </section>
    </main>
  );
}
