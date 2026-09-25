import React, { createContext, useContext, useState } from 'react';

// 1. Establish a blueprint for clean, empty resume records
const INITIAL_RESUME_STATE = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    summary: '',
  },
  education: [],     // Array of objects: { id, school, degree, year }
  skills: [],        // Array of string labels or tag chips
  experience: [],    // Array of objects: { id, company, role, duration, description }
  certificates: [],  // Array of objects: { id, name, issuer, year }
  projects: [],      // Array of objects: { id, title, description, link }
};

// 2. Initialize the global React state portal
const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_STATE);

  /**
   * Safe state updater function.
   * Merges updates cleanly into existing fields or targets specific collections.
   */
  const updateResumeData = (sectionKey, updatedValues) => {
    setResumeData((prevData) => ({
      ...prevData,
      [sectionKey]: updatedValues,
    }));
  };

  /**
   * Reset helper action to wipe data clean.
   */
  const clearResumeData = () => {
    setResumeData(INITIAL_RESUME_STATE);
  };

  return (
    <ResumeContext.Provider 
      value={{ 
        resumeData, 
        setResumeData, 
        updateResumeData, 
        clearResumeData 
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

// 3. Export custom access hook for layout screens
export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be safely wrapped inside a <ResumeProvider> wrapper component.');
  }
  return context;
}