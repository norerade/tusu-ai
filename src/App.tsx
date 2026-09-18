import React, { lazy, Suspense } from 'react';
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
const EssayAdvisorModal = lazy(() => import('./components/extra/EssayAdvisorModal').then(module => ({ default: module.EssayAdvisorModal })));
const CalendarExportModal = lazy(() => import('./components/extra/CalendarExportModal').then(module => ({ default: module.CalendarExportModal })));
const UniversityDetailModal = lazy(() => import('./components/extra/UniversityDetailModal').then(module => ({ default: module.UniversityDetailModal })));
const AccountHub = lazy(() => import('./components/extra/AccountHub').then(module => ({ default: module.AccountHub })));

const MainContent: React.FC = () => {
  const { currentStage } = useApp();

  return (
    <main className="flex-1 w-full flex flex-col">
      <div key={currentStage} className="anim-fade-in-up">
        {currentStage === 1 && <Stage1Hero />}
        {currentStage === 2 && <Stage2Profile />}
        {currentStage === 3 && <Stage3Diagnostic />}
        {currentStage === 4 && <Stage4Recommendations />}
        {currentStage === 5 && <Stage5Compare />}
        {currentStage === 6 && <Stage6Roadmap />}
        {currentStage === 7 && <Stage7NextAction />}
      </div>
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 selection:bg-zinc-200 selection:text-zinc-950 font-sans bg-dots-subtle">
        <Navbar />
        <Stepper />
        <MainContent />
        <Footer />
        <Suspense fallback={null}>
          <AccountHub />
          <EssayAdvisorModal />
          <CalendarExportModal />
          <UniversityDetailModal />
        </Suspense>
      </div>
    </AppProvider>
  );
}

export default App;

