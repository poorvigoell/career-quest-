import { Clock, Star, ChevronRight, TrendingUp } from 'lucide-react';
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
          size={16}
          className={`${
            index < level 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          } transition-all`}
        />
      ));
  };

  // Get category color based on type
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Tech': 'from-blue-500 to-indigo-600',
      'Business': 'from-emerald-500 to-teal-600',
      'Creative': 'from-rose-500 to-pink-600',
      'Marketing': 'from-amber-500 to-orange-600',
      'Leadership': 'from-purple-500 to-violet-600',
      'Finance': 'from-green-500 to-emerald-600',
    };
    return colors[cat] || 'from-violet-500 to-indigo-600';
  };

  // Get category gradient for card
  const getCardGradient = (cat: string) => {
    const gradients: Record<string, string> = {
      'Tech': 'from-blue-500/5 to-indigo-600/5',
      'Business': 'from-emerald-500/5 to-teal-600/5',
      'Creative': 'from-rose-500/5 to-pink-600/5',
      'Marketing': 'from-amber-500/5 to-orange-600/5',
      'Leadership': 'from-purple-500/5 to-violet-600/5',
      'Finance': 'from-green-500/5 to-emerald-600/5',
    };
    return gradients[cat] || 'from-violet-500/5 to-indigo-600/5';
  };

  return (
    <div className="transform transition-all duration-500 hover:-translate-y-2 group">
      <Link to={`/scenario/${id}`} className="block h-full">
        <div className={`career-card relative h-full flex flex-col p-6 rounded-2xl overflow-hidden bg-gradient-to-br ${getCardGradient(category)} backdrop-blur-xl shadow-xl border border-white/20 dark:border-white/10 hover:border-primary/50 transition-all duration-300`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-primary/40 to-accent/40 pointer-events-none group-hover:opacity-30 transition-opacity duration-500 ease-in-out"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-secondary/30 to-primary/30 pointer-events-none group-hover:opacity-20 transition-opacity duration-500 ease-in-out"></div>
          
          {/* Content */}
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4 items-center">
                <div className="text-4xl bg-gradient-to-br from-background/80 to-muted/80 backdrop-blur-md p-4 rounded-2xl shadow-inner border border-white/20 dark:border-white/5">
                  {emoji}
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">{title}</h3>
                  <div className="flex items-center mt-2 gap-1">
                    {renderDifficulty(difficulty)}
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/10 dark:bg-primary/20 backdrop-blur-md p-2 rounded-full transform rotate-45 group-hover:rotate-0 transition-all duration-300">
                <TrendingUp size={16} className="text-primary transform -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6 flex-grow">{description}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Clock size={16} className="text-primary/70" />
                <span>{duration}</span>
              </div>
              
              <div className="flex items-center">
                <span className={`badge text-xs font-semibold px-3 py-1.5 rounded-full text-white bg-gradient-to-r ${getCategoryColor(category)}`}>
                  {category}
                </span>
                <div className="ml-2 bg-primary/10 dark:bg-primary/20 p-1.5 rounded-full transform transition-all duration-300 group-hover:translate-x-1">
                  <ChevronRight size={16} className="text-primary transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
        </div>
      </Link>
    </div>
  );
};

export default CareerCard;
