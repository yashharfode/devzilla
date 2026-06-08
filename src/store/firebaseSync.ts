'use client';
import { useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAgencyStore } from './useAgencyStore';

// We debounce the save so we don't spam Firestore on every keystroke
export function useFirebaseSync(clientId: string, role: 'front-stage' | 'back-stage') {
  const { currentClient, clients } = useAgencyStore();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHydratedRef = useRef(false);

  useEffect(() => {
    if (!clientId) return;

    const docRef = doc(db, 'leads', clientId);

    // Snapshot listener: Real-time updates from the cloud
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const cloudData = snapshot.data();
        // If we are on the Front-Stage, we want to ingest any discounts the Admin added
        // We'll update the Zustand store directly bypassing our own save listener
        if (role === 'front-stage' && isHydratedRef.current) {
          useAgencyStore.setState((state) => {
            const updatedClient = {
              ...state.currentClient,
              ...cloudData,
              // Merge specific deeply nested objects if needed, but since it's a full replace:
              publicView: {
                ...cloudData.publicView
              },
              privateView: {
                ...cloudData.privateView
              }
            };
            return { currentClient: updatedClient as any };
          });
        }
        
        // Initial hydration
        if (!isHydratedRef.current && role === 'front-stage') {
          useAgencyStore.setState({ currentClient: cloudData as any });
          isHydratedRef.current = true;
        }
      }
    });

    return () => unsubscribe();
  }, [clientId, role]);

  // Sync OUT to Firestore
  useEffect(() => {
    if (!currentClient || currentClient.id !== clientId) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await setDoc(doc(db, 'leads', clientId), currentClient, { merge: true });
      } catch (err) {
        console.error('Error syncing to Firestore:', err);
      }
    }, 1000); // 1s debounce

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [currentClient, clientId]);
}
