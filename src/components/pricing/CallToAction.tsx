
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;
