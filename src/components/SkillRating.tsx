
import { CSSProperties } from 'react';

interface SkillRatingProps {
  skill: string;
  rating: number;
  maxRating?: number;
  color?: string;
}

const SkillRating = ({ 
  skill, 
  rating, 
  maxRating = 10,
  color = "from-primary to-accent"
}: SkillRatingProps) => {
  const percentage = (rating / maxRating) * 100;
  
  return (
    <div className="skill-rating">
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="font-medium">{skill}</span>
          <span className="text-primary font-semibold">{rating}/{maxRating}</span>
        </div>
        <div className="progress-container">
          <div 
            className={`h-full bg-gradient-to-r ${color} transition-all duration-500 animate-slide-right`}
            style={{ width: `${percentage}%` } as CSSProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillRating;
