
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PriceSectionProps {
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  total: number;
  warmupCost: number;
  modalidade: string;
  formatCurrency: (value: number) => string;
  setShowModalidadeModal: (show: boolean) => void;
  onNext: () => void;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  sectionsRef,
  total,
  warmupCost,
  modalidade,
  formatCurrency,
  setShowModalidadeModal,
  onNext
}) => {
  return (
    <section 
      ref={(el) => (sectionsRef.current[2] = el)}
      className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out relative"
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Investimento para recuperar sua receita
        </h2>
        
        <div className="text-center space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Investimento mensal:</p>
            <p className="text-4xl font-bold text-gray-900">{formatCurrency(total)}</p>
            {warmupCost > 0 && (
              <p className="text-sm text-orange-600 mt-2">
                + {formatCurrency(warmupCost)} warm-up (única vez)
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {modalidade === "12m" && "Anual -10% • Warm-up GRÁTIS"}
              {modalidade === "6m" && "Semestral -5% • Warm-up 50% desc."}
              {modalidade === "Flex" && "Modalidade flex"}
            </p>
          </div>

          <button
            onClick={() => setShowModalidadeModal(true)}
            className="text-gray-700 underline hover:text-gray-900 transition-colors"
          >
            Ver outros prazos e economias
          </button>
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

export default PriceSection;
