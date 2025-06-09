
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DollarSign } from 'lucide-react';

interface PricingFormProps {
  volumeMensal: number;
  setVolumeMensal: (value: number) => void;
  modalidade: string;
  setModalidade: (value: string) => void;
  receitaEmail: number;
  setReceitaEmail: (value: number) => void;
  kickstart: boolean;
  setKickstart: (value: boolean) => void;
  moeda: string;
  setMoeda: (value: string) => void;
}

const PricingForm = ({
  volumeMensal,
  setVolumeMensal,
  modalidade,
  setModalidade,
  receitaEmail,
  setReceitaEmail,
  kickstart,
  setKickstart,
  moeda,
  setMoeda
}: PricingFormProps) => {
  return (
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
  );
};

export default PricingForm;
