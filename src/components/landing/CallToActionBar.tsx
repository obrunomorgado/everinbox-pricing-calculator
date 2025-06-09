
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface CallToActionBarProps {
  total: number;
  warmupCost: number;
  formatCurrency: (value: number) => string;
}

const CallToActionBar: React.FC<CallToActionBarProps> = ({ total, warmupCost, formatCurrency }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-lg">
        <button
          onClick={() => window.open('https://everinbox.com.br/contato', '_blank')}
          className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-5 h-5" />
          Preciso do meu IP dedicado · {formatCurrency(total)}/mês
          {warmupCost === 0 && <span className="text-green-400 ml-2">+ Warm-up GRÁTIS</span>}
        </button>
      </div>
    </div>
  );
};

export default CallToActionBar;
