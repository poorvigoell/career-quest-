import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, Award, Star, Target, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - in a real app this would come from an API
const mockChallengesData = [
  { name: "UX Design", attempted: 5, completed: 3, averageScore: 78 },
  { name: "Frontend Dev", attempted: 7, completed: 5, averageScore: 85 },
  { name: "Backend Dev", attempted: 3, completed: 2, averageScore: 68 },
  { name: "Data Analysis", attempted: 4, completed: 4, averageScore: 92 },
  { name: "AI & ML", attempted: 2, completed: 1, averageScore: 75 },
];

const mockSkillsData = [
  { name: "Problem Solving", value: 82 },
  { name: "Creativity", value: 75 },
  { name: "Technical Knowledge", value: 88 },
  { name: "Communication", value: 70 },
  { name: "Time Management", value: 65 },
];

const mockRecentActivity = [
  { id: 1, challenge: "Data Visualization Challenge", score: 92, date: "2025-04-15", badge: "Expert" },
  { id: 2, challenge: "UI Component Library", score: 85, date: "2025-04-10", badge: "Advanced" },
  { id: 3, challenge: "Database Optimization", score: 78, date: "2025-04-03", badge: "Intermediate" },
  { id: 4, challenge: "Mobile App Wireframing", score: 88, date: "2025-03-28", badge: "Advanced" },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const Profile = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real app, you'd fetch the user's challenge data from your backend
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
          </div>
        </div>
      </div>
    );
  }

  const totalAttempted = mockChallengesData.reduce((sum, item) => sum + item.attempted, 0);
  const totalCompleted = mockChallengesData.reduce((sum, item) => sum + item.completed, 0);
  const overallScore = Math.round(
    mockChallengesData.reduce((sum, item) => sum + item.averageScore * item.completed, 0) / totalCompleted
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="relative">
            <img 
              src={user.imageUrl} 
              alt={user.fullName || "User avatar"} 
              className="h-32 w-32 rounded-full object-cover border-4 border-primary/20"
            />
            <div className="absolute -right-2 -bottom-2 bg-primary text-white text-xs rounded-full px-2 py-1 font-medium">
              Level 3
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">{user.fullName}</h1>
            <p className="text-muted-foreground mb-4">Joined April 2025</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="bg-primary/10 rounded-full px-3 py-1 text-sm text-primary font-medium flex items-center gap-1">
                <Award size={16} />
                <span>{totalCompleted} Challenges Completed</span>
              </div>
              <div className="bg-primary/10 rounded-full px-3 py-1 text-sm text-primary font-medium flex items-center gap-1">
                <Star size={16} />
                <span>{overallScore}% Avg. Score</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Analytics content */}
        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Attempted Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalAttempted}</div>
                  <p className="text-sm text-muted-foreground">Across {mockChallengesData.length} categories</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Completed Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalCompleted}</div>
                  <p className="text-sm text-muted-foreground">{Math.round(totalCompleted/totalAttempted * 100)}% completion rate</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{overallScore}%</div>
                  <p className="text-sm text-muted-foreground">Average across all challenges</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Performance</CardTitle>
                  <CardDescription>Performance across different challenge categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockChallengesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attempted" name="Attempted" fill="#8884d8" />
                        <Bar dataKey="completed" name="Completed" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skills Distribution</CardTitle>
                  <CardDescription>Your current skills assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={mockSkillsData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false}
                          outerRadius={80} 
                          fill="#8884d8" 
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          {mockSkillsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest challenge attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between border-b border-border pb-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{activity.challenge}</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock size={14} />
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{activity.score}%</div>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {activity.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="challenges">
            <div className="grid gap-6">
              {mockChallengesData.map((category) => (
                <Card key={category.name}>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>
                      {category.completed} of {category.attempted} challenges completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-primary h-full" 
                          style={{ width: `${(category.completed/category.attempted) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-sm whitespace-nowrap">
                        {Math.round((category.completed/category.attempted) * 100)}%
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <Star size={14} /> Average score: {category.averageScore}%
                      </span>
                      <button className="text-primary text-sm hover:underline">
                        View Details
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Breakdown</CardTitle>
                  <CardDescription>Analysis of your skill development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={mockSkillsData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={true}
                          outerRadius={120} 
                          fill="#8884d8" 
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          {mockSkillsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skill Ratings</CardTitle>
                  <CardDescription>Your proficiency in each skill area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockSkillsData.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span>{skill.value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: `${skill.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recommended Learning</CardTitle>
                <CardDescription>Suggested challenges to improve your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Time Management Masterclass</h4>
                        <p className="text-sm text-muted-foreground">Improve your weakest skill area</p>
                      </div>
                    </div>
                    <span className="text-primary text-sm">Start Challenge</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Advanced Communication Workshop</h4>
                        <p className="text-sm text-muted-foreground">Level up your communication skills</p>
                      </div>
                    </div>
                    <span className="text-primary text-sm">Start Challenge</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;