import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Tips from "./pages/Tips";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminStrings from "./pages/admin/AdminStrings";
import AdminTips from "./pages/admin/AdminTips";
import AdminFaqs from "./pages/admin/AdminFaqs";
import AdminAbout from "./pages/admin/AdminAbout";
import { SplashScreen } from "@/components/SplashScreen";
import { Onboarding } from "@/components/Onboarding";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SplashScreen />
          <Onboarding />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculator/:id" element={<Calculator />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminStrings />} />
              <Route path="tips" element={<AdminTips />} />
              <Route path="faqs" element={<AdminFaqs />} />
              <Route path="about" element={<AdminAbout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
