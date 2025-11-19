'use client';

import React from 'react';

type Props = {
  angle: number;
  headOfWater: number;
  humidity: number;
  temperature: number;
  predictedVoltage: number;
  onAngleChange: (v: number) => void;
  onHeadChange: (v: number) => void;
  onHumidityChange: (v: number) => void;
  onTemperatureChange: (v: number) => void;
};

export default function InputControls({
  angle,
  headOfWater,
  humidity,
  temperature,
  predictedVoltage,
  onAngleChange,
  onHeadChange,
  onHumidityChange,
  onTemperatureChange
}: Props) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-medium text-white">Prototype Controls</h3>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Angle (°): {angle}</label>
          <input
            type="range"
            min={0}
            max={90}
            value={angle}
            onChange={(e) => onAngleChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Head of Water (cm): {headOfWater}</label>
          <input
            type="range"
            min={0}
            max={200}
            value={headOfWater}
            onChange={(e) => onHeadChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Humidity (%): {humidity}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={humidity}
            onChange={(e) => onHumidityChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Temperature (°C): {temperature}</label>
          <input
            type="range"
            min={-10}
            max={60}
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="pt-2">
          <div className="text-sm text-gray-300">Predicted Voltage: <span className="font-semibold text-white">{predictedVoltage.toFixed(0)}</span></div>
        </div>
      </div>
    </div>
  );
}