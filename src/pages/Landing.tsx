
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
  const receitaExtra = extraInbox * 0.03 * cpc; // 3% CTR
  const roi = receitaExtra / total;

  const formatCurrency = (value: number) => {
    if (moeda === "BRL") {
      return `R$ ${(value * fx).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
            entry.target.classList.remove('opacity-0', 'translate-y-16');
          }
        });
      },
      { threshold: 0.5 }
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
    <div className="min-h-screen bg-[#EEF2FF] font-['Inter'] relative">
      {/* Section 1: Choque de Realidade - Hero com gráfico */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <h1 className="text-6xl font-bold text-[#1E40FF] text-center mb-6 leading-tight">
          Quantos % dos seus e-mails <span className="underline decoration-[#1E40FF]">morrem no spam?</span>
        </h1>
        
        {/* Mini gráfico de barras comparativo */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-md w-full mt-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Pool compartilhado</span>
                <span className="text-red-500 font-bold">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-red-500 h-4 rounded-full w-[80%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">IP dedicado</span>
                <span className="text-green-500 font-bold">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full w-[95%]"></div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-gray-600 mt-6 text-lg">
            <span className="text-[#1E40FF] font-bold">Cada ponto perdido é dinheiro que não volta.</span>
          </p>
        </div>
      </section>

      {/* Section 2: Volume → Plano */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-[#1E40FF] text-center mb-8">
            Seu volume → seu plano
          </h2>
          
          <div className="mb-6">
            <p className="text-center text-gray-600 mb-4">Arraste para ver onde você se encaixa.</p>
            <input
              type="range"
              min="5"
              max="120"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #1E40FF 0%, #1E40FF ${((volume - 5) / (120 - 5)) * 100}%, #e5e7eb ${((volume - 5) / (120 - 5)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="text-center mt-4">
              <span className="text-4xl font-bold text-[#1E40FF]">{volume}M</span>
              <p className="text-sm text-gray-500 mt-1">milhões de e-mails/mês</p>
            </div>
          </div>

          {/* Badge do plano com destaque */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-[#1E40FF] to-blue-600 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105 animate-pulse">
              Plano {plan.nome}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Preço Real */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-[#1E40FF] text-center mb-8">
            Quanto custa de verdade
          </h2>
          
          <div className="text-center space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Tarifa por e-mail:</p>
              <p className="text-2xl font-bold text-[#1E40FF]">{formatCurrency(plan.tarifa)}</p>
            </div>

            <div className="bg-[#EEF2FF] rounded-xl p-6">
              <p className="text-sm text-gray-600 mb-2">Seu investimento fixo para manter IP dedicado:</p>
              <p className="text-4xl font-bold text-[#1E40FF]">{formatCurrency(total)}</p>
              <p className="text-lg text-gray-700">/mês</p>
              <p className="text-sm text-gray-500 mt-2">
                {modalidade === "12m" && "Anual -10% aplicado"}
                {modalidade === "6m" && "Semestral -5% aplicado"}
                {modalidade === "Flex" && "Modalidade flex"}
              </p>
            </div>

            <button
              onClick={() => setShowModalidadeModal(true)}
              className="text-[#1E40FF] underline hover:text-blue-700 transition-colors"
            >
              Quero ver outro prazo
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: ROI */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-[#1E40FF] text-center mb-8">
            E quanto volta para o seu bolso
          </h2>
          
          {/* Painel que desliza */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6 animate-slide-in-right">
            <div className="text-center">
              <p className="text-green-700 font-bold text-lg mb-2">+15 p.p. na Inbox</p>
              <p className="text-3xl font-bold text-green-600">+{formatNumber(extraInbox)}M</p>
              <p className="text-sm text-gray-600">e-mails extras entregues</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Mude o valor por clique e veja o ROI reagir:
              </label>
              <div className="flex items-center">
                <span className="text-lg mr-2">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={cpc}
                  onChange={(e) => setCpc(Number(e.target.value))}
                  className="border-2 border-[#1E40FF] rounded-lg px-3 py-2 flex-1 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-center bg-[#EEF2FF] rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">Receita extra mensal:</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(receitaExtra)}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">ROI:</p>
              <p className="text-5xl font-bold text-[#1E40FF]">{roi.toFixed(1)}x</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Escudo de Risco Zero */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out pb-24"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-[#1E40FF] text-center mb-8">
            Escudo de risco zero
          </h2>
          
          {/* Accordions */}
          <div className="space-y-4 mb-8">
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAccordion('credito')}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">Pague e não usou? Vira crédito.</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedAccordion === 'credito' ? 'rotate-180' : ''}`} />
              </button>
              {expandedAccordion === 'credito' && (
                <div className="p-4 pt-0 text-gray-600">
                  Disparou menos que o piso? Todo valor vira crédito válido por 9 meses. Sem desperdício, sem surpresa.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAccordion('kickstart')}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">Kick-start: nossa equipe aquece seu IP</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedAccordion === 'kickstart' ? 'rotate-180' : ''}`} />
              </button>
              {expandedAccordion === 'kickstart' && (
                <div className="p-4 pt-0 text-gray-600">
                  Configuramos seu DNS, aquecemos com 50k envios e entregamos seu IP pronto para alta performance.
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-gray-600 text-lg">
            <span className="text-[#1E40FF] font-bold">Sem surpresas, sem desperdício.</span>
          </p>
        </div>
      </section>

      {/* CTA Fixo no Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#1E40FF] p-4 shadow-lg z-50">
        <div className="container mx-auto max-w-lg">
          <button
            onClick={() => window.open('https://everinbox.com.br/contato', '_blank')}
            className="w-full bg-[#1E40FF] text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Quero meu IP dedicado por {formatCurrency(total)}/mês
          </button>
        </div>
      </div>

      {/* Modal de Modalidade */}
      {showModalidadeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#1E40FF] mb-6 text-center">Escolha seu prazo</h3>
            
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
                    className="mr-3 text-[#1E40FF]"
                  />
                  <div>
                    <span className="font-semibold text-gray-800">{option.label}</span>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModalidadeModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #1E40FF;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #1E40FF;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        @keyframes slide-in-right {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Landing;
