import { createContext, useContext, useMemo, useState } from 'react';

const LmsContext = createContext(null);
export function LmsProvider({ children }) {
  const [toast, setToast] = useState(null);
  const learnerId = 'prototype-learner';
  const notify = (message, type = 'success') => setToast({ message, type, id: Date.now() });
  const value = useMemo(() => ({ learnerId, toast, notify }), [toast]);
  return <LmsContext.Provider value={value}>{children}</LmsContext.Provider>;
}
export const useLms = () => useContext(LmsContext);
