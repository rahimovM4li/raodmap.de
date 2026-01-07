import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "./pages/Index";
import StudyPage from "./pages/StudyPage";
import WorkPage from "./pages/WorkPage";
import AusbildungPage from "./pages/AusbildungPage";
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
import AuPairPage from "./pages/AuPairPage";

const queryClient = new QueryClient();

const ScrollManager = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <TooltipProvider>
            <ScrollManager />
            <Toaster />
            <Sonner />
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">
                <Routes>
                  {/* Redirect root to /tj */}
                  <Route path="/" element={<Navigate to="/tj" replace />} />
                  
                  {/* Tajik routes (default) */}
                  <Route path="/tj" element={<Index />} />
                  <Route path="/tj/study" element={<StudyPage />} />
                  <Route path="/tj/work" element={<WorkPage />} />
                  <Route path="/tj/ausbildung" element={<AusbildungPage />} />
                  <Route path="/tj/fsj-bfd" element={<FSJBFDPage />} />
                  <Route path="/tj/au-pair" element={<AuPairPage />} />
                  <Route path="/tj/living" element={<LivingPage />} />
                  <Route path="/tj/roadmap" element={<RoadmapPage />} />
                  <Route path="/tj/faq" element={<FAQPage />} />
                  <Route path="/tj/resources" element={<ResourcesPage />} />
                  <Route path="/tj/cv-generator" element={<CVGeneratorPage />} />
                  <Route path="/tj/privacy" element={<PrivacyPage />} />
                  <Route path="/tj/cookies" element={<CookiesPage />} />
                  <Route path="/tj/imprint" element={<ImprintPage />} />
                  
                  {/* Russian routes */}
                  <Route path="/ru" element={<Index />} />
                  <Route path="/ru/study" element={<StudyPage />} />
                  <Route path="/ru/work" element={<WorkPage />} />
                  <Route path="/ru/ausbildung" element={<AusbildungPage />} />
                  <Route path="/ru/fsj-bfd" element={<FSJBFDPage />} />
                  <Route path="/ru/au-pair" element={<AuPairPage />} />
                  <Route path="/ru/living" element={<LivingPage />} />
                  <Route path="/ru/roadmap" element={<RoadmapPage />} />
                  <Route path="/ru/faq" element={<FAQPage />} />
                  <Route path="/ru/resources" element={<ResourcesPage />} />
                  <Route path="/ru/cv-generator" element={<CVGeneratorPage />} />
                  <Route path="/ru/privacy" element={<PrivacyPage />} />
                  <Route path="/ru/cookies" element={<CookiesPage />} />
                  <Route path="/ru/imprint" element={<ImprintPage />} />
                  
                  {/* German routes */}
                  <Route path="/de" element={<Index />} />
                  <Route path="/de/study" element={<StudyPage />} />
                  <Route path="/de/work" element={<WorkPage />} />
                  <Route path="/de/ausbildung" element={<AusbildungPage />} />
                  <Route path="/de/fsj-bfd" element={<FSJBFDPage />} />
                  <Route path="/de/au-pair" element={<AuPairPage />} />
                  <Route path="/de/living" element={<LivingPage />} />
                  <Route path="/de/roadmap" element={<RoadmapPage />} />
                  <Route path="/de/faq" element={<FAQPage />} />
                  <Route path="/de/resources" element={<ResourcesPage />} />
                  <Route path="/de/cv-generator" element={<CVGeneratorPage />} />
                  <Route path="/de/privacy" element={<PrivacyPage />} />
                  <Route path="/de/cookies" element={<CookiesPage />} />
                  <Route path="/de/imprint" element={<ImprintPage />} />
                  
                  {/* Redirect old paths without language prefix to /tj */}
                  <Route path="/study" element={<Navigate to="/tj/study" replace />} />
                  <Route path="/work" element={<Navigate to="/tj/work" replace />} />
                  <Route path="/ausbildung" element={<Navigate to="/tj/ausbildung" replace />} />
                  <Route path="/fsj-bfd" element={<Navigate to="/tj/fsj-bfd" replace />} />
                  <Route path="/au-pair" element={<Navigate to="/tj/au-pair" replace />} />
                  <Route path="/living" element={<Navigate to="/tj/living" replace />} />
                  <Route path="/roadmap" element={<Navigate to="/tj/roadmap" replace />} />
                  <Route path="/faq" element={<Navigate to="/tj/faq" replace />} />
                  <Route path="/resources" element={<Navigate to="/tj/resources" replace />} />
                  <Route path="/cv-generator" element={<Navigate to="/tj/cv-generator" replace />} />
                  <Route path="/privacy" element={<Navigate to="/tj/privacy" replace />} />
                  <Route path="/cookies" element={<Navigate to="/tj/cookies" replace />} />
                  <Route path="/imprint" element={<Navigate to="/tj/imprint" replace />} />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
              <CookieBanner />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
