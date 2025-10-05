
'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: ReactNode;
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

export const FirebaseProvider = ({ children, app, auth, firestore }: FirebaseProviderProps) => {
  const contextValue = useMemo(() => ({
    app,
    auth,
    firestore,
  }), [app, auth, firestore]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
      <FirebaseErrorListener />
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => {
  const { app } = useFirebase();
  if (!app) {
    throw new Error('Firebase App has not been initialized.');
  }
  return app;
};

export const useAuth = () => {
  const { auth } = useFirebase();
  if (!auth) {
    throw new Error('Firebase Auth has not been initialized.');
  }
  return auth;
};

export const useFirestore = () => {
  const { firestore } = useFirebase();
  if (!firestore) {
    throw new Error('Firebase Firestore has not been initialized.');
  }
  return firestore;
};
