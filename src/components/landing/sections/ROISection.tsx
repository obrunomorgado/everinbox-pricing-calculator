
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ROISectionProps {
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  extraInbox: number;
  cpc: number;
  setCpc: (value: number) => void;
  receitaExtra: number;
  roi: number;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number) => string;
  onNext: () => void;
}

const ROISection: React.FC<ROISectionProps> = ({
  sectionsRef,
  cpc,
  setCpc,
  formatCurrency,
  onNext
}) => {
  // Fixed calculation based on 5M emails
  const baseEmails = 5000000; // 5M emails
  const extraInboxFixed = baseEmails * 0.15; // 750,000 extra emails (15%)
  const receitaExtraFixed = extraInboxFixed * 0.03 * cpc; // Revenue from extra emails

  return (
    <section 
      ref={(el) => (sectionsRef.current[3] = el)}
      className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out relative"
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          O que você está perdendo
        </h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-green-800 font-semibold text-lg mb-2">+750K e-mails extras</p>
            <p className="text-sm text-gray-600">chegando na inbox (+15 p.p.) com 5M emails</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">
              Valor por clique (ajuste conforme seu negócio):
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="text-lg mr-2">$</span>
              <input
                type="number"
                step="0.01"
                value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
                className="flex-1 text-lg font-semibold outline-none"
              />
            </div>
          </div>

          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-3xl font-bold text-red-600 mb-2">{formatCurrency(receitaExtraFixed)}</p>
            <p className="text-lg font-semibold text-red-800">esse é o dinheiro que você não está recebendo</p>
            <p className="text-sm text-gray-600 mt-2">por mês, devido à baixa entregabilidade</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <ChevronRight className="w-5 h-5 rotate-90" />
      </button>
    </section>
  );
};

export default ROISection;
