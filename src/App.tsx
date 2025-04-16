import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CareerDashboard from "./pages/CareerDashboard";
import Challenges from "./pages/Challenges";
import Scenario from "./pages/Scenario";
import SkillChallenge from "./pages/SkillChallenge";
import SkillReport from "./pages/SkillReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/careers" element={<CareerDashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/scenario/:id" element={<Scenario />} />
          <Route path="/challenge/:id" element={<SkillChallenge />} />
          <Route path="/skill-report/:id" element={<SkillReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
