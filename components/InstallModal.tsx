import React from 'react';
import { X, Smartphone, Globe, Download, CheckCircle2, Apple } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface InstallModalProps {
  onClose: () => void;
  lang: Language;
}

const InstallModal: React.FC<InstallModalProps> = ({ onClose, lang }) => {
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h3 className="text-xl font-bold text-white">{t.install_guide_title}</h3>
          <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
            
            {/* Step 1: Dashboard Installation */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h4 className="text-lg font-bold text-white">{t.install_step_1}</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-xl text-center">
                        <Apple className="w-8 h-8 text-white mx-auto mb-2" />
                        <h5 className="font-bold text-white mb-2">iOS (iPhone/iPad)</h5>
                        <p className="text-sm text-slate-400">{t.install_ios_instr}</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl text-center">
                        <Smartphone className="w-8 h-8 text-white mx-auto mb-2" />
                        <h5 className="font-bold text-white mb-2">Android</h5>
                        <p className="text-sm text-slate-400">{t.install_android_instr}</p>
                    </div>
                </div>
            </div>

            {/* Step 2: Client Installation */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h4 className="text-lg font-bold text-white">{t.install_step_2}</h4>
                </div>
                <p className="text-slate-400 mb-6">{t.install_client_desc}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white hover:bg-slate-200 text-slate-900 rounded-xl font-bold flex items-center justify-center transition-colors">
                        <Download className="w-5 h-5 mr-2" />
                        {t.download_wireguard}
                    </a>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default InstallModal;