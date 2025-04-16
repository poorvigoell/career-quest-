
interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
}

const ProgressBar = ({ value, max, showLabel = false }: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs font-medium">
          <span>{`${Math.round(percentage)}%`}</span>
          <span>{`${value}/${max}`}</span>
        </div>
      )}
      <div className="progress-container">
        <div 
          className="progress-bar" 
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
