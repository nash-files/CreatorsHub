
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: 'creator' | 'user') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we'd check for an existing session
    const checkAuth = () => {
      // Simulate loading auth state
      setTimeout(() => {
        const savedUser = localStorage.getItem('creatorshub_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, we'd make an API call to login
      // For demo purposes, we'll simulate successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'Demo User',
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('creatorshub_user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'creator' | 'user') => {
    setIsLoading(true);
    try {
      // In a real app, we'd make an API call to register
      // For demo purposes, we'll simulate successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
        role,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('creatorshub_user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast({
        title: "Success",
        description: "Your account has been created",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('creatorshub_user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
