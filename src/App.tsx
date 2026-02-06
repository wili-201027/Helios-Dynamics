import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CMSProvider } from "@/contexts/CMSContext";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Solution from "./pages/Solution";
import TechnicalSheet from "./pages/TechnicalSheet";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CMSProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/solucio" element={<Solution />} />
                <Route path="/fitxa-tecnica" element={<TechnicalSheet />} />
                <Route path="/impacte" element={<Impact />} />
                <Route path="/contacte" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </HashRouter>
        </TooltipProvider>
      </CMSProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
