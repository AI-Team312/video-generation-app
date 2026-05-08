"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Write Your Prompt",
      description: "Describe the scene you want to create. Be as detailed as you like, from camera angles to lighting effects.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Choose Duration",
      description: "Select the length of your video from 5 to 59 seconds. Our AI optimizes credits based on the length you choose.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      number: "03",
      title: "AI Generation",
      description: "Our state-of-the-art neural networks process your request, frame by frame, creating cinematic quality video in minutes.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Download & Share",
      description: "Once finished, download your high-resolution video and share it with the world or use it in your projects.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    }
  ];

  return (
    <main className="how-it-works-page">
      <section className="how-it-works-hero">
        <h1>
          How <span style={{ color: "var(--accent-1)" }}>VidFlow</span> Works
        </h1>
        <p>
          Generating high-quality AI video has never been easier. Follow these simple steps to bring your imagination to life.
        </p>
      </section>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">
              {step.number}
            </div>
            <div className="step-icon">
              {step.icon}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      <section className="cta-section">
        <h2>Ready to create your first masterpiece?</h2>
        <p>Join thousands of creators using VidFlow to push the boundaries of AI video.</p>
        <a href="/dashboard" className="btn-primary" style={{ padding: "1rem 2.5rem" }}>Get Started Now</a>
      </section>
    </main>

  );
}
