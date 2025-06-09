
import React from 'react';

interface ModalidadeModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalidade: string;
  setModalidade: (modalidade: string) => void;
}

const ModalidadeModal: React.FC<ModalidadeModalProps> = ({
  showModal,
  setShowModal,
  modalidade,
  setModalidade
}) => {
  if (!showModal) return null;

  const options = [
    { value: "12m", label: "Anual -10%", desc: "Warm-up GRÁTIS (economia $1.200)", highlight: true },
    { value: "6m", label: "Semestral -5%", desc: "Warm-up 50% desconto ($600)", highlight: false },
    { value: "Flex", label: "Flex (mensal)", desc: "Warm-up opcional $1.200", highlight: false }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Escolha seu prazo</h3>
        
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option.value} className={`flex items-center cursor-pointer p-3 rounded-lg border-2 transition-colors ${
              option.highlight 
                ? 'border-green-300 bg-green-50 hover:bg-green-100' 
                : 'border-gray-200 hover:bg-gray-50'
            } ${modalidade === option.value ? 'border-blue-500 bg-blue-50' : ''}`}>
              <input
                type="radio"
                name="modalidade"
                value={option.value}
                checked={modalidade === option.value}
                onChange={(e) => setModalidade(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{option.label}</span>
                  {option.highlight && <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">RECOMENDADO</span>}
                </div>
                <p className="text-sm text-gray-500">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="w-full mt-6 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalidadeModal;
