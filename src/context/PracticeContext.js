import React, { createContext, useContext, useState } from 'react';

const PracticeContext = createContext(null);

// Remembers whether the user has finished at least one AI Interview Coach
// session. Kept in memory only, so it resets when the app is restarted.
export function PracticeProvider({ children }) {
  const [hasPracticed, setHasPracticed] = useState(false);

  const markPracticed = () => setHasPracticed(true);

  return (
    <PracticeContext.Provider value={{ hasPracticed, markPracticed }}>
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice() {
  const ctx = useContext(PracticeContext);
  if (!ctx) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return ctx;
}