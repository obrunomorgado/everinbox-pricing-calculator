
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface RealityShockSectionProps {
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  onNext: () => void;
}

const RealityShockSection: React.FC<RealityShockSectionProps> = ({ sectionsRef, onNext }) => {
  return (
    <section 
      ref={(el) => (sectionsRef.current[0] = el)}
      className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out relative"
    >
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
          Seus e-mails estão <span className="text-red-600">morrendo antes de chegar</span> na caixa de entrada.
        </h1>
        <p className="text-xl text-gray-600 mb-12">E levando sua receita junto.</p>
        
        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-medium">Pool compartilhado</span>
                <span className="text-red-600 font-bold text-lg">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-sm h-3">
                <div className="bg-red-500 h-3 rounded-sm w-[80%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-medium">IP dedicado</span>
                <span className="text-green-600 font-bold text-lg">90%+</span>
              </div>
              <div className="w-full bg-gray-200 rounded-sm h-3">
                <div className="bg-green-500 h-3 rounded-sm w-[90%]"></div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-gray-800 mt-8 font-semibold">
            Cada e-mail que não chega na caixa de entrada, é menos dinheiro para o seu bolso!
          </p>
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

export default RealityShockSection;
