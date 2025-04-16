
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
      className={`choice-button ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary/10'}`}
    >
      {icon && <span className="text-primary">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default ChoiceButton;
