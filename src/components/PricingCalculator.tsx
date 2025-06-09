
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ExternalLink, Mail, TrendingUp, DollarSign } from 'lucide-react';

const PricingCalculator = () => {
  const [volumeMensal, setVolumeMensal] = useState(10);
  const [modalidade, setModalidade] = useState("12 meses (-10 %)");
  const [receitaEmail, setReceitaEmail] = useState(0.002);
  const [kickstart, setKickstart] = useState(false);
  const [moeda, setMoeda] = useState("USD");

  // Constants
  const fx = 6.0;
  const plans = [
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

  // Calculations
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Configuração do Plano
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="volume">Envios por mês · milhões</Label>
                  <Input
                    id="volume"
                    type="number"
                    value={volumeMensal}
                    onChange={(e) => setVolumeMensal(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Ex.: 25 = 25.000.000</p>
                </div>

                <div>
                  <Label htmlFor="modalidade">Modalidade</Label>
                  <Select value={modalidade} onValueChange={setModalidade}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Flex (Mensal)">Flex (Mensal)</SelectItem>
                      <SelectItem value="6 meses (-5 %)">6 meses (-5 %)</SelectItem>
                      <SelectItem value="12 meses (-10 %)">12 meses (-10 %)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="receita">$ por e-mail entregue</Label>
                  <Input
                    id="receita"
                    type="number"
                    step="0.001"
                    value={receitaEmail}
                    onChange={(e) => setReceitaEmail(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Se não souber, deixe 0,002</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="kickstart"
                    checked={kickstart}
                    onCheckedChange={setKickstart}
                  />
                  <Label htmlFor="kickstart">
                    Adicionar Kick-start de Reputação · US$ 1.200?
                  </Label>
                </div>

                <div>
                  <Label htmlFor="moeda">Moeda</Label>
                  <Select value={moeda} onValueChange={setMoeda}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="BRL">BRL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Pricing Breakdown */}
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

            {/* ROI Analysis */}
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

            {/* Call to Action */}
            <Card className="bg-primary text-white">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Pronto para começar?</h3>
                  <Button 
                    className="bg-white text-primary hover:bg-gray-100"
                    onClick={() => window.open('https://everinbox.com.br/contato', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Quero meu IP dedicado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-12 p-6 bg-white rounded-lg border">
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Kick-start de Reputação:</strong> setup DNS + aquecimento controlado (50k envios) e monitoria diária.</p>
            <p><strong>Piso mensal</strong> vira <strong>crédito automático</strong> caso você dispare menos que o volume incluído (validade conforme modalidade).</p>
            <p>Valores em BRL usam câmbio fixo US$ 1 = R$ 6.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
