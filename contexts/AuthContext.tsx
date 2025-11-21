
import React, { createContext, useContext } from 'react';

interface AuthContextType {
  currentUser: string;
  deleteProfile: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Static user for open-source single-user mode
  const currentUser = 'default';

  const deleteProfile = () => {
    if (window.confirm('Are you sure you want to reset all application data? This action cannot be undone and will clear all your saved resumes and settings.')) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, deleteProfile }}>
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
