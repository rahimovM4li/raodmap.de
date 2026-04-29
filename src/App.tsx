import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { BottomNav } from "@/components/BottomNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import StudyPage from "./pages/StudyPage";
import WorkPage from "./pages/WorkPage";
import AusbildungPage from "./pages/AusbildungPage";
import FSJPage from "./pages/FSJPage";
import AuPairPage from "./pages/AuPairPage";
import LivingPage from "./pages/LivingPage";
import RoadmapPage from "./pages/RoadmapPage";
import FAQPage from "./pages/FAQPage";
import ResourcesPage from "./pages/ResourcesPage";
import CVGeneratorPage from "./pages/CVGeneratorPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import ImprintPage from "./pages/ImprintPage";
import NotFound from "./pages/NotFound";
import FSJBFDPage from "./pages/FSJBFDPage";
import AusbildungFindenPage from "./pages/ausbildung-finden/AusbildungFindenPage";

const queryClient = new QueryClient();

function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ScrollRestoration />
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow has-bottom-nav md:!pb-0">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/study" element={<StudyPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/ausbildung" element={<AusbildungPage />} />
                  <Route path="/ausbildung-finden" element={<AusbildungFindenPage />} />
                  <Route path="/fsj" element={<FSJPage />} />
                  <Route path="/aupair" element={<AuPairPage />} />
                  <Route path="/living" element={<LivingPage />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/cv-generator" element={<CVGeneratorPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/imprint" element={<ImprintPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
              <CookieBanner />
              <ScrollToTop />
              <BottomNav />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
