import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, ChevronDown, GraduationCap, Sparkles, Compass, Flame, Sliders } from "lucide-react";
import Navbar from "@/components/Navbar";
import CareerCard, { CareerCardProps } from "@/components/CareerCard";

// Sample career data
const careerData: CareerCardProps[] = [
  {
    id: "2",
    title: "AI Researcher",
    emoji: "🤖",
    duration: "8 mins",
    difficulty: 5,
    description: "Explore cutting-edge AI problems and make research decisions.",
    category: "Tech"
  },
  {
    id: "3",
    title: "UX Designer",
    emoji: "🎨",
    duration: "4 mins",
    difficulty: 3,
    description: "Balance client requests with good design principles.",
    category: "Creative"
  },
  {
    id: "4",
    title: "Cybersecurity Analyst",
    emoji: "🔒",
    duration: "7 mins",
    difficulty: 4,
    description: "Protect systems from threats and respond to security incidents.",
    category: "Tech"
  },
  {
    id: "5",
    title: "Data Scientist",
    emoji: "📊",
    duration: "6 mins",
    difficulty: 4,
    description: "Clean messy datasets and extract meaningful insights for business decisions.",
    category: "Tech"
  },
  {
    id: "6",
    title: "Marketing Manager",
    emoji: "📢",
    duration: "5 mins",
    difficulty: 3,
    description: "Plan and execute campaigns to drive customer engagement and sales.",
    category: "Marketing"
  },
  {
    id: "7",
    title: "Product Manager",
    emoji: "🛠️",
    duration: "7 mins",
    difficulty: 4,
    description: "Balance user needs, business goals, and technical constraints in product decisions.",
    category: "Business"
  },
  {
    id: "8",
    title: "Financial Analyst",
    emoji: "💰",
    duration: "6 mins",
    difficulty: 4,
    description: "Analyze financial data and make investment recommendations.",
    category: "Finance"
  },
  {
    id: "9",
    title: "Game Developer",
    emoji: "🎮",
    duration: "8 mins",
    difficulty: 5,
    description: "Design game mechanics and solve technical challenges in game development.",
    category: "Tech"
  },
  {
    id: "10",
    title: "Social Media Manager",
    emoji: "📱",
    duration: "4 mins",
    difficulty: 2,
    description: "Create content strategies and respond to trending topics.",
    category: "Marketing"
  }
];

const categories = ["All", "Tech", "Business", "Creative", "Marketing", "Leadership", "Finance"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const CareerDashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter careers based on search and filters
  const filteredCareers = careerData.filter((career) => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || career.category === selectedCategory;
    
    let matchesDifficulty = true;
    if (selectedDifficulty !== "All") {
      if (selectedDifficulty === "Beginner" && career.difficulty > 2) matchesDifficulty = false;
      if (selectedDifficulty === "Intermediate" && (career.difficulty < 3 || career.difficulty > 3)) matchesDifficulty = false;
      if (selectedDifficulty === "Advanced" && (career.difficulty < 4 || career.difficulty > 4)) matchesDifficulty = false;
      if (selectedDifficulty === "Expert" && career.difficulty < 5) matchesDifficulty = false;
    }
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] rounded-full blur-3xl opacity-[0.15] bg-gradient-to-br from-primary/20 via-violet-700/20 to-accent/20 pointer-events-none -translate-y-1/2 translate-x-1/3 animate-slow-spin"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.1] bg-gradient-to-tr from-blue-700/30 via-emerald-700/30 to-secondary/30 pointer-events-none translate-y-1/3 -translate-x-1/3 animate-slow-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-gradient-to-tr from-primary/5 via-secondary/5 to-accent/5 opacity-30 blur-3xl pointer-events-none"></div>
      
      <Navbar />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-16 md:mb-20 animate-fadeIn">
            <div className="inline-flex items-center mb-4 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <Flame size={18} className="mr-2 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Discover your future career</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent/90 to-secondary">
                  Career Stories
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Explore different professional paths through interactive scenarios and challenges
                </p>
              </div>
              
              <div className="mt-6 md:mt-0 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Trending:</span>
                <div className="flex gap-2">
                  {["Tech", "Creative", "Business"].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => setSelectedCategory(tag)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 ${
                        selectedCategory === tag 
                          ? "bg-primary/20 border-primary/30 text-primary"
                          : "bg-background/80 backdrop-blur-sm border-border/40 text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search and filters */}
{/* Enhanced Search and filters */}
<div className="mb-8 relative animate-slideUp flex justify-center">
  <div className="p-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 max-w-2xl w-full">
    <div className="py-2 px-4 bg-card/80 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg">
      <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-66 pl-9 pr-2 py-1.5 rounded-lg border border-border/60 bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="md:flex items-center gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-28 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/60 mb-2 hover:border-primary/40 transition-all"
          >
            <Sliders size={14} />
            <span className="text-sm">Filters</span>
          </button>
          
          <div className={`flex flex-wrap gap-2 justify-center ${showFilters ? 'block' : 'hidden md:flex'}`}>
            <div className="relative">
              <select
                className="appearance-none w-28 pl-2 pr-7 py-1.5 rounded-lg border border-border/60 bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all text-xs"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary/10 p-0.5 rounded-full">
                <Compass className="text-primary" size={14} />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none w-28 pl-2 pr-7 py-1.5 rounded-lg border border-border/60 bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all text-xs"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary/10 p-0.5 rounded-full">
                <GraduationCap className="text-primary" size={14} />
              </div>
            </div>
            
            <div className="flex border border-border/60 rounded-lg overflow-hidden shadow-sm bg-background/80 backdrop-blur-sm">
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 flex items-center justify-center w-8 transition-all ${view === "grid" 
                  ? "bg-primary text-primary-foreground shadow-inner" 
                  : "bg-transparent hover:bg-muted text-foreground"}`}
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 flex items-center justify-center w-8 transition-all ${view === "list" 
                  ? "bg-primary text-primary-foreground shadow-inner" 
                  : "bg-transparent hover:bg-muted text-foreground"}`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          
          {/* Enhanced Career cards section */}
          <div className="relative">
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-48 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 blur-3xl -z-10 rounded-full"></div>
            
            {isLoaded && (
              filteredCareers.length > 0 ? (
                <div 
                  className={`grid gap-6 animate-fadeInStaggered ${
                    view === "grid" 
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                      : "grid-cols-1 max-w-4xl mx-auto"
                  }`}
                >
                  {filteredCareers.map((career, index) => (
                    <div key={career.id} className="animate-card" style={{ animationDelay: `${index * 100}ms` }}>
                      <CareerCard {...career} />
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl bg-card/30 backdrop-blur-md border border-white/10 text-center animate-fadeIn"
                >
                  <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6 border border-white/10 shadow-inner">
                    <Search className="text-primary" size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">No careers found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search terms or filters to explore more career options
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDashboard;
