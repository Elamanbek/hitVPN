import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ServerList from './components/ServerList';
import AdminPanel from './components/AdminPanel';
import SupportChat from './components/SupportChat';
import ConfigModal from './components/ConfigModal';
import PaymentModal from './components/PaymentModal';
import ArchitectureDocs from './components/ArchitectureDocs';
import { MOCK_SERVERS, MOCK_USER, MOCK_ADMIN, MOCK_USERS_LIST } from './services/mockData';
import { User, UserRole, ServerNode, Language } from './types';
import { Shield, CheckCircle2, Loader2 } from 'lucide-react';

// Telegram Brand Icon
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.39 4.025-1.627 4.476-1.635z" />
  </svg>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedServer, setSelectedServer] = useState<ServerNode | null>(null);
  
  // App Settings
  const [lang, setLang] = useState<Language>('en');
  
  // Telegram Login States
  const [showTelegramLogin, setShowTelegramLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Payment Modal
  const [showPayment, setShowPayment] = useState(false);

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role === UserRole.ADMIN ? MOCK_ADMIN : MOCK_USER);
    setCurrentPage(role === UserRole.ADMIN ? 'admin-analytics' : 'dashboard');
  };

  const handleTelegramAuth = () => {
    setIsRegistering(true);
    // Simulate Bot handshake / Registration delay
    setTimeout(() => {
      setIsRegistering(false);
      setShowTelegramLogin(false);
      handleLogin(UserRole.USER);
    }, 2000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const handleTopUpSuccess = (amount: number) => {
      if (currentUser) {
          setCurrentUser({
              ...currentUser,
              balance: currentUser.balance + amount
          });
      }
      setShowPayment(false);
  };

  const handlePayWithBalance = () => {
      if (currentUser && currentUser.balance >= 299) {
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + 30);
          
          setCurrentUser({
              ...currentUser,
              balance: currentUser.balance - 299,
              subscriptionExpires: nextDate.toISOString().slice(0, 10),
              subscriptionActive: true
          });
      }
  };

  const renderContent = () => {
    if (!currentUser) return null;

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            user={currentUser} 
            onNavigate={setCurrentPage} 
            lang={lang}
            onExtend={() => setShowPayment(true)}
            onPayWithBalance={handlePayWithBalance}
          />
        );
      case 'servers':
        return (
          <ServerList 
            servers={MOCK_SERVERS} 
            onConnect={setSelectedServer} 
            lang={lang} 
          />
        );
      case 'admin-users':
        return currentUser.role === UserRole.ADMIN ? <AdminPanel users={MOCK_USERS_LIST} servers={MOCK_SERVERS} /> : <div>Access Denied</div>;
      case 'admin-analytics':
        return currentUser.role === UserRole.ADMIN ? <AdminPanel users={MOCK_USERS_LIST} servers={MOCK_SERVERS} /> : <div>Access Denied</div>;
      case 'architecture':
        return currentUser.role === UserRole.ADMIN ? <ArchitectureDocs /> : <div>Access Denied</div>;
      case 'support':
        return (
            <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
                <div className="p-4 bg-brand-500/10 rounded-full text-brand-400">
                    <Shield className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-white">Support Center</h2>
                <p className="text-slate-400 max-w-md">
                    Please use the AI Support Chat button in the bottom right corner for instant assistance with configuration or connection issues.
                </p>
            </div>
        );
      default:
        return (
            <Dashboard 
                user={currentUser} 
                onNavigate={setCurrentPage} 
                lang={lang} 
                onExtend={() => setShowPayment(true)} 
                onPayWithBalance={handlePayWithBalance}
            />
        );
    }
  };

  if (!currentUser) {
    // Landing / Login Screen
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-efc02570fbc9?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        
        <div className="z-10 text-center max-w-2xl mx-auto space-y-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-brand-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-500/30">
              <Shield className="text-white w-10 h-10" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Secure Your Digital Life with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-500">HitVPN</span>
          </h1>
          
          <p className="text-lg text-slate-400">
            Next-generation VPN architecture featuring WireGuard, VLESS, and AI-powered optimization. 
            <br />
            <span className="text-slate-300 font-medium">Log in instantly via Telegram. No email required.</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
            {/* Login with Telegram Button */}
            <button 
              onClick={() => setShowTelegramLogin(true)}
              className="px-8 py-4 bg-[#229ED9] hover:bg-[#1c86b8] text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#229ED9]/40 flex items-center justify-center"
            >
              <TelegramIcon className="w-6 h-6 mr-3" />
              Log in with Telegram
            </button>
            
            {/* Admin Demo Button */}
            <button 
              onClick={() => handleLogin(UserRole.ADMIN)}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700 hover:border-slate-600"
            >
              Admin Demo
            </button>
          </div>
          
          <div className="text-xs text-slate-500 font-mono">
            System Status: <span className="text-emerald-500">Operational</span> • Nodes: 142 • Active Users: 12,403
          </div>
        </div>

        {/* Telegram Login Simulation Modal */}
        {showTelegramLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl scale-100 transform transition-all">
              <div className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-[#229ED9] rounded-full flex items-center justify-center mb-2 shadow-lg shadow-blue-200">
                  <TelegramIcon className="w-8 h-8 text-white" />
                </div>
                
                <div>
                   <h3 className="text-xl font-bold text-slate-900">HitVPN Bot</h3>
                   <p className="text-slate-500 text-sm mt-1">wants to access your account</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center space-x-3 text-left">
                   <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-lg">
                     ✈️
                   </div>
                   <div>
                      <div className="font-bold text-slate-900">traveler_john</div>
                      <div className="text-xs text-slate-400">+1 ••• ••• 99</div>
                   </div>
                   <div className="ml-auto text-emerald-500">
                     <CheckCircle2 className="w-5 h-5" />
                   </div>
                </div>

                <button 
                  onClick={handleTelegramAuth}
                  disabled={isRegistering}
                  className="w-full py-3 bg-[#229ED9] hover:bg-[#1c86b8] text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center"
                >
                  {isRegistering ? (
                     <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Authenticating...</>
                  ) : (
                     'Accept and Continue'
                  )}
                </button>
                
                <button 
                  onClick={() => setShowTelegramLogin(false)}
                  className="text-slate-400 text-sm hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>
              <div className="bg-slate-50 px-6 py-3 text-xs text-center text-slate-400 border-t border-slate-100">
                By logging in, you agree to our Terms of Service.
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Layout 
      userRole={currentUser.role} 
      activePage={currentPage} 
      onNavigate={setCurrentPage} 
      onLogout={handleLogout}
      lang={lang}
      setLang={setLang}
    >
      {renderContent()}
      <SupportChat />
      
      {/* Modals */}
      {selectedServer && (
        <ConfigModal server={selectedServer} onClose={() => setSelectedServer(null)} lang={lang} />
      )}
      {showPayment && (
        <PaymentModal 
            lang={lang} 
            onClose={() => setShowPayment(false)} 
            onSuccess={handleTopUpSuccess}
        />
      )}
    </Layout>
  );
};

export default App;