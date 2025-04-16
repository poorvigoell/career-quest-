
interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
}

const ProgressBar = ({ value, max, showLabel = false }: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Determine color based on progress
  const getColorClass = () => {
    if (percentage < 30) return "bg-blue-500";
    if (percentage < 70) return "bg-blue-600";
    return "bg-primary";
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs font-medium">
          <span>{`${Math.round(percentage)}%`}</span>
          <span>{`${value}/${max}`}</span>
        </div>
      )}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
