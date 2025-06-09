
import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';

const Landing = () => {
  const [volume, setVolume] = useState(20);
  const [modalidade, setModalidade] = useState("12m");
  const [moeda, setMoeda] = useState("USD");
  const [cpc, setCpc] = useState(0.15);
  const [showModalidadeModal, setShowModalidadeModal] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Constants
  const plans = [
    { nome: "Early", min: 5, max: 20, tarifa: 0.00034, piso: 1700, inclu: 5 },
    { nome: "Growth", min: 21, max: 40, tarifa: 0.00030, piso: 6300, inclu: 21 },
    { nome: "Scale", min: 41, max: 60, tarifa: 0.00024, piso: 9600, inclu: 41 },
    { nome: "High-Vol", min: 61, max: 100, tarifa: 0.00020, piso: 12000, inclu: 61 },
    { nome: "Custom", min: 100, max: 9999, tarifa: 0.00018, piso: 18000, inclu: 100 }
  ];
  
  const descontos = { "Flex": 0, "6m": 0.05, "12m": 0.10 };
  const fx = 6.0;
  const ipFee = 55;
  const ganhoPp = 15;

  // Calculations
  const emails = volume * 1e6;
  const plan = plans.find(p => volume >= p.min && volume <= p.max) || plans[plans.length - 1];
  const piso = plan.piso * (1 - descontos[modalidade as keyof typeof descontos]);
  const inclu = plan.inclu * 1e6;
  const exced = Math.max(emails - inclu, 0);
  const excedCost = exced * plan.tarifa;
  const ips = Math.ceil(emails / 90e6);
  const ipCost = ips * ipFee;
  const total = piso + excedCost + ipCost;
  const anual = total * 12;
  const extraInbox = emails * ganhoPp / 100;
  const receitaExtra = extraInbox * 0.03 * cpc;
  const roi = receitaExtra / total;
  
  // Financial loss calculation
  const emailsPerdidos = emails * 0.15; // 15% lost to spam
  const perdaFinanceira = emailsPerdidos * 0.03 * cpc;

  const formatCurrency = (value: number) => {
    if (moeda === "BRL") {
      return `R$ ${(value * fx).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatNumber = (value: number) => {
    return (value / 1e6).toFixed(1);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white font-['Inter'] relative">
      {/* Section 1: Choque de Realidade */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Seus e-mails estão <span className="text-red-600">morrendo no spam.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">E levando sua receita junto.</p>
          
          {/* Comparison bars - clean and minimal */}
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
                  <span className="text-green-600 font-bold text-lg">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-sm h-3">
                  <div className="bg-green-500 h-3 rounded-sm w-[95%]"></div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-gray-800 mt-8 font-semibold">
              Cada e-mail no spam = receita perdida para sempre.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Volume → Plano */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
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
            <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg text-xl font-semibold">
              Plano {plan.nome}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Preço Real */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Investimento para recuperar sua receita
          </h2>
          
          <div className="text-center space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Investimento mensal:</p>
              <p className="text-4xl font-bold text-gray-900">{formatCurrency(total)}</p>
              <p className="text-sm text-gray-500 mt-2">
                {modalidade === "12m" && "Anual -10% aplicado"}
                {modalidade === "6m" && "Semestral -5% aplicado"}
                {modalidade === "Flex" && "Modalidade flex"}
              </p>
            </div>

            <button
              onClick={() => setShowModalidadeModal(true)}
              className="text-gray-700 underline hover:text-gray-900 transition-colors"
            >
              Ver outros prazos
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: ROI */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            O retorno do seu investimento
          </h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-green-800 font-semibold text-lg mb-2">+{formatNumber(extraInbox)}M e-mails extras</p>
              <p className="text-sm text-gray-600">chegando na inbox (+15 p.p.)</p>
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

            <div className="text-center bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Receita extra mensal:</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(receitaExtra)}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">ROI:</p>
              <p className="text-5xl font-bold text-gray-900">{roi.toFixed(1)}x</p>
              <p className="text-sm text-gray-500 mt-2">O investimento se paga sozinho</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Sem Risco */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out pb-24"
      >
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Sem risco. Sem desperdício.
          </h2>
          
          <div className="space-y-3 mb-8">
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAccordion('credito')}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">Não usou? Vira crédito válido por 9 meses</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedAccordion === 'credito' ? 'rotate-180' : ''}`} />
              </button>
              {expandedAccordion === 'credito' && (
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                  Disparou menos que o piso? Todo valor vira crédito. Zero desperdício.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAccordion('kickstart')}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">Nossa equipe prepara seu IP para alta performance</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedAccordion === 'kickstart' ? 'rotate-180' : ''}`} />
              </button>
              {expandedAccordion === 'kickstart' && (
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                  Configuramos DNS, aquecemos com 50k envios. Seu IP chega pronto para entregar.
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-gray-600">
            <span className="font-semibold text-gray-900">Zero surpresas. Zero desperdício.</span>
          </p>
        </div>
      </section>

      {/* CTA Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="container mx-auto max-w-lg">
          <button
            onClick={() => window.open('https://everinbox.com.br/contato', '_blank')}
            className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Preciso do meu IP dedicado · {formatCurrency(total)}/mês
          </button>
        </div>
      </div>

      {/* Modal de Modalidade */}
      {showModalidadeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Escolha seu prazo</h3>
            
            <div className="space-y-3">
              {[
                { value: "12m", label: "Anual -10%", desc: "Melhor desconto" },
                { value: "6m", label: "Semestral -5%", desc: "Desconto médio" },
                { value: "Flex", label: "Flex (mensal)", desc: "Sem compromisso" }
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                  <input
                    type="radio"
                    name="modalidade"
                    value={option.value}
                    checked={modalidade === option.value}
                    onChange={(e) => setModalidade(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-semibold text-gray-800">{option.label}</span>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowModalidadeModal(false)}
              className="w-full mt-6 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #374151;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #374151;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Landing;
