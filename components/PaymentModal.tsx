import React, { useState } from 'react';
import { X, CreditCard, Smartphone, CheckCircle2, Loader2, QrCode } from 'lucide-react';
import { Language, PaymentMethod } from '../types';
import { translations } from '../services/translations';
import QRCode from 'react-qr-code';

interface PaymentModalProps {
  lang: Language;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

const TOP_UP_AMOUNT = 500; // Fixed top up amount for MVP

const PaymentModal: React.FC<PaymentModalProps> = ({ lang, onClose, onSuccess }) => {
  const t = translations[lang];
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock Payment Processing
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Notify parent after delay to show success screen
      setTimeout(() => {
          onSuccess(TOP_UP_AMOUNT);
      }, 1000);
    }, 2000);
  };

  // SBP Mock Data
  const sbpUrl = "https://qr.nspk.ru/AS10003P3RH0L2A9A7A0888888888?type=01&bank=100000000008&sum=50000&cur=RUB&crc=1234";

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-8 text-center space-y-6 shadow-2xl">
          <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{t.success_title}</h3>
            <p className="text-slate-400">{t.success_desc}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">{t.payment_title}</h3>
            <p className="text-sm text-slate-400 mt-1">{t.payment_desc}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-4 gap-4 bg-slate-950/50">
          <button 
            onClick={() => setMethod('card')}
            className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
              method === 'card' 
                ? 'bg-brand-600/10 border-brand-500 text-brand-400' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-sm font-bold">{t.method_card}</span>
          </button>
          <button 
            onClick={() => setMethod('sbp')}
            className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
              method === 'sbp' 
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800'
            }`}
          >
             {/* SBP Logo Simulation */}
            <div className="flex items-center justify-center w-6 h-6">
                <QrCode className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">{t.method_sbp}</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {method === 'card' ? (
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase">{t.card_number}</label>
                 <div className="relative">
                   <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 font-mono" />
                   <CreditCard className="absolute right-4 top-3.5 text-slate-500 w-5 h-5" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">{t.expiry}</label>
                   <input type="text" placeholder="MM/YY" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 font-mono" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">{t.cvc}</label>
                   <input type="password" placeholder="123" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 font-mono" />
                 </div>
               </div>
               <button 
                 onClick={handlePayment}
                 disabled={isProcessing}
                 className="w-full mt-4 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-900/20 flex items-center justify-center transition-all"
               >
                 {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                 {isProcessing ? t.processing : `${t.pay_button} ${TOP_UP_AMOUNT} ₽`}
               </button>
               <div className="flex justify-center space-x-4 mt-4 opacity-50 grayscale">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-6" alt="Visa" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg" className="h-6" alt="Mir" />
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-6">
               <div className="bg-white p-4 rounded-xl border-4 border-emerald-500/20">
                  <QRCode value={sbpUrl} size={180} />
               </div>
               <div>
                 <p className="text-white font-medium mb-1">{t.sbp_instruction}</p>
                 <p className="text-sm text-slate-500">NSPK / SBP Secure Transaction</p>
               </div>
               
               <a 
                 href={sbpUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 flex items-center justify-center md:hidden"
               >
                 {t.sbp_button}
               </a>

               <div className="flex items-center space-x-2 text-emerald-400 text-sm animate-pulse">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 <span>Waiting for payment confirmation...</span>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;