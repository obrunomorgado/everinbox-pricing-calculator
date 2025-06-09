
import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

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
  const warmupCosts = { "Flex": 1200, "6m": 600, "12m": 0 };
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
  const warmupCost = warmupCosts[modalidade as keyof typeof warmupCosts];
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

  const getWarmupText = () => {
    switch (modalidade) {
      case "12m": return "Warm-up GRÁTIS incluído";
      case "6m": return "Warm-up 50% desconto";
      case "Flex": return "Warm-up adicional $1.200";
      default: return "";
    }
  };

  const scrollToNextSection = (currentIndex: number) => {
    const nextSection = sectionsRef.current[currentIndex + 1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
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
      {/* Progress indicators */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
          />
        ))}
      </div>

      {/* Section 1: Choque de Realidade */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out relative"
      >
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Seus e-mails estão <span className="text-red-600">morrendo antes de chegar</span> na caixa de entrada.
          </h1>
          <p className="text-xl text-gray-600 mb-12">E levando sua receita junto.</p>
          
          {/* Updated comparison bars */}
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

        {/* Navigation arrow */}
        <button
          onClick={() => scrollToNextSection(0)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-90" />
        </button>
      </section>

      {/* Section 2: Volume → Plano */}
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
          onClick={() => scrollToNextSection(1)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-90" />
        </button>
      </section>

      {/* Section 3: Preço Real */}
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
          onClick={() => scrollToNextSection(2)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-90" />
        </button>
      </section>

      {/* Section 4: ROI */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-8 transition-all duration-700 ease-out relative"
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

        <button
          onClick={() => scrollToNextSection(3)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-90" />
        </button>
      </section>

      {/* NEW Section 5: Garantias */}
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
          onClick={() => scrollToNextSection(4)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-90" />
        </button>
      </section>

      {/* Section 6: Sem Risco (previously section 5) */}
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

      {/* Updated CTA */}
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

      {/* Updated Modal de Modalidade */}
      {showModalidadeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Escolha seu prazo</h3>
            
            <div className="space-y-3">
              {[
                { value: "12m", label: "Anual -10%", desc: "Warm-up GRÁTIS (economia $1.200)", highlight: true },
                { value: "6m", label: "Semestral -5%", desc: "Warm-up 50% desconto ($600)", highlight: false },
                { value: "Flex", label: "Flex (mensal)", desc: "Warm-up opcional $1.200", highlight: false }
              ].map((option) => (
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
