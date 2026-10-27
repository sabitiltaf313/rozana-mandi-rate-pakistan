import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserStatus } from '../types/mandi';
import { INITIAL_USERS } from '../data/mandiData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  loginError: string | null;
  signupSuccessMessage: string | null;
  isBlockedModalOpen: boolean;
  blockedUserPhone: string | null;
  activeRoute: string;
  navigateTo: (route: string) => void;
  signup: (userData: { name: string; phone: string; city: string; password: string }) => boolean;
  login: (phone: string, password: string) => boolean;
  logout: () => void;
  upgradeToVip: (userId: string, durationMonths?: number) => void;
  unblockUser: (phone: string) => void;
  simulateMultiDeviceLogin: (phone: string) => void;
  closeBlockedScreen: () => void;
  clearSignupMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'rozana_mandi_users_v2';
const CURRENT_USER_KEY = 'rozana_mandi_current_user_v2';
const DEVICE_ID_KEY = 'rozana_mandi_device_id';

// Generate or retrieve current device ID
function getOrCreateDeviceId(): string {
  let devId = localStorage.getItem(DEVICE_ID_KEY);
  if (!devId) {
    devId = 'DEV-PK-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem(DEVICE_ID_KEY, devId);
  }
  return devId;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return null;
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState<string | null>(null);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState<boolean>(false);
  const [blockedUserPhone, setBlockedUserPhone] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<string>(() => {
    // Determine route from window hash or default to home/dashboard
    const hash = window.location.hash.replace('#', '');
    if (hash === 'signup' || hash === 'login' || hash === 'dashboard') {
      return '/' + hash;
    }
    return '/';
  });

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'signup' || hash === 'login' || hash === 'dashboard') {
        setActiveRoute('/' + hash);
      } else if (!hash) {
        setActiveRoute('/');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    setActiveRoute(route);
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    window.location.hash = cleanRoute;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const signup = (userData: { name: string; phone: string; city: string; password: string }): boolean => {
    // Check if phone already registered
    const cleanPhone = userData.phone.trim().replace(/[-\s]/g, '');
    const existing = users.find((u) => u.phone.replace(/[-\s]/g, '') === cleanPhone);

    if (existing) {
      setLoginError('Yeh mobile number pehle se registered hai. Baraye meharbani login karein.');
      return false;
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: userData.name.trim(),
      phone: cleanPhone,
      city: userData.city,
      password: userData.password,
      status: 'FREE', // User demanded: On Signup -> Save user in DB with status = "FREE" (no plan)
      deviceId: null, // device_id = null
      ip: null, // ip = null
      planExpiry: null, // plan_expiry = null
      registeredAt: new Date().toISOString().split('T')[0],
    };

    const updated = [...users, newUser];
    setUsers(updated);
    setSignupSuccessMessage('Account ban gaya, ab login karein');
    setLoginError(null);
    navigateTo('/login');
    return true;
  };

  const login = (phone: string, password: string): boolean => {
    setLoginError(null);
    const cleanPhone = phone.trim().replace(/[-\s]/g, '');
    const user = users.find((u) => u.phone.replace(/[-\s]/g, '') === cleanPhone);

    // Rule a: If user not found -> "Number ghalat hai"
    if (!user) {
      setLoginError('Number ghalat hai');
      return false;
    }

    // Rule b: If password wrong -> "Password ghalat hai"
    if (user.password !== password) {
      setLoginError('Password ghalat hai');
      return false;
    }

    // Rule c: If status = BLOCKED -> Show full screen: "Account Block hai kyunki aapne 2 jagah use kiya. Rabta karein"
    if (user.status === 'BLOCKED') {
      setBlockedUserPhone(user.phone);
      setIsBlockedModalOpen(true);
      return false;
    }

    // Single device check:
    const currentDevice = getOrCreateDeviceId();
    const simulatedIp = '182.185.' + Math.floor(10 + Math.random() * 200) + '.' + Math.floor(10 + Math.random() * 200);

    // Update user device and IP
    const updatedUser: User = {
      ...user,
      deviceId: currentDevice,
      ip: user.ip || simulatedIp,
    };

    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    setLoginError(null);
    navigateTo('/dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('/login');
  };

  const upgradeToVip = (userId: string, durationMonths = 6) => {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + durationMonths);
    const expiryStr = expiry.toISOString().split('T')[0];

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = {
            ...u,
            status: 'VIP' as UserStatus,
            planExpiry: expiryStr,
          };
          if (currentUser?.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
  };

  const unblockUser = (phone: string) => {
    const cleanPhone = phone.trim().replace(/[-\s]/g, '');
    setUsers((prev) =>
      prev.map((u) => {
        if (u.phone.replace(/[-\s]/g, '') === cleanPhone) {
          return {
            ...u,
            status: 'FREE' as UserStatus,
            deviceId: null,
            blockReason: undefined,
          };
        }
        return u;
      })
    );
    if (currentUser?.phone === cleanPhone) {
      setCurrentUser((prev) => (prev ? { ...prev, status: 'FREE', deviceId: null } : null));
    }
    setIsBlockedModalOpen(false);
  };

  const simulateMultiDeviceLogin = (phone: string) => {
    // Mark user as BLOCKED due to multi-device violation
    const cleanPhone = phone.trim().replace(/[-\s]/g, '');
    setUsers((prev) =>
      prev.map((u) => {
        if (u.phone.replace(/[-\s]/g, '') === cleanPhone) {
          return {
            ...u,
            status: 'BLOCKED' as UserStatus,
            blockReason: 'اکاؤنٹ 2 مختلف ڈیوائسز پر لاگ ان کرنے کی وجہ سے بلاک کیا گیا ہے۔',
          };
        }
        return u;
      })
    );

    if (currentUser?.phone === cleanPhone) {
      setCurrentUser((prev) => (prev ? { ...prev, status: 'BLOCKED' } : null));
    }

    setBlockedUserPhone(phone);
    setIsBlockedModalOpen(true);
  };

  const closeBlockedScreen = () => {
    setIsBlockedModalOpen(false);
  };

  const clearSignupMessage = () => {
    setSignupSuccessMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        loginError,
        signupSuccessMessage,
        isBlockedModalOpen,
        blockedUserPhone,
        activeRoute,
        navigateTo,
        signup,
        login,
        logout,
        upgradeToVip,
        unblockUser,
        simulateMultiDeviceLogin,
        closeBlockedScreen,
        clearSignupMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
