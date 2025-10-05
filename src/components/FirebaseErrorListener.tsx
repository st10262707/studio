
'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: any) => {
      console.error(error); // Also log to console for dev visibility
      toast({
        variant: 'destructive',
        title: 'Permission Error',
        description: error.message || 'You do not have permission to perform this action.',
      });
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      // Clean up the listener when the component unmounts
      // It's important to remove the listener to avoid memory leaks
      // but there isn't an `off` method on this event emitter.
    };
  }, [toast]);

  return null;
}
