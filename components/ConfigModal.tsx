import React, { useState, useEffect } from 'react';
import { ServerNode, VpnProtocol, Language } from '../types';
import { translations } from '../services/translations';
import { generateWireGuardKeys, generateUUID, generateShortId } from '../utils/vpnUtils';
import { X, Copy, Download, Check, Shield, Globe, RefreshCw } from 'lucide-react';
import QRCode from 'react-qr-code';

interface ConfigModalProps {
  server: ServerNode | null;
  onClose: () => void;
  lang?: Language;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ server, onClose, lang = 'en' }) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<VpnProtocol>(VpnProtocol.WIREGUARD);
  
  // State for dynamic keys
  const [wgKeys, setWgKeys] = useState({ privateKey: '', publicKey: '' });
  const [vlessId, setVlessId] = useState('');
  const [shortId, setShortId] = useState('');

  // Initialize Protocol and Keys on mount
  useEffect(() => {
    if (server) {
        // Set default protocol
        if (server.protocols.includes(VpnProtocol.WIREGUARD)) {
            setSelectedProtocol(VpnProtocol.WIREGUARD);
        } else if (server.protocols.includes(VpnProtocol.VLESS)) {
            setSelectedProtocol(VpnProtocol.VLESS);
        } else {
            setSelectedProtocol(server.protocols[0]);
        }

        // Generate dynamic credentials
        setWgKeys(generateWireGuardKeys());
        setVlessId(generateUUID());
        setShortId(generateShortId());
    }
  }, [server]);

  const regenerateKeys = () => {
    setWgKeys(generateWireGuardKeys());
    setVlessId(generateUUID());
    setShortId(generateShortId());
  };

  if (!server) return null;

  const wireguardConfig = `
[Interface]
PrivateKey = ${wgKeys.privateKey}
Address = 10.100.0.2/32
DNS = 1.1.1.1, 8.8.8.8

[Peer]
PublicKey = ${server.name.replace(/\s/g, '')}_SERVER_PUBKEY_MOCK
Endpoint = ${server.ip}:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
  `.trim();

  // Reality settings simulation
  const vlessConfig = `vless://${vlessId}@${server.ip}:443?security=reality&sni=yahoo.com&fp=chrome&pbk=${wgKeys.publicKey}&sid=${shortId}&type=tcp&flow=xtls-rprx-vision#${encodeURIComponent(server.name)}`;

  const currentConfig = selectedProtocol === VpnProtocol.WIREGUARD ? wireguardConfig : vlessConfig;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentConfig], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedProtocol === VpnProtocol.WIREGUARD 
      ? `hitvpn-${server.name.toLowerCase().replace(/\s/g, '-')}-${new Date().toISOString().slice(0,10)}.conf` 
      : `hitvpn-vless-${server.name.toLowerCase().replace(/\s/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center">
                {server.flag} <span className="ml-2">{server.name}</span>
            </h3>
            <p className="text-slate-400 text-sm flex items-center mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                {t.online_ready}
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protocol Selector */}
        <div className="px-6 pt-6 pb-2 flex justify-between items-center gap-4">
            <div className="flex-1 flex space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {server.protocols.map(p => (
                    <button
                        key={p}
                        onClick={() => setSelectedProtocol(p)}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center
                            ${selectedProtocol === p 
                                ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                       {p === VpnProtocol.WIREGUARD ? <Shield className="w-4 h-4 mr-2" /> : <Globe className="w-4 h-4 mr-2" />}
                       {p}
                    </button>
                ))}
            </div>
            <button 
                onClick={regenerateKeys}
                title="Regenerate Keys"
                className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
                <RefreshCw className="w-4 h-4" />
            </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* QR Code Section */}
            <div className="flex flex-col items-center">
               <div className="bg-white p-4 rounded-xl shadow-lg shadow-black/20">
                  <QRCode value={currentConfig} size={200} />
               </div>
               <p className="text-slate-400 mt-4 text-center text-sm">
                 {t.scan_qr} {selectedProtocol === VpnProtocol.WIREGUARD ? 'WireGuard' : 'v2rayNG / Streisand'}
               </p>
               
               {/* Mobile Tip */}
               <div className="mt-4 p-3 bg-brand-900/20 border border-brand-900/50 rounded-lg text-xs text-brand-200 text-center w-full">
                   {t.mobile_tip}
               </div>
            </div>

            {/* Config Text & Actions */}
            <div className="flex flex-col h-full">
              <div className="flex-1 relative group">
                  <div className="absolute inset-0 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 p-4 overflow-auto">
                    <pre className="whitespace-pre-wrap break-all">{currentConfig}</pre>
                  </div>
              </div>
              
              <div className="mt-4 flex flex-col gap-3">
                <button 
                  onClick={handleCopy}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold flex items-center justify-center transition-colors border border-slate-700"
                >
                  {copied ? <Check className="w-4 h-4 mr-2 text-emerald-400" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? t.copied : t.copy_config}
                </button>
                
                <button 
                    onClick={handleDownload}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold flex items-center justify-center transition-colors shadow-lg shadow-brand-900/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.download_file}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;