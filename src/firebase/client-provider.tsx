'use client';

import { ReactNode, useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

/**
 * Proveedor de Firebase para el lado del cliente.
 * Se encarga de inicializar Firebase una sola vez y proporcionar
 * las instancias de Auth y Firestore a toda la aplicación.
 */
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  // Inicializamos Firebase solo en el cliente usando useMemo para persistir las instancias
  const { firebaseApp, firestore, auth } = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
      {children}
    </FirebaseProvider>
  );
}
