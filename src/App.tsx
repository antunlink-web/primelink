import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));
const OfferPage = lazy(() => import("./pages/OfferPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const QuoteFormPage = lazy(() => import("./pages/QuoteFormPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SeoAuditPage = lazy(() => import("./pages/SeoAuditPage"));

const LegacyRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return slug ? <Navigate to={`/${slug}`} replace /> : <NotFound />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ponuda" element={<OfferPage />} />
          <Route path="/ponuda/forma" element={<QuoteFormPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/besplatna-seo-analiza" element={<SeoAuditPage />} />

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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
