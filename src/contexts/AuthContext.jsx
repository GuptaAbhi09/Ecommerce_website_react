import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utilsHelper/supabaseClient";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Handle different auth events
      switch (event) {
        case "SIGNED_IN":
          toast.success("Welcome back!");
          break;
        case "SIGNED_OUT":
          toast.success("You have been logged out");
          break;
        case "PASSWORD_RECOVERY":
          toast.success("Password reset link sent to your email");
          break;
        case "USER_UPDATED":
          toast.success("Profile updated successfully");
          break;
        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      if (data.user && !data.session) {
        toast.success("Please check your email to confirm your account");
        return { success: true, data };
      }

      return { success: true, data };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success("Password reset link sent to your email");
      return { success: true, data };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Update password function
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success("Password updated successfully");
      return { success: true, data };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success("Profile updated successfully");
      return { success: true, data };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Get user profile
  const getUserProfile = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error getting user profile:", error);
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      return null;
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    getUserProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
