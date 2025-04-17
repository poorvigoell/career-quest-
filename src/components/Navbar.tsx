import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Rocket, User, Settings } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white dark:bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-purple-gradient">
                CareerQuest
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/careers" className="text-foreground hover:text-primary transition-colors">
              Explore Careers
            </Link>
            <Link to="/challenges" className="text-foreground hover:text-primary transition-colors">
              Skill Challenges
            </Link>
            {/* <Link to="/scenarios" className="text-foreground hover:text-primary transition-colors">
              Scenarios
            </Link> */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                userProfileMode="navigation" 
                userProfileUrl="/profile"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-9 w-9 border-2 border-primary/20"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted transition duration-150"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-card shadow-lg">
            <Link
              to="/careers"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Careers
            </Link>
            <Link
              to="/challenges"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Skill Challenges
            </Link>
            <Link
              to="/scenarios"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Scenarios
            </Link>
            <SignedIn>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
