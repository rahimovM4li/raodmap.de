import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import StudyPage from "./pages/StudyPage";
import WorkPage from "./pages/WorkPage";
import AusbildungPage from "./pages/AusbildungPage";
import LivingPage from "./pages/LivingPage";
import RoadmapPage from "./pages/RoadmapPage";
import FAQPage from "./pages/FAQPage";
import ResourcesPage from "./pages/ResourcesPage";
import CVGeneratorPage from "./pages/CVGeneratorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/study" element={<StudyPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/ausbildung" element={<AusbildungPage />} />
                  <Route path="/living" element={<LivingPage />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/cv-generator" element={<CVGeneratorPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
