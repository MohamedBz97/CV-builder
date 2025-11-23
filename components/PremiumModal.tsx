
import React from 'react';
import { StarIcon, CheckBadgeIcon, SparklesIcon, CreditCardIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { upgradeToPremium } = useAuth();

  if (!isOpen) return null;

  const handleUpgrade = () => {
      // Open Buy Me a Coffee link in new tab
      window.open('https://www.buymeacoffee.com', '_blank');
      
      // Simulate successful transaction locally
      upgradeToPremium();
      
      // Show confirmation (optional, could also wait for user to return)
      setTimeout(() => {
        alert("Thanks for your support! Premium features have been unlocked.");
        onClose();
      }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in border border-yellow-400">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/20 to-transparent"></div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 text-neutral-900 rounded-full mb-4 shadow-glow ring-4 ring-white/10">
                <StarIcon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Unlock CV Legend <span className="text-yellow-400">PRO</span></h2>
            <p className="text-neutral-400 text-sm">Invest in your career for the price of a coffee.</p>
        </div>

        {/* Content */}
        <div className="p-8">
            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                    <div className="p-2 bg-yellow-400 text-neutral-900 rounded-lg">
                        <SparklesIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">AI Cover Letter Writer</h3>
                        <p className="text-sm text-neutral-600 mt-1">Generate tailored, persuasive cover letters instantly using advanced AI.</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="p-2 bg-blue-600 text-white rounded-lg">
                        <CheckBadgeIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Premium Templates</h3>
                        <p className="text-sm text-neutral-600 mt-1">Access our exclusive, high-impact designs like Onyx and Pikachu.</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={handleUpgrade}
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-black text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2 group"
            >
                <span>Buy me a Coffee to Unlock ($5)</span>
                <CreditCardIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </button>
            
            <p className="text-center text-xs text-neutral-400 mt-4">
                Secure payment. One-time fee. Lifetime access.
            </p>
            
            <button onClick={onClose} className="w-full mt-4 text-sm text-neutral-500 hover:text-neutral-800 font-medium">
                Maybe later
            </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
