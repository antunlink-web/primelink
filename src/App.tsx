import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyMedical from "./pages/CaseStudyMedical";
import CaseStudyMobile from "./pages/CaseStudyMobile";
import CaseStudyWebsite from "./pages/CaseStudyWebsite";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-study/medical-elearning" element={<CaseStudyMedical />} />
          <Route path="/case-study/mobile-operator" element={<CaseStudyMobile />} />
          <Route path="/case-study/global-website" element={<CaseStudyWebsite />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
