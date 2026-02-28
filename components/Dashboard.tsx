import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../services/translations';
import { Download, Upload, Activity, Calendar, ShieldCheck, Smartphone, Apple, Globe, ArrowRight, Wallet, Plus, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InstallModal from './InstallModal';

interface DashboardProps {
  user: User;
  onNavigate?: (page: string) => void;
  lang: Language;
  onExtend: () => void; // This triggers "Top Up"
  onPayWithBalance: () => void; // This triggers "Deduct"
}

const data = [
  { name: 'Mon', usage: 2.4 },
  { name: 'Tue', usage: 1.3 },
  { name: 'Wed', usage: 9.8 },
  { name: 'Thu', usage: 3.9 },
  { name: 'Fri', usage: 4.8 },
  { name: 'Sat', usage: 12.3 },
  { name: 'Sun', usage: 4.3 },
];

const SUBSCRIPTION_COST = 299;

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, lang, onExtend, onPayWithBalance }) => {
  const t = translations[lang];
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInstall, setShowInstall] = useState(false);

  const handleExtendClick = () => {
    if (user.balance >= SUBSCRIPTION_COST) {
        setShowConfirm(true);
    } else {
        onExtend(); // Trigger Top Up Modal
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-brand-900/50 to-slate-900 border border-brand-900/50 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">{t.welcome}, {user.username}</h1>
            <p className="text-brand-200 mb-6">{t.secure_connection}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               {/* Quick Action Button */}
               <button 
                onClick={() => onNavigate && onNavigate('servers')}
                className="px-6 py-3 bg-white text-brand-900 rounded-xl font-bold hover:bg-brand-50 transition-colors flex items-center justify-center sm:justify-start"
               >
                 <Globe className="w-5 h-5 mr-2" />
                 {t.connect_now}
                 <ArrowRight className="w-4 h-4 ml-2" />
               </button>

               <div className="flex items-center space-x-6 sm:pl-4">
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="text-emerald-400 w-5 h-5" />
                    <span className="text-sm font-medium text-emerald-100">{t.protection_active}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Activity className="text-brand-400 w-5 h-5" />
                    <span className="text-sm font-medium text-brand-100">{t.low_latency}</span>
                </div>
               </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        </div>

        {/* Subscription & Balance Card */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 flex flex-col justify-between relative overflow-hidden">
          {showConfirm ? (
              <div className="absolute inset-0 bg-slate-900 z-20 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
                  <h3 className="text-white font-bold mb-2">{t.confirm_payment}</h3>
                  <p className="text-slate-400 text-sm mb-4">{t.confirm_text}</p>
                  <div className="flex space-x-3 w-full">
                      <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm">Cancel</button>
                      <button onClick={() => { setShowConfirm(false); onPayWithBalance(); }} className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-bold text-sm">Confirm</button>
                  </div>
              </div>
          ) : null}

          <div>
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-slate-400 text-sm mb-1">{t.subscription_plan}</div>
                    <div className="text-xl font-bold text-white">{t.premium_year}</div>
                </div>
                <div className="text-right">
                    <div className="text-slate-400 text-sm mb-1">{t.balance}</div>
                    <div className="text-xl font-mono font-bold text-emerald-400">{user.balance.toFixed(2)} ₽</div>
                </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">{t.expires}</span>
              <span className="text-white font-mono">{user.subscriptionExpires}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-brand-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-3">
             <button 
                onClick={handleExtendClick}
                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors border border-slate-600 hover:border-brand-500 hover:text-brand-300"
            >
                {user.balance >= SUBSCRIPTION_COST ? t.pay_with_balance : t.extend_subscription}
            </button>
            <button 
                onClick={onExtend}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-emerald-400 border border-slate-700 hover:border-emerald-500"
                title={t.top_up}
            >
                <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Apps Promo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-between">
           <div className="space-y-2">
             <h3 className="text-lg font-bold text-white flex items-center"><Apple className="w-5 h-5 mr-2" /> {t.ios_app}</h3>
             <p className="text-xs text-slate-400">{t.add_home}</p>
             <button onClick={() => setShowInstall(true)} className="text-sm text-brand-400 hover:text-brand-300 font-medium">{t.install_profile} &rarr;</button>
           </div>
           <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center">
             <Smartphone className="w-6 h-6 text-white" />
           </div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-between">
           <div className="space-y-2">
             <h3 className="text-lg font-bold text-white flex items-center"><Smartphone className="w-5 h-5 mr-2" /> {t.android_app}</h3>
             <p className="text-xs text-slate-400">{t.get_google}</p>
             <button onClick={() => setShowInstall(true)} className="text-sm text-brand-400 hover:text-brand-300 font-medium">{t.download_apk} &rarr;</button>
           </div>
           <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center">
             <Download className="w-6 h-6 text-white" />
           </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
           <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Download className="w-5 h-5" /></div>
             <span className="text-slate-400 text-sm">{t.total_download}</span>
           </div>
           <div className="text-2xl font-bold text-white pl-12">{user.dataUsage} GB</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
           <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Upload className="w-5 h-5" /></div>
             <span className="text-slate-400 text-sm">{t.total_upload}</span>
           </div>
           <div className="text-2xl font-bold text-white pl-12">{(user.dataUsage * 0.15).toFixed(1)} GB</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
           <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><Calendar className="w-5 h-5" /></div>
             <span className="text-slate-400 text-sm">{t.days_active}</span>
           </div>
           <div className="text-2xl font-bold text-white pl-12">142</div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-6">{t.data_usage_7d}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} unit=" GB" />
              <Tooltip 
                contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff'}}
                itemStyle={{color: '#2dd4bf'}}
              />
              <Area type="monotone" dataKey="usage" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {showInstall && <InstallModal onClose={() => setShowInstall(false)} lang={lang} />}
    </div>
  );
};

export default Dashboard;