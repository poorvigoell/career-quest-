
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import ChoiceButton from "@/components/ChoiceButton";

// Sample scenario data
const scenarioData = {
  "2": {
    title: "AI Researcher",
    emoji: "🤖",
    steps: [
      {
        id: 1,
        content: "As an AI Researcher at a leading tech company, you're developing a new facial recognition algorithm. Your team needs to decide on the next approach after initial tests showed some bias in the system.",
        choices: [
          { id: "2a", text: "Diversify your training dataset to include more varied faces" },
          { id: "2b", text: "Modify the neural network architecture to reduce bias" },
          { id: "2c", text: "Implement post-processing techniques to correct for detected bias" }
        ]
      },
      {
        id: 2,
        content: "You decide to diversify your training dataset. Your colleague suggests using synthetic data to fill gaps in your dataset diversity. What do you think?",
        choices: [
          { id: "2d", text: "Create synthetic data to augment real data for underrepresented groups" },
          { id: "2e", text: "Partner with diverse organizations to collect more authentic data" },
          { id: "2f", text: "Use transfer learning from a more diverse pre-trained model" }
        ]
      },
      {
        id: 3,
        content: "You decide to use synthetic data to supplement real data. Results improve, but your research director is concerned about the ethics of your facial recognition system. What's your next step?",
        choices: [
          { id: "2g", text: "Develop a robust ethical framework with external oversight" },
          { id: "2h", text: "Add an opt-out mechanism for users who don't want to be recognized" },
          { id: "2i", text: "Limit the application to non-sensitive use cases only" }
        ]
      },
      {
        id: 4,
        content: "You develop an ethical framework with outside experts. Now, you need to present your research at a major AI conference. How will you address the remaining limitations?",
        choices: [
          { id: "2j", text: "Be transparent about all limitations and invite community solutions" },
          { id: "2k", text: "Focus on the strengths but acknowledge areas for improvement" },
          { id: "2l", text: "Compare your results to competing approaches to highlight progress" }
        ]
      },
      {
        id: 5,
        content: "Your transparent presentation was well-received. A tech startup offers to acquire your research for commercial use. What's your recommendation to your company?",
        choices: [
          { id: "2m", text: "License the technology with strict ethical usage requirements" },
          { id: "2n", text: "Decline commercial applications until bias is further reduced" },
          { id: "2o", text: "Partner to develop the technology with ongoing oversight" }
        ]
      }
    ]
  },
  "3": {
    title: "UX Designer",
    emoji: "🎨",
    steps: [
      {
        id: 1,
        content: "You're a UX Designer at a digital agency, starting a new project for a healthcare app. The client wants a feature-rich platform, but you're concerned about usability. What's your first step?",
        choices: [
          { id: "3a", text: "Conduct user research to understand patient and doctor needs" },
          { id: "3b", text: "Create wireframes based on competitor analysis" },
          { id: "3c", text: "Build a prototype with the client's requested features" }
        ]
      },
      {
        id: 2,
        content: "You decide to conduct user research. Your findings suggest simplified navigation is critical, but this conflicts with the client's desire for comprehensive menus. How do you proceed?",
        choices: [
          { id: "3d", text: "Present user data to convince the client to prioritize usability" },
          { id: "3e", text: "Create alternative designs that balance both perspectives" },
          { id: "3f", text: "Implement the client's vision but improve the information architecture" }
        ]
      },
      {
        id: 3,
        content: "You create alternative designs that balance usability and feature access. The client selects your progressive disclosure approach. Now you need to define the color scheme. What's your approach?",
        choices: [
          { id: "3g", text: "Use the client's brand colors despite accessibility concerns" },
          { id: "3h", text: "Modify brand colors to ensure WCAG compliance for accessibility" },
          { id: "3i", text: "Propose a new palette that enhances both branding and accessibility" }
        ]
      },
      {
        id: 4,
        content: "You modify the brand colors for accessibility. Initial user testing is positive about usability but reveals confusion about certain icons. What do you do?",
        choices: [
          { id: "3j", text: "Replace ambiguous icons with more universal symbols" },
          { id: "3k", text: "Add text labels to all icons to clarify meaning" },
          { id: "3l", text: "Create an onboarding tutorial explaining the interface" }
        ]
      },
      {
        id: 5,
        content: "After addressing the icon issues, the final design is ready for handoff to developers. They express concerns about the complexity of animations you've included. How do you respond?",
        choices: [
          { id: "3m", text: "Simplify animations while preserving key interaction cues" },
          { id: "3n", text: "Provide detailed specifications and offer implementation support" },
          { id: "3o", text: "Prioritize which animations are essential vs. nice-to-have" }
        ]
      }
    ]
  },
  "4": {
    title: "Cybersecurity Analyst",
    emoji: "🔒",
    steps: [
      {
        id: 1,
        content: "As a Cybersecurity Analyst at a financial institution, you've detected unusual login attempts to several employee accounts. This could be the beginning of a breach. What's your first action?",
        choices: [
          { id: "4a", text: "Lock the affected accounts and notify the account owners" },
          { id: "4b", text: "Monitor the activity without intervention to track the pattern" },
          { id: "4c", text: "Escalate to the security incident response team immediately" }
        ]
      },
      {
        id: 2,
        content: "You decide to lock the accounts and notify owners. Further investigation reveals the attempts came from an unusual location but used correct credentials. What's your next step?",
        choices: [
          { id: "4d", text: "Implement company-wide password reset as a precaution" },
          { id: "4e", text: "Enable additional authentication factors for all employees" },
          { id: "4f", text: "Analyze recent phishing campaigns targeting your organization" }
        ]
      },
      {
        id: 3,
        content: "You analyze recent phishing campaigns and find evidence of a sophisticated spear-phishing attack targeting executives. How do you protect against future attacks?",
        choices: [
          { id: "4g", text: "Conduct emergency security awareness training for executives" },
          { id: "4h", text: "Implement tighter email filtering and scanning protocols" },
          { id: "4i", text: "Create a comprehensive incident response plan specific to phishing" }
        ]
      },
      {
        id: 4,
        content: "After implementing several security measures, you're asked to present findings to the board. They want to know the financial impact. How do you frame your report?",
        choices: [
          { id: "4j", text: "Emphasize the cost of the breach vs. cost of prevention" },
          { id: "4k", text: "Present industry benchmarks on security breach impacts" },
          { id: "4l", text: "Focus on regulatory compliance risks and potential fines" }
        ]
      },
      {
        id: 5,
        content: "The board approves increased security funding. Now you need to prioritize investments across tools, training, and personnel. Which approach do you take?",
        choices: [
          { id: "4m", text: "Invest primarily in advanced threat detection technology" },
          { id: "4n", text: "Balance spending between technology, training, and staffing" },
          { id: "4o", text: "Focus on building an expanded internal security team" }
        ]
      }
    ]
  }
};

const feedbackMessages = {
  "2a": "Good choice! Diversifying your training data is a fundamental approach to reducing bias in AI systems.",
  "2b": "Architectural changes can help, but without addressing the underlying data issues, bias may persist.",
  "2c": "Post-processing can be effective for known biases, but may miss underlying systemic issues in your model.",
  "2d": "Synthetic data can be valuable, but be careful about introducing new biases through synthetic generation.",
  "2e": "Partnering for authentic data collection is thorough but may take longer than synthetic approaches.",
  "2f": "Transfer learning is efficient, but the original biases may transfer if not carefully managed.",
  "2g": "External oversight helps ensure your ethical framework has diverse perspectives - excellent approach!",
  "2h": "Opt-out mechanisms are important for privacy but don't address the underlying bias issues.",
  "2i": "Limiting use cases is pragmatic but doesn't solve the fundamental technical challenges.",
  "2j": "Transparency builds trust in the research community and can lead to collaborative improvements!",
  "2k": "Balancing strengths and weaknesses is important, but full transparency is valued in research.",
  "2l": "Comparative analysis is valuable but shouldn't come at the expense of transparency about limitations.",
  "2m": "Ethical licensing shows responsibility while allowing innovation to reach users.",
  "2n": "This cautious approach prioritizes ethics but might delay beneficial applications.",
  "2o": "Partnerships with oversight represents a balanced approach to responsible commercialization!",
  
  "3a": "Excellent! Starting with user research ensures you're designing for actual needs rather than assumptions.",
  "3b": "Competitor analysis is useful but shouldn't replace direct user research for understanding needs.",
  "3c": "Building without research risks creating a product that doesn't meet user needs despite having many features.",
  "3d": "Data-driven persuasion is effective, but be prepared with solutions, not just problems.",
  "3e": "Finding a balance that satisfies both user needs and client goals is the ideal approach!",
  "3f": "This approach may lead to a complex product that's organized well but still overwhelming for users.",
  "3g": "Brand consistency is important, but accessibility should be non-negotiable, especially in healthcare.",
  "3h": "Good choice! Modifying brand colors for accessibility shows you respect both branding and users' needs.",
  "3i": "A new palette could be risky if the client is attached to their brand identity.",
  "3j": "Excellent! Universal symbols improve intuitive understanding without requiring learning.",
  "3k": "Labels add clarity but can create visual clutter if overused.",
  "3l": "Tutorials help but requiring users to learn your interface indicates it might not be intuitive enough.",
  "3m": "Good choice! This balances user experience with technical feasibility.",
  "3n": "Supporting implementation shows teamwork, but may not address the core complexity issue.",
  "3o": "Prioritization is practical and focuses resources on what truly matters for the user experience.",
  
  "4a": "Good immediate action! Stopping unauthorized access quickly is critical, though it might disrupt workflow.",
  "4b": "Passive monitoring risks allowing a breach to continue, though it might reveal more about the attack pattern.",
  "4c": "Escalation is appropriate but could be premature without basic information gathering.",
  "4d": "Company-wide resets cause disruption and might be excessive without confirming a widespread breach.",
  "4e": "MFA is a strong security measure that balances protection with usability!",
  "4f": "Excellent analytical approach! Understanding the attack vector is crucial for effective response.",
  "4g": "Targeted training addresses the specific vulnerability effectively!",
  "4h": "Email filtering improvements are important but should be part of a comprehensive approach.",
  "4i": "A response plan is valuable but doesn't address the immediate prevention needs.",
  "4j": "Financial impact analysis speaks the language of the board and makes a compelling case!",
  "4k": "Industry benchmarks provide helpful context but may not reflect your specific situation.",
  "4l": "Regulatory focus is important but may miss broader business impact considerations.",
  "4m": "Technology is important, but not at the expense of the human elements of security.",
  "4n": "Excellent! A balanced approach addresses the full spectrum of security needs.",
  "4o": "Building your team is valuable, but technology and training are also essential components."
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
