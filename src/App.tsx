import React, { useState, useEffect } from 'react';
import { MandiProvider } from './context/MandiContext';
import { Header } from './components/Header';
import { MandiTable } from './components/MandiTable';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  // 🤖 AUTO SYSTEM
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const autoUpdate = () => {
      setLastUpdate(new Date().toLocaleString('ur-PK'));
      localStorage.setItem('lastAutoUpdate', new Date().toISOString());
      console.log("🤖 Auto Updated");
    };
    autoUpdate();
    const interval = setInterval(autoUpdate, 60*60*1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Auto Badge */}
      <div className="bg-green-600 text-white text-center text-xs py-1">
        🤖 آٹو سسٹم فعال - آخری اپڈیٹ: {lastUpdate}
      </div>

      <main className="flex-1 p-4">
        <MandiTable />
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <MandiProvider>
      <AppContent />
    </MandiProvider>
  );
}
