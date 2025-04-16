
import { ReactNode } from 'react';

interface ChoiceButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

const ChoiceButton = ({ onClick, icon, children, disabled = false }: ChoiceButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`choice-button group mb-3 w-full p-4 rounded-lg border border-border flex items-center gap-3 transition-all duration-300 ${
        disabled 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:bg-primary/10 hover:border-primary/30 hover:translate-x-1'
      }`}
    >
      {icon && <span className="text-primary text-xl">{icon}</span>}
      <span className="text-left group-hover:text-primary transition-colors duration-300">{children}</span>
    </button>
  );
};

export default ChoiceButton;
