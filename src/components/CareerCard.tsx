
import { Clock, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CareerCardProps {
  id: string;
  title: string;
  emoji: string;
  duration: string;
  difficulty: number;
  description: string;
  category: string;
}

const CareerCard = ({ id, title, emoji, duration, difficulty, description, category }: CareerCardProps) => {
  // Function to render difficulty stars
  const renderDifficulty = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={14}
          className={`${index < level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

  return (
    <Link to={`/scenario/${id}`} className="block">
      <div className="career-card group h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex gap-3 items-center">
            <div className="text-3xl">{emoji}</div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{title}</h3>
              <div className="flex items-center mt-1 gap-1">
                {renderDifficulty(difficulty)}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 flex-grow">{description}</p>
        
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center">
            <span className="badge badge-primary">{category}</span>
            <ChevronRight size={16} className="text-primary ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CareerCard;
