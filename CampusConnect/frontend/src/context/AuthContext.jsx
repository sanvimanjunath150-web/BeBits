import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session if present
  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    getUser();
    // Listen for auth state changes (e.g., sign‑in, sign‑out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    // Try normal password sign‑in first
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      setUser(data.user);
      return { success: true };
    }

    // If the user hasn't confirmed their email, ask Supabase to resend the confirmation link
    if (error.message && error.message.toLowerCase().includes('email not confirmed')) {
      const { error: resendError } = await supabase.auth.resend({ email, type: 'signup' });
      if (resendError) {
        console.error('Resend confirmation error:', resendError);
        return { success: false, message: resendError.message };
      }
      return { success: false, message: 'Email not confirmed. A new confirmation email has been sent.' };
    }

    console.error('Supabase login error:', error);
    return { success: false, message: error.message };
  };

  const register = async (userData) => {
    const { email, password, ...meta } = userData;
    const { data, error } = await supabase.auth.signUp({ email, password, data: meta });
    if (error) {
      console.error('Supabase register error:', error);
      return { success: false, message: error.message };
    }
    // After sign‑up, Supabase may require email confirmation; we still set user if available
    if (data.user) setUser(data.user);
    return { success: true };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Supabase logout error:', error);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
