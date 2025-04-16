
import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="section">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Career Story Dashboard</h1>
            <p className="text-muted-foreground">
              Explore different careers through interactive stories and challenges
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search careers..."
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
              
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 ${view === "grid" ? "bg-primary text-white" : "bg-background hover:bg-muted"}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 ${view === "list" ? "bg-primary text-white" : "bg-background hover:bg-muted"}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Career cards */}
          {filteredCareers.length > 0 ? (
            <div className={`grid ${view === "grid" ? "md:grid-cols-3" : "md:grid-cols-1"} gap-6`}>
              {filteredCareers.map((career) => (
                <CareerCard key={career.id} {...career} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No careers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerDashboard;
