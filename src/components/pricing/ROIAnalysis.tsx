
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface Calculations {
  extraInbox: number;
  ganhoFin: number;
}

interface ROIAnalysisProps {
  calculations: Calculations;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number) => string;
}

const ROIAnalysis = ({ calculations, formatCurrency, formatNumber }: ROIAnalysisProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Impacto de Entregabilidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Indicador</th>
                <th className="text-right py-2 font-medium">Estimativa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Inbox extra</td>
                <td className="py-2 text-right">
                  {formatNumber(calculations.extraInbox)} e-mês (+15 p.p.)
                </td>
              </tr>
              <tr>
                <td className="py-2">Receita potencial</td>
                <td className="py-2 text-right font-semibold text-green-600">
                  {formatCurrency(calculations.ganhoFin)}/mês
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROIAnalysis;
