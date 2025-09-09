import { useEffect, useState } from "react";

interface SpeedometerProps {
  value: number;
  maxValue?: number;
  className?: string;
}

const Speedometer = ({ value, maxValue = 125, className = "" }: SpeedometerProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  // Calculate angle for the needle (180 degrees total, from -90 to +90)
  const angle = ((animatedValue / maxValue) * 180) - 90;
  
  // Determine status and color based on value
  const getStatus = (val: number) => {
    if (val < 25) return { text: "Safe", color: "#22c55e" };
    if (val < 50) return { text: "Moderate", color: "#eab308" };
    if (val < 100) return { text: "High", color: "#f97316" };
    return { text: "Critical", color: "#ef4444" };
  };

  const status = getStatus(animatedValue);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
          {/* Background arc segments */}
          <path
            d="M 20 100 A 80 80 0 0 1 60 40"
            fill="none"
            stroke="#22c55e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 60 40 A 80 80 0 0 1 100 20"
            fill="none"
            stroke="#eab308"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 100 20 A 80 80 0 0 1 140 40"
            fill="none"
            stroke="#f97316"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 140 40 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Center dot */}
          <circle cx="100" cy="100" r="8" fill="#64748b" />
          
          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${angle} 100 100)`}
            style={{
              transition: "transform 1s ease-out"
            }}
          />
          
          {/* Scale marks */}
          {Array.from({ length: 6 }, (_, i) => {
            const markAngle = (i * 36) - 90;
            const markValue = (i * 25);
            const radians = (markAngle * Math.PI) / 180;
            const x1 = 100 + 75 * Math.cos(radians);
            const y1 = 100 + 75 * Math.sin(radians);
            const x2 = 100 + 85 * Math.cos(radians);
            const y2 = 100 + 85 * Math.sin(radians);
            const textX = 100 + 90 * Math.cos(radians);
            const textY = 100 + 90 * Math.sin(radians);
            
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#64748b"
                  strokeWidth="2"
                />
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-muted-foreground"
                  fontSize="10"
                >
                  {markValue}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Value and status display */}
      <div className="text-center mt-2">
        <div className="text-2xl font-bold" style={{ color: status.color }}>
          {animatedValue.toFixed(1)}
        </div>
        <div className="text-sm font-medium" style={{ color: status.color }}>
          {status.text}
        </div>
      </div>
    </div>
  );
};

export default Speedometer;