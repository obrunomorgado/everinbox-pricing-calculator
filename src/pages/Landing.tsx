
import React, { useState } from 'react';
import { useLandingCalculations } from '@/hooks/useLandingCalculations';
import { useLandingAnimations } from '@/hooks/useLandingAnimations';
import ModalidadeModal from '@/components/landing/ModalidadeModal';
import ProgressIndicators from '@/components/landing/ProgressIndicators';
import RealityShockSection from '@/components/landing/sections/RealityShockSection';
import VolumeSection from '@/components/landing/sections/VolumeSection';
import PriceSection from '@/components/landing/sections/PriceSection';
import ROISection from '@/components/landing/sections/ROISection';
import GuaranteesSection from '@/components/landing/sections/GuaranteesSection';
import FinalSection from '@/components/landing/sections/FinalSection';
import CallToActionBar from '@/components/landing/CallToActionBar';

const Landing = () => {
  const [volume, setVolume] = useState(20);
  const [modalidade, setModalidade] = useState("12m");
  const [moeda, setMoeda] = useState("USD");
  const [cpc, setCpc] = useState(0.15);
  const [showModalidadeModal, setShowModalidadeModal] = useState(false);

  const { sectionsRef, scrollToNextSection } = useLandingAnimations();
  const { plan, total, warmupCost, receitaExtra, roi, perdaFinanceira, extraInbox, fx } = useLandingCalculations({
    volume,
    modalidade,
    cpc
  });

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

  return (
    <div className="min-h-screen bg-white font-['Inter'] relative">
      <ProgressIndicators />

      <RealityShockSection 
        sectionsRef={sectionsRef}
        onNext={() => scrollToNextSection(0)}
      />

      <VolumeSection 
        sectionsRef={sectionsRef}
        volume={volume}
        setVolume={setVolume}
        plan={plan}
        perdaFinanceira={perdaFinanceira}
        formatCurrency={formatCurrency}
        getWarmupText={getWarmupText}
        onNext={() => scrollToNextSection(1)}
      />

      <PriceSection 
        sectionsRef={sectionsRef}
        total={total}
        warmupCost={warmupCost}
        modalidade={modalidade}
        formatCurrency={formatCurrency}
        setShowModalidadeModal={setShowModalidadeModal}
        onNext={() => scrollToNextSection(2)}
      />

      <ROISection 
        sectionsRef={sectionsRef}
        extraInbox={extraInbox}
        cpc={cpc}
        setCpc={setCpc}
        receitaExtra={receitaExtra}
        roi={roi}
        formatCurrency={formatCurrency}
        formatNumber={formatNumber}
        onNext={() => scrollToNextSection(3)}
      />

      <GuaranteesSection 
        sectionsRef={sectionsRef}
        onNext={() => scrollToNextSection(4)}
      />

      <FinalSection sectionsRef={sectionsRef} />

      <CallToActionBar 
        total={total}
        warmupCost={warmupCost}
        formatCurrency={formatCurrency}
      />

      <ModalidadeModal 
        showModal={showModalidadeModal}
        setShowModal={setShowModalidadeModal}
        modalidade={modalidade}
        setModalidade={setModalidade}
      />

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
