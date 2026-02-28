import React, { useState, useEffect } from 'react';
import { UserRole, Language } from '../types';
import { translations } from '../services/translations';
import { Shield, Server, Users, BarChart3, LogOut, Menu, X, Settings, HelpCircle, FileCode, Smartphone, Download, Globe } from 'lucide-react';
import InstallModal from './InstallModal';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, activePage, onNavigate, onLogout, lang, setLang }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const t = translations[lang];

  // PWA Install Prompt handling
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    // If browser supports native install prompt (Android/Desktop), use it.
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        setDeferredPrompt(null);
      });
    } else {
      // Otherwise (iOS), show instructions modal
      setShowInstallModal(true);
    }
  };

  const NavItem = ({ page, icon: Icon, label }: { page: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 mb-1 text-sm font-medium transition-colors rounded-lg ${
        activePage === page
          ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-brand-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            HitVPN
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem page="dashboard" icon={Shield} label={t.dashboard} />
          <NavItem page="servers" icon={Server} label={t.servers} />
          
          {userRole === UserRole.ADMIN && (
            <>
              <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.admin}
              </div>
              <NavItem page="admin-users" icon={Users} label={t.users} />
              <NavItem page="admin-analytics" icon={BarChart3} label={t.analytics} />
              <NavItem page="architecture" icon={FileCode} label={t.arch_docs} />
            </>
          )}

          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Apps & Support
          </div>
          <button
            onClick={handleInstallClick}
            className="flex items-center w-full px-4 py-3 mb-1 text-sm font-medium transition-colors rounded-lg text-emerald-400 hover:bg-slate-800 hover:text-emerald-300"
          >
            <Smartphone className="w-5 h-5 mr-3" />
            {t.install_app}
          </button>
          <NavItem page="support" icon={HelpCircle} label={t.support} />
          <NavItem page="settings" icon={Settings} label={t.settings} />
        </nav>

        {/* Language Switcher */}
        <div className="px-6 py-2">
            <div className="flex bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => setLang('en')}
                  className={`flex-1 py-1 rounded-md text-xs font-bold transition-all ${lang === 'en' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  🇺🇸 EN
                </button>
                <button 
                  onClick={() => setLang('ru')}
                  className={`flex-1 py-1 rounded-md text-xs font-bold transition-all ${lang === 'ru' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  🇷🇺 RU
                </button>
            </div>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t.sign_out}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
         <div className="flex items-center space-x-2">
           <Shield className="text-brand-500 w-6 h-6" />
           <span className="font-bold text-lg">HitVPN</span>
         </div>
         <div className="flex items-center space-x-2">
            <button 
                onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
                className="p-2 text-slate-300 font-bold"
            >
                {lang === 'en' ? '🇺🇸' : '🇷🇺'}
            </button>
            <button onClick={handleInstallClick} className="p-2 text-emerald-400">
              <Download className="w-5 h-5" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
         </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900 pt-20 px-4 md:hidden">
           <NavItem page="dashboard" icon={Shield} label={t.dashboard} />
           <NavItem page="servers" icon={Server} label={t.servers} />
           {userRole === UserRole.ADMIN && (
             <>
               <NavItem page="admin-users" icon={Users} label={t.users} />
               <NavItem page="admin-analytics" icon={BarChart3} label={t.analytics} />
               <NavItem page="architecture" icon={FileCode} label={t.arch_docs} />
             </>
           )}
           <div className="border-t border-slate-800 my-2 pt-2">
              <button
                onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-emerald-400"
              >
                <Smartphone className="w-5 h-5 mr-3" />
                {t.install_app}
              </button>
           </div>
           <NavItem page="support" icon={HelpCircle} label={t.support} />
           <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 mt-4 text-sm text-red-400 border border-slate-800 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t.sign_out}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {showInstallModal && <InstallModal onClose={() => setShowInstallModal(false)} lang={lang} />}
    </div>
  );
};

export default Layout;