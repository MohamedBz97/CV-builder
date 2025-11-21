
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ResumeBuilder from './components/ResumeBuilder';
import CoverLetterEditor from './components/CoverLetterEditor';
import JobTracker from './components/JobTracker';
import LandingPage from './components/LandingPage';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';

const MainLayout: React.FC = () => {
    const { deleteProfile } = useAuth();
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

    const clearCurrentUserData = () => {
        deleteProfile();
    };

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-800">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/cover-letter" element={<CoverLetterEditor />} />
          <Route path="/job-tracker" element={<JobTracker />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="bg-neutral-900 text-neutral-300 p-6 text-center text-sm">
        <div className="container mx-auto">
          <p className="mb-4">
              Your data is stored locally in your browser. It is not sent to any server. 
              <button onClick={() => setIsPrivacyModalOpen(true)} className="ml-2 text-secondary hover:text-blue-400 underline">Privacy Policy</button>
          </p>
          <button onClick={clearCurrentUserData} className="text-neutral-500 hover:text-accent text-xs transition-colors">Reset Application Data</button>
          <div className="mt-4 text-neutral-500 text-xs">
            © {new Date().getFullYear()} AI Resume Architect. All rights reserved.
          </div>
        </div>
      </footer>
      {isPrivacyModalOpen && <PrivacyPolicyModal onClose={() => setIsPrivacyModalOpen(false)} />}
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
        <HashRouter>
            <MainLayout />
        </HashRouter>
    </AuthProvider>
  );
};

export default App;
