
import { useMemo } from 'react';

interface Plan {
  nome: string;
  min: number;
  max: number;
  tarifa: number;
  piso: number;
  inclu: number;
}

interface UsePricingCalculationsProps {
  volumeMensal: number;
  modalidade: string;
  receitaEmail: number;
  kickstart: boolean;
}

const usePricingCalculations = ({
  volumeMensal,
  modalidade,
  receitaEmail,
  kickstart
}: UsePricingCalculationsProps) => {
  const plans: Plan[] = [
    { nome: "Early", min: 5, max: 20, tarifa: 0.00034, piso: 1700, inclu: 5 },
    { nome: "Growth", min: 21, max: 40, tarifa: 0.00030, piso: 6300, inclu: 21 },
    { nome: "Scale", min: 41, max: 60, tarifa: 0.00024, piso: 9600, inclu: 41 },
    { nome: "High-Vol", min: 61, max: 100, tarifa: 0.00020, piso: 12000, inclu: 61 },
    { nome: "Custom", min: 100, max: 9999, tarifa: 0.00018, piso: 18000, inclu: 100 }
  ];
  
  const desc = {
    "Flex (Mensal)": 0,
    "6 meses (-5 %)": 0.05,
    "12 meses (-10 %)": 0.10
  };
  
  const ipFee = 55;
  const kickFee = 1200;
  const ganhoPp = 15;

  const calculations = useMemo(() => {
    const emails = volumeMensal * 1e6;
    const plan = plans.find(p => volumeMensal >= p.min && volumeMensal <= p.max) || plans[plans.length - 1];
    const piso = plan.piso * (1 - desc[modalidade as keyof typeof desc]);
    const inclu = plan.inclu * 1e6;
    const exced = Math.max(emails - inclu, 0);
    const cred = Math.max(inclu - emails, 0);
    const excedCost = exced * plan.tarifa;
    const credVal = cred * plan.tarifa;
    const ips = Math.ceil(emails / 90e6);
    const ipC = ips * ipFee;
    const kick = kickstart ? kickFee : 0;
    const total = piso + excedCost + ipC;
    const extraInbox = emails * ganhoPp / 100;
    const ganhoFin = extraInbox * receitaEmail;

    return {
      plan,
      piso,
      exced,
      cred,
      excedCost,
      credVal,
      ips,
      ipC,
      kick,
      total,
      extraInbox,
      ganhoFin,
      emails
    };
  }, [volumeMensal, modalidade, receitaEmail, kickstart]);

  return { calculations, ipFee };
};

export default usePricingCalculations;
