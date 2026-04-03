import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OfferPage from "./pages/OfferPage";
import PortfolioPage from "./pages/PortfolioPage";
import QuoteFormPage from "./pages/QuoteFormPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ponuda" element={<OfferPage />} />
          <Route path="/ponuda/forma" element={<QuoteFormPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-study/medical-elearning" element={<CaseStudyMedical />} />
          <Route path="/case-study/mobile-operator" element={<CaseStudyMobile />} />
          <Route path="/case-study/global-website" element={<CaseStudyWebsite />} />
          <Route path="/case-study/flowsms" element={<CaseStudyFlowSMS />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
