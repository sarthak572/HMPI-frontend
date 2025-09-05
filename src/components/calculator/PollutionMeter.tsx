interface PollutionMeterProps {
  value: number;
  maxValue?: number;
}

const PollutionMeter = ({ value, maxValue = 150 }: PollutionMeterProps) => {
  const getColor = (val: number) => {
    if (val <= 25) return '#22c55e'; // Green - Safe
    if (val <= 50) return '#eab308'; // Yellow - Moderate  
    if (val <= 100) return '#f97316'; // Orange - High
    return '#ef4444'; // Red - Critical
  };

  const getCategory = (val: number) => {
    if (val <= 25) return 'Safe';
    if (val <= 50) return 'Moderate';
    if (val <= 100) return 'High';
    return 'Critical';
  };

  const percentage = Math.min((value / maxValue) * 100, 100);
  const color = getColor(value);
  const category = getCategory(value);

  return (
    <div className="pollution-meter space-y-4">
      {/* Circular gauge */}
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            className="opacity-20"
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${2.51 * percentage} 251.2`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold" style={{ color }}>
            {value.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">HMPI Value</div>
        </div>
      </div>

      {/* Category indicator */}
      <div className="text-center space-y-2">
        <div 
          className="inline-block px-4 py-2 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `${color}20`, 
            color: color,
            border: `1px solid ${color}40`
          }}
        >
          {category} Level
        </div>
        
        {/* Level indicators */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>0-25</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>25-50</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>50-100</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>100+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollutionMeter;