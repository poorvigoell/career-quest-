import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Info, Send, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";

// Sample challenge data
const handleEditorWillMount = (monaco) => {
  // Define a custom blue theme
  monaco.editor.defineTheme("blueTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#1a2c42", // Deep blue background
      "editor.foreground": "#f8f8f2",
      "editorCursor.foreground": "#f8f8f2",
      "editor.lineHighlightBackground": "#253655",
      "editorLineNumber.foreground": "#5b79a5",
      "editor.selectionBackground": "#3a5278",
    },
  });
};
const challengeData = {
  "1": {
    title: "UX Design Challenge",
    category: "Creative",
    emoji: "🎨",
    description:
      "Design a mobile app interface for tracking daily water intake",
    timeLimit: 15, // in minutes
    skillsRequired: ["Visual Design", "User Flow", "Accessibility"],
    instructions: `For this challenge, you need to design a simple mobile app interface that helps users track their daily water intake. Your submission should include:

1. A homepage that displays current water intake
2. A way to add water consumption
3. A visualization of progress towards daily goals
4. Settings or preferences page

You can use any design tools you're comfortable with. When complete, upload your designs as images or PDF.`,
    submissionType: "upload",
  },
  "2": {
    title: "Data Analysis Challenge",
    category: "Tech",
    emoji: "📊",
    description: "Analyze customer purchase data and identify trends",
    timeLimit: 20, // in minutes
    skillsRequired: [
      "Data Analysis",
      "Pattern Recognition",
      "Insight Communication",
    ],
    instructions: `You've been provided with a dataset of customer purchases over the past year. Your task is to:

1. Clean the data and handle any missing values
2. Identify key purchasing patterns and trends
3. Create at least one visualization of your findings
4. Write a brief summary of insights (max 300 words)

Download the dataset using the link below and submit your analysis as a document or notebook.`,
    submissionType: "text",
  },
};

const SkillChallenge = () => {
  const { id = "1" } = useParams<{ id: string }>();
  const challenge = challengeData[id as keyof typeof challengeData];

  const [timeRemaining, setTimeRemaining] = useState(
    challenge?.timeLimit * 60 || 0
  ); // in seconds
  const [showDetails, setShowDetails] = useState(false);
  const [submission, setSubmission] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="section text-center">
          <h2 className="text-2xl font-bold mb-4">Challenge not found</h2>
          <Link to="/challenges" className="text-primary hover:underline">
            Return to challenges
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    emoji,
    category,
    description,
    timeLimit,
    skillsRequired,
    instructions,
    submissionType,
  } = challenge;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission processing
    setTimeout(() => {
      window.location.href = `/skill-report/${id}`;
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/challenges"
              className="flex items-center text-muted-foreground hover:text-primary gap-1"
            >
              <ArrowLeft size={18} />
              <span>Back to challenges</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl">{emoji}</span>
              <h1 className="text-xl font-semibold">{title}</h1>
              <span className="badge badge-primary">{category}</span>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-white dark:bg-card shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{description}</h2>
              <div className="flex gap-2 mt-1">
                {skillsRequired.map((skill) => (
                  <span key={skill} className="badge badge-secondary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Clock size={18} className="text-primary" />
              <span className="font-mono font-semibold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Challenge details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-card shadow-md rounded-lg p-6">
              <div className="mb-6">
                <button
                  className="flex items-center gap-2 text-primary mb-4"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <Info size={18} />
                  <span>{showDetails ? "Hide" : "Show"} Challenge Details</span>
                </button>

                {showDetails && (
                  <div className="border-l-4 border-primary pl-4 py-2 mb-4 bg-primary/5 rounded-r-lg animate-fade-in">
                    <h3 className="font-semibold mb-2">Instructions:</h3>
                    <div className="whitespace-pre-line text-sm">
                      {instructions}
                    </div>
                  </div>
                )}
              </div>

              {/* Submission area */}
              <div>
                <h3 className="font-semibold mb-3">Your Submission</h3>

                {submissionType === "text" ? (
  <div className="mb-4">
    {/* Container with border and shadow */}
    <div className="rounded-xl overflow-hidden border border-primary/20 shadow-lg">
      {/* Monaco Editor */}
      <Editor
        height="400px"
        defaultLanguage="javascript"
        theme="blueTheme"  // Use our custom blue theme
        value={submission}
        onChange={(value) => setSubmission(value || "")}
        beforeMount={handleEditorWillMount}
        options={{
          fontFamily: 'monospace',
          fontSize: 14,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
        }}
        className="w-full"
      />
    </div>
  </div>
                ) : (
                  <div className="mb-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      {file ? (
                        <div>
                          <p className="mb-2 text-primary font-medium">
                            {file.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            className="mt-3 text-sm text-red-500 hover:underline"
                            onClick={() => setFile(null)}
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="mb-2 text-lg font-medium">
                            Drop your files here or
                          </p>
                          <label className="inline-block px-4 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                            Browse Files
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              accept=".jpg,.jpeg,.png,.pdf,.psd,.ai,.fig"
                            />
                          </label>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Supports: JPG, PNG, PDF, PSD, AI, Figma
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={submissionType === "text" ? !submission : !file}
                    className={`btn-primary flex items-center gap-2 ${
                      (submissionType === "text" ? !submission : !file)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit for Feedback</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Help sidebar */}
          <div>
            <div className="bg-white dark:bg-card shadow-md rounded-lg p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <HelpCircle size={18} className="text-primary" />
                <span>Tips for Success</span>
              </h3>

              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">•</span>
                  <span>Read the instructions carefully before starting.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">•</span>
                  <span>
                    Manage your time well - don't spend too long on any one
                    aspect.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">•</span>
                  <span>
                    Focus on quality over quantity in your submission.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">•</span>
                  <span>
                    Don't worry about perfection - this is about learning!
                  </span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="font-medium mb-2">Need more help?</h4>
                <button className="text-primary hover:underline text-sm">
                  View resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillChallenge;
