
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Target, Trophy, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import CareerCard from "@/components/CareerCard";

// Sample career data
const featuredCareers = [
  {
    id: "1",
    title: "Startup CEO",
    emoji: "👨‍💼",
    duration: "5 mins",
    difficulty: 4,
    description: "Survive a day as a CEO making tough decisions for your tech startup.",
    category: "Leadership"
  },
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center md:max-w-3xl md:mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Test-drive your future job.
              <span className="block text-transparent bg-clip-text bg-purple-gradient">
                No resume needed.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-slide-in">
              Try before you commit. Experience what it's like to work in different careers
              through interactive challenges and scenarios.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/careers" className="btn-primary flex items-center justify-center gap-2 animate-scale-up">
                <span>Start Exploring</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/challenges" className="btn-secondary flex items-center justify-center gap-2 animate-scale-up">
                Try a Challenge
              </Link>
              <Link to="/careers" className="btn-outline flex items-center justify-center gap-2 animate-scale-up">
                Browse Careers
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-light"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse-light"></div>
      </section>
      
      {/* Features */}
      <section className="section">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How CareerQuest Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've reimagined career exploration to be engaging, insightful, and actually fun.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Rocket className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Stories</h3>
            <p className="text-muted-foreground">
              Experience a day in different careers through engaging choose-your-own-adventure stories.
            </p>
          </div>
          
          <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md text-center animate-fade-in delay-100">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
              <Target className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Skill Challenges</h3>
            <p className="text-muted-foreground">
              Put your abilities to the test with mini-tasks that simulate real job responsibilities.
            </p>
          </div>
          
          <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md text-center animate-fade-in delay-200">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <Trophy className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Insights</h3>
            <p className="text-muted-foreground">
              Get feedback on your strengths and discover careers that match your natural talents.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Careers */}
      <section className="section bg-muted">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trending Career Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test drive these popular career paths through our interactive scenarios
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCareers.map((career) => (
            <CareerCard key={career.id} {...career} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/careers" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
            <span>View all career stories</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section bg-gradient-to-r from-primary/90 to-accent/90 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to discover your career path?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of students who are test-driving careers before making big decisions.
          </p>
          <Link to="/signup" className="bg-white text-primary hover:bg-white/90 btn-primary">
            Create Free Account
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">CareerQuest</span>
            </div>
            <div className="flex gap-8 flex-wrap justify-center">
              <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
              <Link to="/careers" className="text-muted-foreground hover:text-primary">Careers</Link>
              <Link to="/challenges" className="text-muted-foreground hover:text-primary">Challenges</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm border-t border-border pt-8">
            <p>&copy; {new Date().getFullYear()} CareerQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
