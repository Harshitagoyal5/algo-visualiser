// src/components/SpeedControl.tsx
import React from 'react';

interface SpeedControlProps {
  speed: number;
  setSpeed: (speed: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({ speed, setSpeed }) => {
  return (
    <div className="speed-control">
      <label htmlFor="speed">Speed:</label>
      <input
        type="range"
        id="speed"
        min="1"
        max="10"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
      />
    </div>
  );
};

export default SpeedControl;