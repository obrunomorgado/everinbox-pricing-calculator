
import { useMemo } from 'react';

interface UseLandingCalculationsProps {
  volume: number;
  modalidade: string;
  cpc: number;
}

export const useLandingCalculations = ({ volume, modalidade, cpc }: UseLandingCalculationsProps) => {
  return useMemo(() => {
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
    const emailsPerdidos = emails * 0.15;
    const perdaFinanceira = emailsPerdidos * 0.03 * cpc;

    return {
      plan,
      total,
      warmupCost,
      receitaExtra,
      roi,
      perdaFinanceira,
      extraInbox,
      fx
    };
  }, [volume, modalidade, cpc]);
};
