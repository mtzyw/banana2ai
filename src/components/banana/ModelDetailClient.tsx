'use client';

import { useState, useEffect } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const TAB_LABELS = ['技术领先', '质量卓越', '使用便捷', '商用授权'];

export default function ModelDetailClient({ features }: { features: Feature[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(true);

  // Animate content when tab changes
  const handleTabChange = (i: number) => {
    if (i === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(i);
      setVisible(true);
    }, 180);
  };

  // Distribute features across tabs
  const perTab = Math.ceil(features.length / TAB_LABELS.length);
  const tabFeatures = TAB_LABELS.map((_, i) =>
    features.slice(i * perTab, (i + 1) * perTab)
  );

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {TAB_LABELS.map((label, i) => (
          <div key={label} className="relative">
            <button
              onClick={() => handleTabChange(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === i
                  ? 'bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] text-black'
                  : 'bg-[#1c2030] text-white/60 hover:text-white hover:bg-[#252a3d]'
              }`}
            >
              {label}
            </button>
            {/* Bottom highlight line */}
            <div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ffcc33] rounded-full transition-all duration-300"
              style={{ opacity: activeTab === i ? 1 : 0, transform: activeTab === i ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </div>
        ))}
      </div>

      {/* Tab content with fade animation */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        {(tabFeatures[activeTab] ?? features).map((f, i) => (
          <div
            key={`${activeTab}-${i}`}
            className="gradient-glow-bg bg-[#0f1117] border border-[#363b4e] rounded-xl p-5 hover:border-[#ffcc33]/40 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full badge-gradient flex items-center justify-center text-xl mb-3">
              {f.icon}
            </div>
            <h3 className="font-semibold text-[#ffcc33] mb-2 text-sm">{f.title}</h3>
            <p className="text-xs text-white/60 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
