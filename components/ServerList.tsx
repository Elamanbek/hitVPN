import React from 'react';
import { ServerNode, Language } from '../types';
import { translations } from '../services/translations';
import { Signal, Lock, MoreHorizontal } from 'lucide-react';

interface ServerListProps {
  servers: ServerNode[];
  onConnect: (server: ServerNode) => void;
  lang?: Language; // Optional to not break existing calls immediately, but we will pass it
}

const ServerList: React.FC<ServerListProps> = ({ servers, onConnect, lang = 'en' }) => {
  const t = translations[lang];

  const getLoadColor = (load: number) => {
    if (load < 50) return 'text-emerald-400';
    if (load < 80) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{t.available_nodes}</h2>
        <div className="text-sm text-slate-400">
          {servers.length} {t.showing_servers}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {servers.map((server) => (
          <div 
            key={server.id} 
            className={`
              relative group p-6 rounded-2xl border transition-all duration-300
              ${server.status === 'online' ? 'bg-slate-800/50 border-slate-700 hover:border-brand-500/50 hover:bg-slate-800' : 'bg-slate-900/50 border-slate-800 opacity-75 grayscale'}
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl" role="img" aria-label={server.country}>{server.flag}</span>
                <div>
                  <h3 className="font-semibold text-white">{server.name}</h3>
                  <div className="text-xs text-slate-400 flex items-center mt-1">
                    <span className={`w-2 h-2 rounded-full mr-2 ${server.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    {server.country}
                  </div>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center">
                  <Signal className="w-4 h-4 mr-2" /> {t.load}
                </span>
                <span className={`font-mono font-medium ${getLoadColor(server.load)}`}>
                  {server.load}%
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {server.protocols.map(p => (
                  <span key={p} className="px-2 py-1 rounded bg-slate-900 text-xs font-medium text-slate-300 border border-slate-700">
                    {p}
                  </span>
                ))}
              </div>

              <button
                disabled={server.status !== 'online'}
                onClick={() => onConnect(server)}
                className={`
                  w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center transition-all
                  ${server.status === 'online' 
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/20' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                `}
              >
                {server.status === 'online' ? (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    {t.get_config}
                  </>
                ) : (
                  t.maintenance
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerList;