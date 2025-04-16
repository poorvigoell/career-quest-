
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Clock, StarIcon, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Badge from "@/components/Badge";

// Sample challenge data
const challengeData = [
  {
    id: "1",
    title: "UX Design Challenge",
    category: "Creative",
    emoji: "🎨",
    description: "Design a mobile app interface for tracking daily water intake",
    timeLimit: 15, // in minutes
    difficulty: 3,
    skillsRequired: ["Visual Design", "User Flow", "Accessibility"]
  },
  {
    id: "2",
    title: "Data Analysis Challenge",
    category: "Tech",
    emoji: "📊",
    description: "Analyze customer purchase data and identify trends",
    timeLimit: 20, // in minutes
    difficulty: 4,
    skillsRequired: ["Data Analysis", "Pattern Recognition", "Insight Communication"]
  },
  {
    id: "3",
    title: "Financial Planning Challenge",
    category: "Finance",
    emoji: "💰",
    description: "Create a budget plan for a startup with limited funding",
    timeLimit: 25, // in minutes
    difficulty: 4,
    skillsRequired: ["Budgeting", "Forecasting", "Resource Allocation"]
  },
  {
    id: "4",
    title: "Marketing Strategy Challenge",
    category: "Marketing",
    emoji: "📢",
    description: "Develop a marketing campaign for a new health product",
    timeLimit: 18, // in minutes
    difficulty: 3,
    skillsRequired: ["Market Research", "Messaging", "Channel Strategy"]
  },
  {
    id: "5",
    title: "Coding Challenge",
    category: "Tech",
    emoji: "💻",
    description: "Build a simple to-do list application with specific features",
    timeLimit: 30, // in minutes
    difficulty: 5,
    skillsRequired: ["Programming", "Problem Solving", "UI Implementation"]
  },
  {
    id: "6",
    title: "Customer Service Challenge",
    category: "Service",
    emoji: "🤝",
    description: "Handle complex customer complaints and resolve issues",
    timeLimit: 12, // in minutes
    difficulty: 2,
    skillsRequired: ["Communication", "Problem Solving", "Empathy"]
  }
];

const categories = ["All", "Tech", "Creative", "Marketing", "Finance", "Service", "Leadership"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const Challenges = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Filter challenges based on search and filters
  const filteredChallenges = challengeData.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || challenge.category === selectedCategory;
    
    let matchesDifficulty = true;
    if (selectedDifficulty !== "All") {
      if (selectedDifficulty === "Beginner" && challenge.difficulty > 2) matchesDifficulty = false;
      if (selectedDifficulty === "Intermediate" && (challenge.difficulty < 3 || challenge.difficulty > 3)) matchesDifficulty = false;
      if (selectedDifficulty === "Advanced" && (challenge.difficulty < 4 || challenge.difficulty > 4)) matchesDifficulty = false;
      if (selectedDifficulty === "Expert" && challenge.difficulty < 5) matchesDifficulty = false;
    }
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Function to render difficulty stars
  const renderDifficulty = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`${index < level ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="section">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Skill Challenges</h1>
            <p className="text-muted-foreground">
              Put your skills to the test with hands-on challenges that simulate real job tasks
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
              </div>
            </div>
          </div>
          
          {/* Challenge cards */}
          {filteredChallenges.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  className="career-card cursor-pointer"
                  onClick={() => navigate(`/challenge/${challenge.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-3 items-center">
                      <div className="text-3xl">{challenge.emoji}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{challenge.title}</h3>
                        <div className="flex items-center mt-1 text-sm">
                          {renderDifficulty(challenge.difficulty)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {challenge.skillsRequired.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>{challenge.timeLimit} mins</span>
                    </div>
                    <Badge variant="primary">{challenge.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No challenges found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
