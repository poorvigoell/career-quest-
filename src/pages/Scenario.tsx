
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import ChoiceButton from "@/components/ChoiceButton";

// Sample scenario data
const scenarioData = {
  "1": {
    title: "Startup CEO",
    emoji: "👨‍💼",
    steps: [
      {
        id: 1,
        content: "It's 8:00 AM, and you've just arrived at your startup's office. Your company is developing a revolutionary AI tool, but you're facing cash flow issues. As you check your email, you notice three urgent matters that need your attention.",
        choices: [
          { id: "1a", text: "Review the financial reports first to understand your runway" },
          { id: "1b", text: "Check messages from your development team about a critical bug" },
          { id: "1c", text: "Respond to an email from a potential investor" }
        ]
      },
      {
        id: 2,
        content: "You decide to review the financial reports. The situation is worse than you thought - you only have 2 months of runway left. Your CFO has attached several possible strategies to extend your runway.",
        choices: [
          { id: "2a", text: "Cut costs by laying off 20% of the team" },
          { id: "2b", text: "Focus on securing bridge funding immediately" },
          { id: "2c", text: "Pivot to a simpler product that can be monetized faster" }
        ]
      },
      {
        id: 3,
        content: "You decide to focus on securing bridge funding. You spend the morning preparing pitch materials and reaching out to investors. By noon, you've scheduled three meetings for next week, but you still need to address immediate concerns.",
        choices: [
          { id: "3a", text: "Now check on the critical bug reported by your development team" },
          { id: "3b", text: "Call an emergency meeting with your executive team" },
          { id: "3c", text: "Reach out to existing customers for advance payments" }
        ]
      },
      {
        id: 4,
        content: "You check on the critical bug and find out it's affecting data security for all your users. Your CTO estimates it will take 3 days to fix properly, but you have a major demo scheduled tomorrow with a potential client.",
        choices: [
          { id: "4a", text: "Postpone the demo until the bug is fixed properly" },
          { id: "4b", text: "Implement a quick patch for the demo and fix it properly later" },
          { id: "4c", text: "Be transparent with the client about the issue during the demo" }
        ]
      },
      {
        id: 5,
        content: "You decide to be transparent with the client about the issue. It's now 4:00 PM, and despite all these challenges, you need to make one more important decision before the day ends.",
        choices: [
          { id: "5a", text: "Work late with the team to create a detailed action plan for tomorrow" },
          { id: "5b", text: "Take time to personally call key team members to boost morale" },
          { id: "5c", text: "Step back and focus on self-care to avoid burnout" }
        ]
      }
    ]
  }
};

const feedbackMessages = {
  "1a": "Strong start! Financial awareness is critical for a CEO, especially in a startup with limited runway.",
  "1b": "Technical issues are important, but understanding your financial position might be more urgent for company survival.",
  "1c": "Investor relations are crucial, but you need to understand your financial position before engaging further.",
  "2a": "Layoffs might extend runway, but could cripple your ability to execute. This is a tough but sometimes necessary decision.",
  "2b": "Good choice! Securing additional funding can buy you time to solve problems without sacrificing capabilities.",
  "2c": "Strategic pivots can be effective, but require careful planning and might confuse existing customers.",
  "3a": "It's important to balance strategic and operational concerns. Technical issues can quickly become business issues.",
  "3b": "Collaborative problem-solving can yield better solutions, but be careful of creating panic.",
  "3c": "Creative financing through customer relationships shows initiative, but could strain relationships if the product isn't delivering.",
  "4a": "Postponing demonstrates integrity but might cost you an opportunity with a potential client.",
  "4b": "Quick fixes can create technical debt and potentially bigger problems down the road.",
  "4c": "Transparency builds trust! Clients often appreciate honesty about challenges rather than discovering issues later.",
  "5a": "Strategic planning is valuable, but be careful of overworking an already stressed team.",
  "5b": "Leadership is about people. Personal connections during crisis can strengthen team cohesion.",
  "5c": "Self-care is crucial for sustainable leadership. You can't pour from an empty cup."
};

// Component for feedback popup
const FeedbackPopup = ({ choice, onClose }: { choice: string, onClose: () => void }) => {
  const feedback = feedbackMessages[choice as keyof typeof feedbackMessages] || "Consider different factors when making this decision.";
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-white dark:bg-card rounded-xl p-6 max-w-md w-full animate-scale-up shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-primary">
            <MessageSquare size={24} />
            <h3 className="text-lg font-semibold">Feedback</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            &times;
          </button>
        </div>
        <p className="mb-5">{feedback}</p>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-500">
              <ThumbsUp size={16} />
              Helpful
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500">
              <ThumbsDown size={16} />
              Not Helpful
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const Scenario = () => {
  const { id = "1" } = useParams<{ id: string }>();
  const scenario = scenarioData[id as keyof typeof scenarioData];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  
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
  
  const { title, emoji, steps } = scenario;
  const step = steps[currentStep];
  const totalSteps = steps.length;
  
  const handleChoice = (choiceId: string) => {
    setSelectedChoice(choiceId);
    setShowFeedback(true);
  };
  
  const handleContinue = () => {
    setShowFeedback(false);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Redirect to results page
      window.location.href = `/skill-report/${id}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        {/* Header with progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link to="/careers" className="flex items-center text-muted-foreground hover:text-primary gap-1">
              <ArrowLeft size={18} />
              <span>Back to careers</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl">{emoji}</span>
              <h1 className="text-xl font-semibold">{title} Scenario</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ProgressBar value={currentStep + 1} max={totalSteps} />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {currentStep + 1}/{totalSteps}
            </span>
          </div>
        </div>
        
        {/* Scenario content */}
        <div className="scenario-card animate-fade-in">
          <div className="mb-6">
            <p className="text-lg">{step.content}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">What will you do?</h3>
            {step.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
              >
                {choice.text}
              </ChoiceButton>
            ))}
          </div>
          
          {/* Help icon */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              <HelpCircle size={16} />
              <span>Need more context?</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Feedback popup */}
      {showFeedback && (
        <FeedbackPopup choice={selectedChoice} onClose={handleContinue} />
      )}
    </div>
  );
};

export default Scenario;
