
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface GuaranteesSectionProps {
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  onNext: () => void;
}

const GuaranteesSection: React.FC<GuaranteesSectionProps> = ({ sectionsRef, onNext }) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  return (
    <section 
      ref={(el) => (sectionsRef.current[4] = el)}
      className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out relative"
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Garantias que protegem seu investimento
        </h2>
        
        <div className="space-y-3 mb-8">
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleAccordion('creditos')}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">Sistema de créditos: zero desperdício</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedAccordion === 'creditos' ? 'rotate-180' : ''}`} />
            </button>
            {expandedAccordion === 'creditos' && (
              <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                <p className="mb-2">Disparou menos que o piso? Todo valor vira crédito automático:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>Flex:</strong> créditos válidos por 3 meses</li>
                  <li>• <strong>Semestral:</strong> créditos válidos por 6 meses</li>
                  <li>• <strong>Anual:</strong> créditos válidos por 9 meses</li>
                </ul>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleAccordion('warmup')}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">Warm-up profissional incluso</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedAccordion === 'warmup' ? 'rotate-180' : ''}`} />
            </button>
            {expandedAccordion === 'warmup' && (
              <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                <p className="mb-2">Nossa equipe prepara seu IP para máxima entregabilidade:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>Anual:</strong> warm-up 100% gratuito (economia de $1.200)</li>
                  <li>• <strong>Semestral:</strong> warm-up com 50% desconto ($600)</li>
                  <li>• <strong>Flex:</strong> warm-up opcional por $1.200</li>
                </ul>
                <p className="text-sm mt-2">Inclui: configuração DNS, aquecimento gradual, monitoramento 24/7</p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleAccordion('saida')}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">Política de saída transparente</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedAccordion === 'saida' ? 'rotate-180' : ''}`} />
            </button>
            {expandedAccordion === 'saida' && (
              <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                <p className="mb-2">Sem multas abusivas ou armadilhas:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>Flex:</strong> cancelamento com 30 dias de aviso</li>
                  <li>• <strong>Outros planos:</strong> multa limitada ao desconto recebido</li>
                  <li>• Créditos sempre reembolsados proporcionalmente</li>
                  <li>• Migração assistida dos dados quando solicitada</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-gray-600">
          <span className="font-semibold text-gray-900">Investimento protegido. Resultados garantidos.</span>
        </p>
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

export default GuaranteesSection;
