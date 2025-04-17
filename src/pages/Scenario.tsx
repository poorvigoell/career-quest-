import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Star, Sparkles, Gauge, Zap, Trophy, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";

// Sample scenario data
const scenarioData = {
  "2": {
    title: "AI Researcher",
    emoji: "🤖",
    content: "As an AI Researcher, you'll explore cutting-edge problems in artificial intelligence, develop new algorithms, and make decisions about research approaches. Select your preferred difficulty level to start this career experience."
  },
  "3": {
    title: "UX Designer",
    emoji: "🎨",
    content: "As a UX Designer, you'll create intuitive user experiences, balance client requests with good design principles, and make decisions that impact product usability. Select your preferred difficulty level to start this career experience."
  },
  "4": {
    title: "Cybersecurity Analyst",
    emoji: "🔒",
    content: "As a Cybersecurity Analyst, you'll protect systems from threats, respond to security incidents, and make decisions that safeguard sensitive information. Select your preferred difficulty level to start this career experience."
  }
};

// Difficulty level cards with enhanced visuals
const difficultyLevels = [
  {
    id: "easy",
    text: "Easy",
    icon: <CheckCircle size={24} />,
    bgGradient: "from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-500/30",
    hoverBorder: "group-hover:border-green-500/60",
    iconClass: "text-green-500 group-hover:text-green-600",
    bgIcon: "bg-green-500/10 group-hover:bg-green-500/20",
    description: "A gentle introduction with more guidance and straightforward challenges."
  },
  {
    id: "intermediate",
    text: "Medium",
    icon: <Trophy size={24} />,
    bgGradient: "from-amber-500/20 to-orange-600/20",
    borderColor: "border-amber-500/30",
    hoverBorder: "group-hover:border-amber-500/60",
    iconClass: "text-amber-500 group-hover:text-amber-600",
    bgIcon: "bg-amber-500/10 group-hover:bg-amber-500/20",
    description: "Balanced challenges that require thoughtful consideration."
  },
  {
    id: "hard",
    text: "Hard",
    icon: <Zap size={24} />,
    bgGradient: "from-purple-500/20 to-violet-600/20",
    borderColor: "border-purple-500/30",
    hoverBorder: "group-hover:border-purple-500/60",
    iconClass: "text-purple-500 group-hover:text-purple-600",
    bgIcon: "bg-purple-500/10 group-hover:bg-purple-500/20",
    description: "Complex scenarios that mirror real-world challenges."
  }
];

// Component for difficulty confirmation popup
const DifficultyPopup = ({ difficulty, onClose, onConfirm }: { difficulty: string, onClose: () => void, onConfirm: () => void }) => {
  const selectedDifficulty = difficultyLevels.find(level => level.id === difficulty);
  
  if (!selectedDifficulty) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-card rounded-xl p-8 max-w-md w-full animate-scale-up shadow-2xl border border-white/20">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-full ${selectedDifficulty.bgIcon}`}>
              <Gauge size={24} className={selectedDifficulty.iconClass} />
            </div>
            <h3 className="text-xl font-bold">Confirm Difficulty</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">
            &times;
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-full ${selectedDifficulty.bgIcon}`}>
              {selectedDifficulty.icon}
            </div>
            <h4 className="font-semibold text-xl">{selectedDifficulty.text}</h4>
          </div>
          <p className="text-muted-foreground">{selectedDifficulty.description}</p>
        </div>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Go Back
          </button>
          <button 
            onClick={onConfirm} 
            className={`px-6 py-2.5 text-white rounded-lg font-medium transition-colors bg-gradient-to-r ${selectedDifficulty.bgGradient.replace('/20', '')} hover:opacity-90`}
          >
            Begin Experience
          </button>
        </div>
      </div>
    </div>
  );
};

const Scenario = () => {
  const { id = "1" } = useParams<{ id: string }>();
  const scenario = scenarioData[id as keyof typeof scenarioData];
  const [showDifficultyPopup, setShowDifficultyPopup] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate(); // Add the navigate hook
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);
  
  if (!scenario) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="section text-center">
          <h2 className="text-2xl font-bold mb-4">Scenario not found</h2>
          <Link to="/careers" className="text-primary hover:underline">
            Return to careers
          </Link>
        </div>
      </div>
    );
  }
  
  const { title, emoji, content } = scenario;
  
  const handleDifficultySelect = (difficultyId: string) => {
    setSelectedDifficulty(difficultyId);
    setShowDifficultyPopup(true);
  };
  
  const handleBeginExperience = () => {
    // In a real implementation, this would navigate to the first step of the scenario
    // with the selected difficulty applied
    navigate(`/challenge/${id}?difficulty=${selectedDifficulty}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.15] bg-gradient-to-br from-primary/30 to-violet-700/30 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.1] bg-gradient-to-tr from-blue-700/40 to-emerald-700/40 pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
      
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16 relative z-10">
        {/* Header */}
        <div className={`transition-all duration-700 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex justify-between items-center mb-6">
            <Link to="/careers" className="flex items-center text-muted-foreground hover:text-primary gap-1 transition-colors">
              <ArrowLeft size={18} />
              <span>Back to careers</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{emoji}</span>
              <h1 className="text-xl font-semibold">{title} Experience</h1>
            </div>
          </div>
        </div>
        
        {/* Scenario content */}
        <div className={`mb-12 transition-all duration-700 delay-100 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block p-1 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full mb-8">
              <div className="w-24 h-24 flex items-center justify-center text-5xl bg-card backdrop-blur-md rounded-full border border-white/10">
                {emoji}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content}</p>
          </div>
        </div>
        
        {/* Difficulty selection cards */}
        <div className={`transition-all duration-700 delay-200 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h3 className="text-xl font-semibold mb-6 text-center">Select your difficulty level:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {difficultyLevels.map((level, index) => (
              <div 
                key={level.id}
                className={`group cursor-pointer transition-all duration-500 delay-${index * 100} ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                onClick={() => handleDifficultySelect(level.id)}
              >
                <div className={`h-full flex flex-col p-6 rounded-xl border ${level.borderColor} ${level.hoverBorder} bg-gradient-to-br ${level.bgGradient} backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                  <div className="mb-4">
                    <div className={`w-14 h-14 rounded-full ${level.bgIcon} flex items-center justify-center mb-4 transition-all duration-300`}>
                      <div className={`${level.iconClass} transition-all duration-300`}>
                        {level.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{level.text}</h4>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/10">
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${level.bgIcon} ${level.iconClass}`}>
                      {level.id === 'easy' ? 'Beginner Friendly' : level.id === 'intermediate' ? 'Some Challenge' : 'Expert Level'}
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${level.bgIcon}`}>
                      <ArrowLeft size={16} className={`${level.iconClass} rotate-180`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Difficulty confirmation popup */}
      {showDifficultyPopup && (
        <DifficultyPopup 
          difficulty={selectedDifficulty} 
          onClose={() => setShowDifficultyPopup(false)} 
          onConfirm={handleBeginExperience}
        />
      )}
    </div>
  );
};

export default Scenario;