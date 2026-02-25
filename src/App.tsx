import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { Charts } from "./components/Charts";
import { Methodology } from "./components/Methodology";
import { ModelGallery } from "./components/ModelGallery";
import { Footer } from "./components/Footer";
import { ContactWidget } from "./components/ContactWidget";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <div className="relative min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans">
          {/* Background Effects - Minimalist Gen-Z Style */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Soft Aurora Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 dark:bg-blue-500/30 blur-[120px] mix-blend-normal animate-pulse-slow"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-400/20 dark:bg-purple-500/30 blur-[120px] mix-blend-normal animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            
            {/* Minimalist Dot Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_80%,transparent_100%)]"></div>
          </div>

          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <Methodology />
              <BentoGrid />
              <Charts />
              <ModelGallery />
            </main>
            <Footer />
          </div>
          
          <ContactWidget />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
