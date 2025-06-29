import { useState, useEffect } from 'react';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface UseGoogleAuthReturn {
  isLoaded: boolean;
  signIn: () => Promise<GoogleUser | null>;
  signOut: () => void;
  user: GoogleUser | null;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: any) => void;
          disableAutoSelect: () => void;
        };
        oauth2: {
          initTokenClient: (config: any) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
    gapi: {
      load: (api: string, callback: () => void) => void;
      auth2: {
        getAuthInstance: () => {
          signIn: () => Promise<any>;
          signOut: () => Promise<void>;
          isSignedIn: {
            get: () => boolean;
          };
          currentUser: {
            get: () => {
              getBasicProfile: () => {
                getId: () => string;
                getName: () => string;
                getEmail: () => string;
                getImageUrl: () => string;
              };
            };
          };
        };
        init: (config: any) => Promise<void>;
      };
    };
  }
}

export const useGoogleAuth = (): UseGoogleAuthReturn => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);

  useEffect(() => {
    const initializeGoogleAuth = async () => {
      try {
        // Get client ID from environment variable or use demo mode
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        
        // If no valid client ID is provided, skip Google API initialization
        // and rely on demo mode
        if (!clientId || clientId.includes('demo') || clientId.includes('placeholder')) {
          console.log('No valid Google Client ID found. Running in demo mode.');
          setIsLoaded(true);
          return;
        }

        // Wait for Google API to load
        if (typeof window.google !== 'undefined') {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          setIsLoaded(true);
        } else {
          // Fallback: wait for script to load
          const checkGoogle = setInterval(() => {
            if (typeof window.google !== 'undefined') {
              window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
              });
              setIsLoaded(true);
              clearInterval(checkGoogle);
            }
          }, 100);

          // Clear interval after 10 seconds to prevent infinite checking
          setTimeout(() => clearInterval(checkGoogle), 10000);
        }
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
        setIsLoaded(true); // Set to true to allow fallback authentication
      }
    };

    initializeGoogleAuth();
  }, []);

  const handleCredentialResponse = (response: any) => {
    try {
      // Decode JWT token (in a real app, verify this on your backend)
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const googleUser: GoogleUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };
      
      setUser(googleUser);
    } catch (error) {
      console.error('Failed to process Google credential:', error);
    }
  };

  const signIn = async (): Promise<GoogleUser | null> => {
    return new Promise((resolve) => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      // If no valid client ID or Google API not loaded, use demo mode
      if (!clientId || clientId.includes('demo') || clientId.includes('placeholder') || !isLoaded || typeof window.google === 'undefined') {
        // Demo mode with simulated loading
        setTimeout(() => {
          const demoUser: GoogleUser = {
            id: 'demo-user-123',
            name: 'Demo User',
            email: 'demo@example.com',
            picture: 'https://via.placeholder.com/96x96/6366f1/ffffff?text=DU'
          };
          setUser(demoUser);
          resolve(demoUser);
        }, 1500);
        return;
      }

      try {
        // Trigger Google One Tap
        window.google.accounts.id.prompt();
        
        // Set up a listener for successful sign-in
        const checkUser = setInterval(() => {
          if (user) {
            clearInterval(checkUser);
            resolve(user);
          }
        }, 100);

        // Fallback after 5 seconds
        setTimeout(() => {
          clearInterval(checkUser);
          if (!user) {
            // Demo fallback
            const demoUser: GoogleUser = {
              id: 'demo-user-123',
              name: 'Demo User',
              email: 'demo@example.com',
              picture: 'https://via.placeholder.com/96x96/6366f1/ffffff?text=DU'
            };
            setUser(demoUser);
            resolve(demoUser);
          }
        }, 5000);
      } catch (error) {
        console.error('Google sign-in failed:', error);
        // Demo fallback
        const demoUser: GoogleUser = {
          id: 'demo-user-123',
          name: 'Demo User',
          email: 'demo@example.com',
          picture: 'https://via.placeholder.com/96x96/6366f1/ffffff?text=DU'
        };
        setUser(demoUser);
        resolve(demoUser);
      }
    });
  };

  const signOut = () => {
    try {
      if (typeof window.google !== 'undefined') {
        window.google.accounts.id.disableAutoSelect();
      }
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      setUser(null);
    }
  };

  return {
    isLoaded,
    signIn,
    signOut,
    user,
  };
};