import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OfferPage from "./pages/OfferPage";
import PortfolioPage from "./pages/PortfolioPage";
import QuoteFormPage from "./pages/QuoteFormPage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";

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
          <Route path="/kontakt" element={<ContactPage />} />

          {/* Service pages — flat SEO URLs */}
          <Route path="/izrada-web-stranica" element={<ServicePage fixedSlug="izrada-web-stranica" />} />
          <Route path="/redizajn-web-stranice" element={<ServicePage fixedSlug="redizajn-web-stranice" />} />
          <Route path="/izrada-crm-sustava" element={<ServicePage fixedSlug="izrada-crm-sustava" />} />
          <Route path="/izrada-web-aplikacija" element={<ServicePage fixedSlug="izrada-web-aplikacija" />} />
          <Route path="/stripe-integracije" element={<ServicePage fixedSlug="stripe-integracije" />} />
          <Route path="/saas-razvoj" element={<ServicePage fixedSlug="saas-razvoj" />} />

          {/* Legacy /usluge/ redirects */}
          <Route path="/usluge/:slug" element={<LegacyRedirect />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
