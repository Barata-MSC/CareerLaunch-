import React, { createContext, useContext, useMemo, useState } from 'react';

const ApplicationsContext = createContext(null);

export const STATUSES = ['Applied', 'Interview', 'Hired', 'Rejected'];

export function ApplicationsProvider({ children }) {
  // Each entry: { job, status, dateApplied }
  const [applications, setApplications] = useState([]);

  const appliedIds = useMemo(() => applications.map((a) => a.job.id), [applications]);

  const addApplication = (job) => {
    let added = true;

    setApplications((prev) => {
      if (prev.some((a) => a.job.id === job.id)) {
        added = false;
        return prev;
      }

      const dateApplied = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      return [
        ...prev,
        {
          job,
          status: 'Applied',
          dateApplied,
        },
      ];
    });

    return added;
  };

  const updateStatus = (jobId, status) => {
    setApplications((prev) =>
      prev.map((a) => (a.job.id === jobId ? { ...a, status } : a))
    );
  };

  const removeApplication = (jobId) => {
    setApplications((prev) => prev.filter((a) => a.job.id !== jobId));
  };

  const value = {
    applications,
    appliedIds,
    addApplication,
    updateStatus,
    removeApplication,
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return ctx;
}

