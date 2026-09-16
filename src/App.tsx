import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Stepper } from './components/layout/Stepper';
import { Footer } from './components/layout/Footer';
import { Stage1Hero } from './components/stages/Stage1Hero';
import { Stage2Profile } from './components/stages/Stage2Profile';
import { Stage3Diagnostic } from './components/stages/Stage3Diagnostic';
import { Stage4Recommendations } from './components/stages/Stage4Recommendations';
import { Stage5Compare } from './components/stages/Stage5Compare';
import { Stage6Roadmap } from './components/stages/Stage6Roadmap';
import { Stage7NextAction } from './components/stages/Stage7NextAction';
import { EssayAdvisorModal } from './components/extra/EssayAdvisorModal';
import { CalendarExportModal } from './components/extra/CalendarExportModal';
import { UniversityDetailModal } from './components/extra/UniversityDetailModal';

const MainContent: React.FC = () => {
  const { currentStage } = useApp();

  return (
    <main className="flex-1 w-full flex flex-col">
      {currentStage === 1 && <Stage1Hero />}
      {currentStage === 2 && <Stage2Profile />}
      {currentStage === 3 && <Stage3Diagnostic />}
      {currentStage === 4 && <Stage4Recommendations />}
      {currentStage === 5 && <Stage5Compare />}
      {currentStage === 6 && <Stage6Roadmap />}
      {currentStage === 7 && <Stage7NextAction />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
        <Navbar />
        <Stepper />
        <MainContent />
        <Footer />

        {/* Global Action Modals */}
        <EssayAdvisorModal />
        <CalendarExportModal />
        <UniversityDetailModal />
      </div>
    </AppProvider>
  );
}

export default App;
