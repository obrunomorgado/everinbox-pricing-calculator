
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Plan {
  nome: string;
  tarifa: number;
}

interface Calculations {
  plan: Plan;
  piso: number;
  exced: number;
  excedCost: number;
  cred: number;
  credVal: number;
  ips: number;
  ipC: number;
  kick: number;
  total: number;
}

interface PricingBreakdownProps {
  calculations: Calculations;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number) => string;
  ipFee: number;
}

const PricingBreakdown = ({ calculations, formatCurrency, formatNumber, ipFee }: PricingBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plano: {calculations.plan.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Item</th>
                  <th className="text-right py-2 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">Tarifa por e-mail</td>
                  <td className="py-2 text-right">{formatCurrency(calculations.plan.tarifa)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Piso mensal</td>
                  <td className="py-2 text-right">{formatCurrency(calculations.piso)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Excedente</td>
                  <td className="py-2 text-right">
                    {calculations.exced > 0 
                      ? `${formatCurrency(calculations.excedCost)} (${formatNumber(calculations.exced)})`
                      : "—"
                    }
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Crédito gerado</td>
                  <td className="py-2 text-right">
                    {calculations.cred > 0 
                      ? `${formatCurrency(calculations.credVal)} (${formatNumber(calculations.cred)})`
                      : "—"
                    }
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">IPs dedicados</td>
                  <td className="py-2 text-right">
                    {calculations.ips} × {formatCurrency(ipFee)} = {formatCurrency(calculations.ipC)} /mês
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Kick-start de Reputação</td>
                  <td className="py-2 text-right">
                    {calculations.kick > 0 ? formatCurrency(calculations.kick) : "—"}
                  </td>
                </tr>
                <tr className="border-t-2 border-primary">
                  <td className="py-2 font-semibold">Total mensal</td>
                  <td className="py-2 text-right font-bold text-lg text-primary">
                    {formatCurrency(calculations.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingBreakdown;
