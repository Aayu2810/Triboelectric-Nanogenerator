'use client';

import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { angleVoltageData, headVoltageData } from '@/data/experimentalData';

export const DataCharts = () => {
  return (
    <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-b from-black to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Experimental Data Analysis</h2>
          <p className="text-xl text-gray-400">Interactive visualizations from research findings</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Angle vs Voltage Chart */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Angle vs Output Voltage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={angleVoltageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="angle" 
                  stroke="#94a3b8"
                  label={{ value: 'Angle (degrees)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  label={{ value: 'Voltage (mV)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #06b6d4', borderRadius: '8px' }}
                  labelStyle={{ color: '#06b6d4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="voltage" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-gray-400 text-sm mt-4">Peak output observed at 5° inclination (398 mV)</p>
          </div>

          {/* Head vs Voltage Chart */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-6">Head of Water vs Voltage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="head" 
                  stroke="#94a3b8"
                  label={{ value: 'Head (cm)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                />
                <YAxis 
                  dataKey="voltage"
                  stroke="#94a3b8"
                  label={{ value: 'Voltage (mV)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #a855f7', borderRadius: '8px' }}
                  labelStyle={{ color: '#a855f7' }}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter 
                  data={headVoltageData} 
                  fill="#a855f7"
                  line={{ stroke: '#a855f7', strokeWidth: 2 }}
                />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="text-gray-400 text-sm mt-4">Optimal head at 50 cm with 320 mV output</p>
          </div>
        </div>

        {/* Key Insights Panel */}
        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Key Research Insights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-white font-bold">Material Selection</h4>
              <p className="text-gray-400 text-sm">Aluminum-PTFE pairing showed 0.1-0.7V output, superior to copper-PTFE (0.25V)</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-white font-bold">Optimal Configuration</h4>
              <p className="text-gray-400 text-sm">5-10° angle with 50-60cm head provides maximum triboelectric efficiency</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-white font-bold">Series Enhancement</h4>
              <p className="text-gray-400 text-sm">Combined prototypes reached hundreds of millivolts through series connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};