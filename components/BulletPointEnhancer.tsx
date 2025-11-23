import React, { useState } from 'react';
import { WandSparklesIcon, PlusCircleIcon } from './icons';
import { enhanceBulletPoint } from '../services/geminiService';

interface BulletPointEnhancerProps {
  onAdd: (text: string) => void;
}

const BulletPointEnhancer: React.FC<BulletPointEnhancerProps> = ({ onAdd }) => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnhance = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const results = await enhanceBulletPoint(inputText);
    setSuggestions(results);
    setIsLoading(false);
  };

  return (
    <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
      <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
        <WandSparklesIcon className="w-4 h-4 text-blue-600" />
        AI Bullet Point Enhancer
      </h4>
      <p className="text-xs text-blue-700 mb-3">
        Type a simple draft (e.g., "Managed a team") and let AI rewrite it professionally with results and numbers.
      </p>
      
      <div className="flex gap-2 mb-3">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. Increased sales significantly"
          className="flex-grow text-sm p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-blue-300/70"
          onKeyDown={(e) => e.key === 'Enter' && handleEnhance()}
        />
        <button 
          onClick={handleEnhance}
          disabled={isLoading || !inputText.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <WandSparklesIcon className="w-4 h-4" />
          )}
          Enhance
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Suggestions (Click to Add)</p>
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                onAdd(suggestion);
                setSuggestions([]);
                setInputText('');
              }}
              className="w-full text-left text-sm p-3 bg-white border border-blue-100 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-all group flex items-start gap-2 shadow-sm"
            >
              <PlusCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 shrink-0 group-hover:text-blue-700" />
              <span className="text-neutral-700 group-hover:text-neutral-900 leading-snug">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BulletPointEnhancer;