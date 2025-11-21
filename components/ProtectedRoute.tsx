
import React from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication requirement removed
  return <>{children}</>;
};

export default ProtectedRoute;
