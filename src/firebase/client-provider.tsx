
'use client';

import { ReactNode, useMemo } from 'react';
import { FirebaseProvider, initializeFirebase } from '@/firebase';

export const FirebaseClientProvider = ({ children }: { children: ReactNode }) => {
  const { app, auth, firestore } = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
};
