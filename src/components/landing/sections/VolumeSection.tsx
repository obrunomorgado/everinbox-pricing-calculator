
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface VolumeSectionProps {
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  volume: number;
  setVolume: (volume: number) => void;
  plan: any;
  perdaFinanceira: number;
  formatCurrency: (value: number) => string;
  getWarmupText: () => string;
  onNext: () => void;
}

const VolumeSection: React.FC<VolumeSectionProps> = ({
  sectionsRef,
  volume,
  setVolume,
  plan,
  perdaFinanceira,
  formatCurrency,
  getWarmupText,
  onNext
}) => {
  return (
    <section 
      ref={(el) => (sectionsRef.current[1] = el)}
      className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out relative"
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Quanto dinheiro você está deixando na mesa?
        </h2>
        <p className="text-center text-gray-600 mb-8">Arraste para descobrir.</p>
        
        <div className="mb-8">
          <input
            type="range"
            min="5"
            max="120"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #374151 0%, #374151 ${((volume - 5) / (120 - 5)) * 100}%, #e5e7eb ${((volume - 5) / (120 - 5)) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="text-center mt-6">
            <span className="text-4xl font-bold text-gray-900">{volume}M</span>
            <p className="text-sm text-gray-500 mt-1">e-mails/mês</p>
            <p className="text-lg text-red-600 font-semibold mt-4">
              Perda mensal: {formatCurrency(perdaFinanceira)}
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg">
            <div className="text-xl font-semibold">Plano {plan.nome}</div>
            <div className="text-sm text-gray-300 mt-1">{getWarmupText()}</div>
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

export default VolumeSection;
