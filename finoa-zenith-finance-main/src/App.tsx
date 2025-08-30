import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import BudgetPlanner from "./pages/BudgetPlanner";
import SavingsInvestments from "./pages/SavingsInvestments";
import EmergencyFund from "./pages/EmergencyFund";
import Goals from "./pages/Goals";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HelpCentre from "./pages/HelpCentre";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ExpenseTracker from "./pages/ExpenseTracker";
import Assistant from "./pages/Assistant";
import ProtectedRoute from "./routes/ProtectedRoute";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Index />} />
                <Route path="/budget" element={<BudgetPlanner />} />
                <Route path="/savings" element={<SavingsInvestments />} />
                <Route path="/emergency" element={<EmergencyFund />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/help" element={<HelpCentre />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/expenses" element={<ExpenseTracker />} />
                <Route path="/assistant" element={<Assistant />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
