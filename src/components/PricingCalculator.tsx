
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import PricingForm from './pricing/PricingForm';
import PricingBreakdown from './pricing/PricingBreakdown';
import ROIAnalysis from './pricing/ROIAnalysis';
import CallToAction from './pricing/CallToAction';
import FooterNotes from './pricing/FooterNotes';
import usePricingCalculations from '@/hooks/usePricingCalculations';

const PricingCalculator = () => {
  const [volumeMensal, setVolumeMensal] = useState(10);
  const [modalidade, setModalidade] = useState("12 meses (-10 %)");
  const [receitaEmail, setReceitaEmail] = useState(0.002);
  const [kickstart, setKickstart] = useState(false);
  const [moeda, setMoeda] = useState("USD");

  const fx = 6.0;
  const { calculations, ipFee } = usePricingCalculations({
    volumeMensal,
    modalidade,
    receitaEmail,
    kickstart
  });

  const formatCurrency = (value: number) => {
    if (moeda === "BRL") {
      return `R$ ${(value * fx).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EverInbox</h1>
              <p className="text-gray-600">Calculadora de Precificação & ROI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <PricingForm
              volumeMensal={volumeMensal}
              setVolumeMensal={setVolumeMensal}
              modalidade={modalidade}
              setModalidade={setModalidade}
              receitaEmail={receitaEmail}
              setReceitaEmail={setReceitaEmail}
              kickstart={kickstart}
              setKickstart={setKickstart}
              moeda={moeda}
              setMoeda={setMoeda}
            />
          </div>

          {/* Results */}
          <div className="space-y-6">
            <PricingBreakdown
              calculations={calculations}
              formatCurrency={formatCurrency}
              formatNumber={formatNumber}
              ipFee={ipFee}
            />

            <ROIAnalysis
              calculations={calculations}
              formatCurrency={formatCurrency}
              formatNumber={formatNumber}
            />

            <CallToAction />
          </div>
        </div>

        <FooterNotes />
      </div>
    </div>
  );
};

export default PricingCalculator;
