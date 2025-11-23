
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  currentUser: string;
  isPremium: boolean;
  upgradeToPremium: () => void;
  deleteProfile: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Static user for open-source single-user mode
  const currentUser = 'default';
  
  const [isPremium, setIsPremium] = useState(() => {
    const saved = localStorage.getItem('user_default_isPremium');
    return saved ? JSON.parse(saved) : false;
  });

  const upgradeToPremium = () => {
      setIsPremium(true);
      localStorage.setItem('user_default_isPremium', JSON.stringify(true));
  };

  const deleteProfile = () => {
    if (window.confirm('Are you sure you want to reset all application data? This action cannot be undone and will clear all your saved resumes and settings.')) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isPremium, upgradeToPremium, deleteProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
