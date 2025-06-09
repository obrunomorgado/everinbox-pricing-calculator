
import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const Landing = () => {
  const [volume, setVolume] = useState(20);
  const [modalidade, setModalidade] = useState("12m");
  const [moeda, setMoeda] = useState("USD");
  const [cpc, setCpc] = useState(0.15);
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

  return (
    <div className="min-h-screen bg-[#EEF2FF] font-['Inter']">
      {/* Section 1: Hero */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <h1 className="text-6xl font-bold text-[#1E40FF] text-center mb-6 leading-tight">
          Quantos e-mails você <span className="underline decoration-[#1E40FF]">perde</span> na caixa de spam?
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl">
          Descubra agora o custo real de não ter um IP dedicado e como a EverInbox pode transformar sua entregabilidade.
        </p>
      </section>

      {/* Section 2: Volume Slider */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-[#1E40FF] text-center mb-8">
            1 · Escolha seu volume
          </h2>
          
          <div className="mb-6">
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

          <div className="mb-6">
            <p className="text-center text-lg mb-2">
              Plano recomendado: <span className="font-bold text-[#1E40FF]">{plan.nome}</span>
            </p>
          </div>

          <hr className="my-6 border-gray-200" />

          <h3 className="text-xl font-semibold text-[#1E40FF] mb-4">2 · Prazo de compromisso</h3>
          <div className="space-y-2">
            {[
              { value: "12m", label: "Anual -10%" },
              { value: "6m", label: "Semestral -5%" },
              { value: "Flex", label: "Flex (mensal)" }
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="modalidade"
                  value={option.value}
                  checked={modalidade === option.value}
                  onChange={(e) => setModalidade(e.target.value)}
                  className="mr-3 text-[#1E40FF]"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          <hr className="my-6 border-gray-200" />

          <h3 className="text-xl font-semibold text-[#1E40FF] mb-4">3 · Moeda</h3>
          <div className="space-y-2">
            {[
              { value: "USD", label: "USD" },
              { value: "BRL", label: "BRL" }
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="moeda"
                  value={option.value}
                  checked={moeda === option.value}
                  onChange={(e) => setMoeda(e.target.value)}
                  className="mr-3 text-[#1E40FF]"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Fixed Costs */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-[#1E40FF] text-center mb-8">
            Investimento fixo EverInbox
          </h2>
          
          <div className="text-center space-y-4">
            <p className="text-lg">Plano <span className="font-bold text-[#1E40FF]">{plan.nome}</span></p>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Tarifa por e-mail:</p>
              <p className="text-2xl font-bold text-[#1E40FF]">{formatCurrency(plan.tarifa)}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Compromisso anual:</p>
              <p className="text-3xl font-bold text-[#1E40FF]">{formatCurrency(anual)}</p>
              <p className="text-lg font-semibold text-gray-700">{formatCurrency(total)}/mês</p>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              * 1 IP dedicado incluído a cada 90M e-mails
            </p>
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
            Ganho potencial com IP dedicado
          </h2>
          
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">E-mails extras na Inbox (@ +15 p.p.)</p>
              <p className="text-3xl font-bold text-[#1E40FF]">+{formatNumber(extraInbox)}M</p>
            </div>

            <hr className="border-gray-200" />

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Custo por clique médio (edite):
              </label>
              <div className="flex items-center">
                <span className="text-lg mr-2">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={cpc}
                  onChange={(e) => setCpc(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-2 flex-1"
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Receita extra mensal:</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(receitaExtra)}</p>
            </div>

            <hr className="border-gray-200" />

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">ROI potencial:</p>
              <p className="text-4xl font-bold text-[#1E40FF]">{roi.toFixed(1)}x</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Objections & CTA */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)}
        className="min-h-screen flex flex-col justify-center items-center px-6 opacity-0 translate-y-16 transition-all duration-600 ease-out"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-[#1E40FF] text-center mb-8">
            Sem risco de desperdício
          </h2>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-[#1E40FF] mr-2 text-xl">✓</span>
              <div>
                <strong>Crédito automático:</strong> disparou menos que o piso? vira crédito válido por 9 meses.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#1E40FF] mr-2 text-xl">✓</span>
              <div>
                <strong>Kick-start de Reputação:</strong> equipe configura DNS + aquece 50k envios.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#1E40FF] mr-2 text-xl">✓</span>
              <div>
                <strong>Sem surpresa:</strong> cancelou? reembolsamos créditos menos custo do IP.
              </div>
            </li>
          </ul>

          <div className="text-center">
            <button
              onClick={() => window.open('https://everinbox.com.br/contato', '_blank')}
              className="bg-[#1E40FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-200 active:scale-95 inline-flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Quero este plano agora!
            </button>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
};

export default Landing;
