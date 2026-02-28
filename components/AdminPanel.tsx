import React, { useState } from 'react';
import { User, ServerNode } from '../types';
import { Trash2, Edit2, Plus, RefreshCw, Terminal, TrendingUp, Users, Server, DollarSign, Activity, AlertTriangle, X, Shield, Calendar, CreditCard, Ban, Key } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AdminPanelProps {
  users: User[];
  servers: ServerNode[];
}

const revenueData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 72000 },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ users, servers }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'servers' | 'logs'>('overview');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
        <span className="text-emerald-400 font-bold">{trend}</span>
        <span className="text-slate-500 ml-2">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">System Administration</h2>
        <div className="flex space-x-2 bg-slate-800 p-1 rounded-lg overflow-x-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'users' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab('servers')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'servers' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Servers
          </button>
           <button 
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'logs' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Logs
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Total Revenue" 
              value="72,000 ₽" 
              icon={DollarSign} 
              trend="+12%" 
              color="text-emerald-400 bg-emerald-500" 
            />
            <StatCard 
              title="Active Users" 
              value="12,403" 
              icon={Users} 
              trend="+5.4%" 
              color="text-blue-400 bg-blue-500" 
            />
            <StatCard 
              title="Network Load" 
              value="45%" 
              icon={Activity} 
              trend="-2%" 
              color="text-brand-400 bg-brand-500" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl h-80">
              <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                   <XAxis dataKey="month" stroke="#64748b" axisLine={false} tickLine={false} />
                   <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                   <Tooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff'}} />
                   <Bar dataKey="amount" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* System Health */}
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl h-80 overflow-y-auto">
               <h3 className="text-lg font-bold text-white mb-4">Node Health Status</h3>
               <div className="space-y-4">
                 {servers.map(s => (
                   <div key={s.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                         <div className={`w-2 h-2 rounded-full ${s.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                         <span className="text-white text-sm font-medium">{s.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                         <div className="w-24 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                           <div className={`h-full rounded-full ${s.load > 80 ? 'bg-red-500' : 'bg-brand-500'}`} style={{width: `${s.load}%`}}></div>
                         </div>
                         <span className="text-xs text-slate-400 w-8">{s.load}%</span>
                      </div>
                   </div>
                 ))}
                 <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                       <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                       <span className="text-white text-sm font-medium">Database-Primary</span>
                    </div>
                    <span className="text-xs text-amber-400">Backing up...</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-semibold text-slate-200">User Database</h3>
            <button className="flex items-center space-x-2 text-xs font-bold text-brand-400 hover:text-brand-300">
               <Plus className="w-4 h-4" /> <span>ADD USER</span>
            </button>
          </div>
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900/50 text-slate-200 uppercase font-medium">
              <tr>
                <th className="p-4">Username</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Data Usage</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map((u) => (
                <tr 
                  key={u.id} 
                  onClick={() => setSelectedUser(u)}
                  className="hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <td className="p-4 text-white font-medium">{u.username}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full bg-slate-700 text-xs text-slate-300">{u.role}</span>
                  </td>
                  <td className="p-4">
                    {u.subscriptionActive 
                      ? <span className="text-emerald-400 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span> Active</span>
                      : <span className="text-red-400 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span> Expired</span>
                    }
                  </td>
                  <td className="p-4 font-mono">{u.dataUsage} GB</td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-red-900/50 rounded-lg text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'servers' && (
        <div className="grid grid-cols-1 gap-6">
           <div className="flex justify-end">
              <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Deploy New Node
              </button>
           </div>
           {servers.map(s => (
             <div key={s.id} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${s.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{s.name} ({s.ip})</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{s.country} • {s.protocols.join(', ')}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                   <div className="text-right">
                     <div className="text-xs text-slate-400">Load</div>
                     <div className="text-sm font-mono text-white">{s.load}%</div>
                   </div>
                   <div className="text-right">
                     <div className="text-xs text-slate-400">Uptime</div>
                     <div className="text-sm font-mono text-white">99.9%</div>
                   </div>
                   <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400">
                     <RefreshCw className="w-4 h-4" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
      
      {activeTab === 'logs' && (
        <div className="bg-black/50 p-4 rounded-xl font-mono text-xs text-slate-400 h-96 overflow-y-auto border border-slate-800">
          <p className="mb-1"><span className="text-emerald-500">[INFO]</span> 2023-10-27 10:00:01 - System initialization complete</p>
          <p className="mb-1"><span className="text-emerald-500">[INFO]</span> 2023-10-27 10:00:05 - Connected to PostgreSQL database</p>
          <p className="mb-1"><span className="text-blue-500">[AUTH]</span> 2023-10-27 10:01:22 - User 'traveler_john' authenticated via Telegram Bot</p>
          <p className="mb-1"><span className="text-yellow-500">[WARN]</span> 2023-10-27 10:05:00 - High load detected on node 'Berlin Edge' (78%)</p>
          <p className="mb-1"><span className="text-blue-500">[VPN]</span> 2023-10-27 10:15:12 - Issued WireGuard config for device 'iPhone 13'</p>
          <p className="mb-1"><span className="text-red-500">[ERR]</span> 2023-10-27 10:20:44 - Failed handshake on node 'New York 1' - connection timeout</p>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-xl font-bold text-white">
                            {selectedUser.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{selectedUser.username}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full border border-slate-700">{selectedUser.role}</span>
                                <span className="text-slate-500 text-xs">• ID: {selectedUser.id}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <h4 className="text-sm text-slate-400 mb-3 flex items-center"><Activity className="w-4 h-4 mr-2" /> Traffic Usage</h4>
                            <div className="text-2xl font-mono text-white mb-2">{selectedUser.dataUsage} GB</div>
                            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full" style={{width: '45%'}}></div>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                             <h4 className="text-sm text-slate-400 mb-3 flex items-center"><CreditCard className="w-4 h-4 mr-2" /> Wallet Balance</h4>
                             <div className="flex justify-between items-end">
                                 <div className="text-2xl font-mono text-emerald-400">{selectedUser.balance.toFixed(2)} ₽</div>
                                 <button className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors">Add Funds</button>
                             </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                         <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                             <h4 className="text-sm text-slate-400 mb-3 flex items-center"><Calendar className="w-4 h-4 mr-2" /> Subscription</h4>
                             <div className="space-y-3">
                                 <div className="flex justify-between text-sm">
                                     <span className="text-slate-500">Status</span>
                                     {selectedUser.subscriptionActive 
                                        ? <span className="text-emerald-400 font-bold">Active</span>
                                        : <span className="text-red-400 font-bold">Expired</span>
                                     }
                                 </div>
                                 <div className="flex justify-between text-sm">
                                     <span className="text-slate-500">Expires</span>
                                     <span className="text-white font-mono">{selectedUser.subscriptionExpires || 'N/A'}</span>
                                 </div>
                                 <button className="w-full py-2 bg-brand-600/20 text-brand-400 hover:bg-brand-600/30 rounded-lg text-sm font-bold border border-brand-600/50 mt-2">
                                     Extend +30 Days
                                 </button>
                             </div>
                        </div>

                        <div className="space-y-2">
                            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold flex items-center justify-center border border-slate-700">
                                <Key className="w-4 h-4 mr-2 text-slate-400" /> Reset VPN Config
                            </button>
                            <button className="w-full py-3 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-xl text-sm font-bold flex items-center justify-center border border-red-900/50">
                                <Ban className="w-4 h-4 mr-2" /> Ban User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;