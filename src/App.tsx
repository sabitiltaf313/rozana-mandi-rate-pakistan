import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MandiProvider } from './context/MandiContext';
import { Header } from './components/Header';
import { DirectInstallBanner } from './components/DirectInstallBanner';
import { LiveTicker } from './components/LiveTicker';
import { HomeHero } from './components/HomeHero';
import { MandiTable } from './components/MandiTable';
import { MandiCalculator } from './components/MandiCalculator';
import { CityComparison } from './components/CityComparison';
import { Footer } from './components/Footer';
import { BlockedScreen } from './components/BlockedScreen';
import { VipModal } from './components/VipModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

const AppContent: React.FC = () => {
  const { activeRoute, isBlockedModalOpen, blockedUserPhone, closeBlockedScreen } = useAuth();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-600 selection:text-white font-sans">
      {/* Top Header */}
      <Header
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
      />

      {/* Direct App Install Banner */}
      <DirectInstallBanner />

      {/* Live Continuous Ticker */}
      <LiveTicker />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {activeRoute === '/signup' ? (
          <SignupPage />
        ) : activeRoute === '/login' ? (
          <LoginPage />
        ) : activeRoute === '/dashboard' ? (
          <DashboardPage />
        ) : (
          <div className="space-y-12 pb-12">
            <HomeHero
              onOpenVipModal={() => setIsVipModalOpen(true)}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <MandiTable onOpenVipModal={() => setIsVipModalOpen(true)} />
              <MandiCalculator />
              <CityComparison />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
      />

      {/* Full-Screen Blocked Alert Screen */}
      {isBlockedModalOpen && (
        <BlockedScreen
          phone={blockedUserPhone}
          onClose={closeBlockedScreen}
        />
      )}

      {/* VIP Modal */}
      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
      />

      {/* Admin Panel Modal (You Control) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MandiProvider>
        <AppContent />
      </MandiProvider>
    </AuthProvider>
  );
}
