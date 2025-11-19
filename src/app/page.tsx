'use client';

import { useState, useEffect, useRef } from 'react';

interface Droplet {
  id: number;
  timestamp: number;
}

export default function HygroelectricResearch() {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [voltage, setVoltage] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [angle, setAngle] = useState(5);
  const [headOfWater, setHeadOfWater] = useState(50);
  const [humidity, setHumidity] = useState(65);
  const [temperature, setTemperature] = useState(25);
  const [predictedVoltage, setPredictedVoltage] = useState(0);
  const nextId = useRef(0);

  // Droplet generation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const id = nextId.current++;
      setDroplets(prev => [...prev, { id, timestamp: Date.now() }]);

      setIsGenerating(true);
      setVoltage(prev => {
        const newVoltage = prev + (Math.random() * 0.4 + 0.3);
        return Math.min(newVoltage, 5.0);
      });

      setEnergy(prev => prev + (Math.random() * 15 + 10));

      setTimeout(() => setIsGenerating(false), 300);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  // Scroll progress effect - FIXED
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Predicted voltage calculation
  useEffect(() => {
    const angleEffect = angle <= 10 ? angle * 30 : 400 - angle * 5;
    const headEffect = headOfWater <= 60 ? headOfWater * 5 : 500 - headOfWater * 2;
    const humidityEffect = humidity * 2;
    const predicted = (angleEffect + headEffect + humidityEffect) / 3;
    setPredictedVoltage(Math.max(100, Math.min(500, predicted)));
  }, [angle, headOfWater, humidity, temperature]);

  const handleDropletComplete = (id: number) => {
    setDroplets((prev: Droplet[]) => prev.filter(d => d.id !== id));
  };

  return (
    <div className="w-full bg-black overflow-x-hidden min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">Hygroelectric Research</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#demo" className="text-gray-400 hover:text-cyan-400 transition-colors">Demo</a>
            <a href="#controls" className="text-gray-400 hover:text-cyan-400 transition-colors">Controls</a>
            <a href="#data" className="text-gray-400 hover:text-cyan-400 transition-colors">Data</a>
            <a href="#team" className="text-gray-400 hover:text-cyan-400 transition-colors">Team</a>
          </nav>
        </div>
      </header>

      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full animate-pulse" style={{ filter: 'blur(80px)', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse" style={{ filter: 'blur(80px)', animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <div id="demo" className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Content */}
            <div className="space-y-8" style={{ opacity: 1 - scrollProgress * 0.5 }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-full group hover:border-cyan-500/30 transition-all cursor-default">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
                </div>
                <span className="text-cyan-400 text-sm font-semibold tracking-wide">LIVE TENG DEMONSTRATION</span>
              </div>

              {/* Hero text */}
              <div>
                <h1 className="text-6xl lg:text-8xl font-bold leading-none mb-6">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                    Hygroelectric
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400">
                    Energy
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-xl">
                  Harvesting electricity from humidity and water droplets using 
                  <span className="text-cyan-400 font-semibold"> triboelectric nanogenerator technology</span>
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Voltage */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 group hover:border-cyan-500/30 transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-xs text-cyan-400/80 font-bold mb-3 uppercase tracking-wider">Output Voltage</div>
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-2">
                      {voltage.toFixed(2)}
                    </div>
                    <div className="text-sm text-cyan-400/60 font-semibold">Volts</div>
                    <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500"
                        style={{ width: `${(voltage / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Energy */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 group hover:border-purple-500/30 transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-xs text-purple-400/80 font-bold mb-3 uppercase tracking-wider">Energy</div>
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500 mb-2">
                      {Math.round(energy)}
                    </div>
                    <div className="text-sm text-purple-400/60 font-semibold">μJ</div>
                    <div className="mt-4 flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                            i < Math.floor((energy % 300) / 30) 
                              ? 'bg-gradient-to-t from-purple-500 to-purple-300' 
                              : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Process steps */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 space-y-4">
                {[
                  { num: '01', title: 'Droplet Impact', desc: 'Water contacts PTFE surface creating charge' },
                  { num: '02', title: 'Triboelectric Effect', desc: 'Electron transfer between Cu/Al and PTFE' },
                  { num: '03', title: 'Current Generation', desc: 'Electrons flow through external circuit' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-all">
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-0.5">{step.title}</div>
                      <div className="text-gray-500 text-sm">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - 3D Prototype Visualization */}
            <div className="relative h-[600px] bg-slate-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center animate-pulse">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">TENG Prototype</h3>
                  <p className="text-gray-400">Live Demonstration Active</p>
                  <div className="mt-6 flex justify-center gap-2">
                    {droplets.slice(-5).map((droplet) => (
                      <div
                        key={droplet.id}
                        className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Controls Section */}
      <div id="controls" className="relative py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Parameter Controls</h2>
            <p className="text-xl text-gray-400">Adjust experimental variables to see predicted voltage output</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Angle Control */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-white font-bold">Inclination Angle</label>
                <span className="text-cyan-400 text-2xl font-bold">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-sm mt-2">Optimal range: 5-10°</p>
            </div>

            {/* Head of Water Control */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-white font-bold">Head of Water</label>
                <span className="text-cyan-400 text-2xl font-bold">{headOfWater} cm</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={headOfWater}
                onChange={(e) => setHeadOfWater(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-sm mt-2">Optimal range: 50-60 cm</p>
            </div>

            {/* Humidity Control */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-white font-bold">Humidity</label>
                <span className="text-purple-400 text-2xl font-bold">{humidity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-sm mt-2">Environmental factor</p>
            </div>

            {/* Temperature Control */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-white font-bold">Temperature</label>
                <span className="text-purple-400 text-2xl font-bold">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-sm mt-2">Environmental factor</p>
            </div>
          </div>

          {/* Predicted Voltage Display */}
          <div className="mt-8 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-12 text-center">
            <h3 className="text-2xl text-white mb-4">Predicted Voltage Output</h3>
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
              {predictedVoltage.toFixed(0)} mV
            </div>
            <p className="text-gray-400 mt-4">Based on current parameter settings</p>
          </div>
        </div>
      </div>

      {/* Research Team Section */}
      <div id="team" className="relative py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Research Team</h2>
            <p className="text-xl text-gray-400">Researchathon 2025 - RV College of Engineering</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { name: 'A V Kruthi Krishna', role: 'Lead Researcher', usn: '1RV24IS001' },
              { name: 'Aayushi Priya', role: 'Data Analysis', usn: 'Team Lead' },
              { name: 'Anwesha M', role: 'Prototype Design', usn: 'Co-Lead' }
            ].map((member, i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 text-center group hover:border-cyan-500/30 transition-all">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.usn}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Project Mentor</h4>
                <p className="text-gray-400">Prof. Gowtham Prasad M.E.</p>
                <p className="text-gray-500 text-sm">Assistant Professor, Dept. of Civil Engineering</p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 font-bold">RV College of Engineering</p>
                <p className="text-gray-400 text-sm">2024-25 Academic Year</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-12 px-8 lg:px-16 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Hygroelectric Research</h4>
              <p className="text-gray-400 text-sm">Advancing sustainable energy through triboelectric nanogenerator technology</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Key Technologies</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Triboelectric Effect</li>
                <li>• PTFE-Metal Interface</li>
                <li>• Arduino Data Acquisition</li>
                <li>• Op-Amp Signal Amplification</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Research Outputs</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Peak Voltage: 398 mV @ 5°</li>
                <li>• Optimal Head: 50-60 cm</li>
                <li>• A3 Surface Area (297×420 mm)</li>
                <li>• Series Configuration Enhanced</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2025 Researchathon - RV College of Engineering. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-cyan-400 text-sm font-semibold">Powered by TENG Technology</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}