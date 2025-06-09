
import PricingCalculator from "@/components/PricingCalculator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">EverInbox Calculator</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/landing')} 
              variant="outline"
            >
              Ver Landing Storytelling
            </Button>
            <Button 
              onClick={() => navigate('/storytelling')} 
              variant="default"
            >
              Ver Landing Exata
            </Button>
          </div>
        </div>
      </div>
      <PricingCalculator />
    </div>
  );
};

export default Index;
