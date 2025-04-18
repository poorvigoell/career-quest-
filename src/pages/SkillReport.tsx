import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Share2, Award, Star, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import SkillRating from "@/components/SkillRating";
import Badge from "@/components/Badge";
import { evaluateCodeWithGemini } from "../gemini";

// Sample report data
const reportData = {
  "1": {
    title: "Startup CEO",
    emoji: "👨‍💼",
    category: "Leadership",
    completedDate: new Date().toISOString(),
    summary: "You demonstrated strong strategic thinking and leadership skills, but could improve in financial management and crisis communication.",
    skills: [
      { name: "Strategic Thinking", rating: 8 },
      { name: "Decision Making", rating: 7 },
      { name: "Communication", rating: 6 },
      { name: "Financial Acumen", rating: 5 },
      { name: "Leadership", rating: 8 }
    ],
    strengths: [
      "Balancing short-term and long-term priorities",
      "Being transparent with stakeholders",
      "Staying calm under pressure"
    ],
    areas_to_improve: [
      "Financial planning and resource allocation",
      "Delegating tasks to the team",
      "Communicating difficult decisions"
    ],
    badges: [
      { id: 1, name: "Strategic Thinker", variant: "primary" },
      { id: 2, name: "Ethical Leader", variant: "accent" }
    ],
    career_matches: [
      { title: "Startup Founder", match: 85 },
      { title: "Product Manager", match: 78 },
      { title: "Business Development", match: 72 }
    ],
    recommendations: [
      { type: "challenge", id: "3", title: "Financial Planning Challenge" },
      { type: "scenario", id: "4", title: "Crisis Management Scenario" }
    ]
  },
  "2": {
    title: "Frontend development Challenge",
    emoji: "📊",
    category: "Tech",
    completedDate: new Date().toISOString(),
    summary: "You showed excellent pattern recognition and data cleaning abilities. Your insights were clear, but your visualizations could be more effective.",
    skills: [
      { name: "Semantic HTML", rating: 9 },
  { name: "Responsive Design", rating: 8 },
  { name: "Accessibility (a11y)", rating: 7 },
  { name: "CSS Styling & Layout", rating: 6 },
  { name: "UI/UX Understanding", rating: 7 }
    ],
    strengths: [
      "Strong grasp of semantic HTML structure",
      "Well-organized and readable markup",
      "Good understanding of accessibility best practices"
    ],
    areas_to_improve: [
      "Enhancing responsive design techniques",
      "Improving visual layout using CSS Grid/Flexbox",
      "Incorporating better SEO-friendly markup"
    ],
    badges: [
      { id: 1, name: "Markup Master", variant: "primary" },
      { id: 2, name: "Accessibility Advocate", variant: "secondary" }
    ],
    career_matches: [
      { title: "HTML/CSS Developer", match: 90 },
      { title: "Frontend Web Developer", match: 85 },
      { title: "Email Template Designer", match: 78 }
    ],
    recommendations: [
      { type: "challenge", id: "12", title: "Responsive Web Design Challenge" },
      { type: "scenario", id: "14", title: "Accessibility-Focused Landing Page Build" }
    ]
    
  }
};

const SkillReport = () => {
  const { id = "1" } = useParams<{ id: string }>();
  const { state } = useLocation();
  const report = reportData[id as keyof typeof reportData];
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const geminiResponse = await evaluateCodeWithGemini(state?.submission || "");
        let summary;

        // Check if the response is valid JSON or plain text
        if (typeof geminiResponse === "string") {
          summary = geminiResponse; // Plain text response
        } else if (geminiResponse?.Summary) {
          summary = geminiResponse.Summary; // Extract Summary from JSON
        } else {
          summary = "No summary available"; // Fallback
        }

        setSummary(summary); // Update summary with the extracted text
      } catch (error) {
        console.error("Error fetching summary from Gemini:", error);
      }
    };

    if (state?.submission) {
      fetchSummary();
    }
  }, [state?.submission]); // Trigger the effect when submission changes

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="section text-center">
          <h2 className="text-2xl font-bold mb-4">Report not found</h2>
          <Link to="/challenges" className="text-primary hover:underline">
            Return to challenges
          </Link>
        </div>
      </div>
    );
  }
  
  const { 
    title, emoji, category, completedDate, skills, 
    strengths, areas_to_improve, badges, career_matches, recommendations 
  } = report;
  
  // Calculate average rating
  const averageRating = skills.reduce((acc, curr) => acc + curr.rating, 0) / skills.length;
  
  // Format date
  const formattedDate = new Date(completedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link to="/challenges" className="flex items-center text-muted-foreground hover:text-primary gap-1">
              <ArrowLeft size={18} />
              <span>Back to challenges</span>
            </Link>
            <div className="flex gap-3">
              <button className="flex items-center gap-1 text-sm bg-white dark:bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-muted">
                <Download size={16} />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center gap-1 text-sm bg-white dark:bg-card border border-border rounded-lg px-3 py-1.5 hover:bg-muted">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-card shadow-md rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{emoji}</div>
                <div>
                  <h1 className="text-2xl font-bold">{title} Results</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="primary">{category}</Badge>
                    <span className="text-sm text-muted-foreground">Completed on {formattedDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-primary/10 rounded-full w-16 h-16">
                  <span className="text-primary text-2xl font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">Overall Score</span>
              </div>
            </div>
            
            <div className="mt-5 border-t border-border pt-5">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              {summary ? (
                <p className="text-muted-foreground">{summary}</p>
              ) : (
                <p>Loading summary...</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Report content */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Skills section */}
            <div className="bg-white dark:bg-card shadow-md rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Skill Breakdown</h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <SkillRating 
                    key={skill.name} 
                    skill={skill.name} 
                    rating={skill.rating}
                    color={skill.rating >= 8 ? "from-green-500 to-green-400" : 
                           skill.rating >= 6 ? "from-primary to-accent" : 
                           "from-amber-500 to-amber-400"}
                  />
                ))}
              </div>
            </div>
            
            {/* Strengths and areas to improve */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-card shadow-md rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star size={18} className="text-yellow-500" fill="currentColor" />
                  <span>Your Strengths</span>
                </h2>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-green-500 font-bold">+</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-card shadow-md rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info size={18} className="text-blue-500" />
                  <span>Areas to Improve</span>
                </h2>
                <ul className="space-y-2">
                  {areas_to_improve.map((area, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-amber-500 font-bold">→</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Recommended next steps */}
            <div className="bg-white dark:bg-card shadow-md rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Recommended Next Steps</h2>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <Link 
                    key={index} 
                    to={`/${rec.type === 'challenge' ? 'challenge' : 'scenario'}/${rec.id}`}
                    className="block bg-muted p-4 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{rec.title}</h3>
                      <ArrowRight size={18} className="text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rec.type === 'challenge' ? 'Skill Challenge' : 'Career Scenario'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Badges earned */}
            <div className="bg-white dark:bg-card shadow-md rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award size={18} className="text-primary" />
                <span>Badges Earned</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Award size={24} className="text-primary" />
                    </div>
                    <Badge variant={badge.variant as any}>{badge.name}</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Career matches */}
            <div className="bg-white dark:bg-card shadow-md rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Career Matches</h2>
              <div className="space-y-4">
                {career_matches.map((career, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{career.title}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${career.match}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{career.match}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <Link 
                  to="/careers" 
                  className="flex items-center justify-center gap-1 text-primary hover:underline"
                >
                  <span>Explore more careers</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillReport;
