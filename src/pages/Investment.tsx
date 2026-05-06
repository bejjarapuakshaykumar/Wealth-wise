import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, Shield, DollarSign } from "lucide-react";

const investmentData = {
  stocks: { risk: "High", score: 8, returnRate: 12 },
  mutualFunds: { risk: "Medium", score: 5, returnRate: 8 },
  fixedDeposit: { risk: "Low", score: 2, returnRate: 5 },
  bonds: { risk: "Low-Medium", score: 3, returnRate: 6 },
  gold: { risk: "Medium-High", score: 6, returnRate: 9 },
  realEstate: { risk: "Medium", score: 5, returnRate: 7 }
};

const Investment = () => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [riskLevel, setRiskLevel] = useState("---");
  const [riskScore, setRiskScore] = useState("--/10");
  const [annualReturn, setAnnualReturn] = useState("---");
  const [projectedValue, setProjectedValue] = useState("---");
  const [totalGains, setTotalGains] = useState("---");

  const handleAnalyze = () => {
    if (!type || !amount || !time) return;

    const data = investmentData[type];
    setRiskLevel(data.risk);
    setRiskScore(`${data.score}/10`);

    const annual = data.returnRate;
    setAnnualReturn(annual);

    const projected = Number(amount) * Math.pow(1 + annual / 100, Number(time));
    setProjectedValue(projected.toFixed(2));

    setTotalGains((projected - Number(amount)).toFixed(2));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Investment Guidance</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Make informed investment decisions with our comprehensive analysis tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 shadow-financial">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Investment Calculator</h2>
              </div>
              
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleAnalyze(); }}>
                <div className="space-y-2">
                  <Label htmlFor="investmentType">Investment Type</Label>
                  <Select onValueChange={setType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(investmentData).map(key => (
                        <SelectItem key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount (₹)</Label>
                  <Input 
                    id="amount"
                    type="number" 
                    placeholder="Enter investment amount"
                    className="w-full"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeHorizon">Time Horizon (Years)</Label>
                  <Input 
                    id="timeHorizon"
                    type="number" 
                    placeholder="Enter investment duration"
                    className="w-full"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  />
                </div>
                
                <Button className="w-full" variant="primary" onClick={handleAnalyze}>
                  <Target className="h-4 w-4 mr-2" />
                  Analyze Investment
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-8 shadow-financial">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold">Risk Assessment</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Risk Level</Label>
                    <div className="text-2xl font-bold text-primary">{riskLevel}</div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Risk Score</Label>
                    <div className="text-2xl font-bold text-accent">{riskScore}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-financial">
                <div className="flex items-center mb-6">
                  <DollarSign className="h-6 w-6 text-success mr-3" />
                  <h2 className="text-2xl font-semibold">Expected Returns</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Expected Annual Return</Label>
                    <div className="text-3xl font-bold text-success">{annualReturn}%</div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Projected Value</Label>
                    <div className="text-2xl font-bold text-primary">₹{projectedValue}</div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Total Gains</Label>
                    <div className="text-2xl font-bold text-accent">₹{totalGains}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Investment;
