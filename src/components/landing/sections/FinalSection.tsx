
import React from 'react';

interface FinalSectionProps {
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

const FinalSection: React.FC<FinalSectionProps> = ({ sectionsRef }) => {
  return (
    <section 
      ref={(el) => (sectionsRef.current[5] = el)}
      className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out pb-24"
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Comece hoje. Resultados imediatos.
        </h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
            <span className="text-gray-800">Setup em 24h após confirmação do DNS</span>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">↗</div>
            <span className="text-gray-800">+15 pontos percentuais na inbox desde a semana 1</span>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">$</div>
            <span className="text-gray-800">ROI positivo já no primeiro mês</span>
          </div>
        </div>

        <p className="text-center text-gray-600">
          <span className="font-semibold text-gray-900">Pare de perder dinheiro. Comece a ganhar mais.</span>
        </p>
      </div>
    </section>
  );
};

export default FinalSection;
