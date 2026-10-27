import React, { createContext, useContext, useState, useEffect } from 'react';
import { MandiRate } from '../types/mandi';
import { INITIAL_MANDI_RATES } from '../data/mandiData';

interface MandiContextType {
  rates: MandiRate[];
  last5AmUpdate: string;
  next5AmCountdown: string;
  updateRate: (id: string, updatedFields: Partial<MandiRate>) => void;
  addRate: (newRate: Omit<MandiRate, 'id'>) => void;
  deleteRate: (id: string) => void;
  trigger5AmRefresh: () => void;
  resetDefaultRates: () => void;
}

const MandiContext = createContext<MandiContextType | undefined>(undefined);
const RATES_STORAGE_KEY = 'rozana_mandi_rates_store_v2';
const LAST_UPDATE_KEY = 'rozana_mandi_last_5am_update';

export const MandiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<MandiRate[]>(() => {
    try {
      const saved = localStorage.getItem(RATES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Set default initial rates with 5:00 AM timestamp
    return INITIAL_MANDI_RATES.map((r) => ({
      ...r,
      updatedAt: 'آج صبح 05:00 بجے (Daily 5:00 AM)',
    }));
  });

  const [last5AmUpdate, setLast5AmUpdate] = useState<string>(() => {
    return localStorage.getItem(LAST_UPDATE_KEY) || 'آج صبح 05:00 بجے (Daily 5:00 AM)';
  });

  const [next5AmCountdown, setNext5AmCountdown] = useState<string>('');

  // Calculate live countdown to tomorrow 5:00 AM
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(5, 0, 0, 0);
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      const diffMs = target.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setNext5AmCountdown(`${hours} گھنٹے ${minutes} منٹ ${seconds} سیکنڈ`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync rates to localStorage
  useEffect(() => {
    localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(rates));
  }, [rates]);

  const updateRate = (id: string, updatedFields: Partial<MandiRate>) => {
    setRates((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedFields,
              updatedAt: 'آج صبح 05:00 بجے (Admin Updated)',
            }
          : item
      )
    );
  };

  const addRate = (newRate: Omit<MandiRate, 'id'>) => {
    const rateWithId: MandiRate = {
      ...newRate,
      id: 'rate-custom-' + Date.now(),
      updatedAt: 'آج صبح 05:00 بجے',
    };
    setRates((prev) => [rateWithId, ...prev]);
  };

  const deleteRate = (id: string) => {
    setRates((prev) => prev.filter((r) => r.id !== id));
  };

  // Official List update at 5 AM simulator: updates prices, trends, and arrival volumes
  const trigger5AmRefresh = () => {
    const timeStr = 'آج صبح 05:00 بجے (Daily 5:00 AM Refresh)';
    setLast5AmUpdate(timeStr);
    localStorage.setItem(LAST_UPDATE_KEY, timeStr);

    setRates((prev) =>
      prev.map((r) => {
        // slight realistic market fluctuation (+/- 20 to 100 PKR)
        const delta = Math.floor((Math.random() - 0.45) * 80);
        const newModal = Math.max(50, r.modalPrice + delta);
        const newMin = Math.max(40, newModal - Math.floor(Math.random() * 80 + 30));
        const newMax = newModal + Math.floor(Math.random() * 80 + 30);
        const trend: 'up' | 'down' | 'stable' = delta > 0 ? 'up' : delta < 0 ? 'down' : 'stable';

        return {
          ...r,
          modalPrice: newModal,
          minPrice: newMin,
          maxPrice: newMax,
          change: delta,
          trend,
          updatedAt: 'آج صبح 05:00 بجے',
          arrivalVolume: `${Math.floor(2000 + Math.random() * 8000).toLocaleString()} بوری`,
        };
      })
    );
  };

  const resetDefaultRates = () => {
    const initial = INITIAL_MANDI_RATES.map((r) => ({
      ...r,
      updatedAt: 'آج صبح 05:00 بجے',
    }));
    setRates(initial);
    setLast5AmUpdate('آج صبح 05:00 بجے');
    localStorage.removeItem(RATES_STORAGE_KEY);
  };

  return (
    <MandiContext.Provider
      value={{
        rates,
        last5AmUpdate,
        next5AmCountdown,
        updateRate,
        addRate,
        deleteRate,
        trigger5AmRefresh,
        resetDefaultRates,
      }}
    >
      {children}
    </MandiContext.Provider>
  );
};

export const useMandi = () => {
  const context = useContext(MandiContext);
  if (!context) {
    throw new Error('useMandi must be used within a MandiProvider');
  }
  return context;
};
