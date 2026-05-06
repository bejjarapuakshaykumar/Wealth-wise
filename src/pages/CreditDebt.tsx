import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, TrendingDown, Calculator } from "lucide-react";

const CreditDebt = () => {
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");
  const [ratio, setRatio] = useState<number | null>(null);
  const [advice, setAdvice] = useState("");

  const calculateRatio = (e: React.FormEvent) => {
    e.preventDefault();

    const incomeValue = parseFloat(income);
    const debtValue = parseFloat(debt);

    if (!incomeValue || !debtValue || incomeValue <= 0) {
      setRatio(null);
      setAdvice("Please enter valid numbers for income and debt.");
      return;
    }

    const result = (debtValue / incomeValue) * 100;
    setRatio(result);

    if (result < 20) {
      setAdvice("Excellent! Your debt level is very healthy. Maintain this balance.");
    } else if (result < 36) {
      setAdvice("Good! Your debt-to-income ratio is manageable, but avoid taking new loans.");
    } else if (result < 50) {
      setAdvice("Caution! Your ratio is getting high. Try to pay off smaller debts first.");
    } else {
      setAdvice("Warning! Debt level is risky. Focus on consolidation and avoid new credit.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Credit & Debt Management</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take control of your finances with our comprehensive debt analysis and management tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="p-8 shadow-financial">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Debt Analysis Form</h2>
              </div>

              <form onSubmit={calculateRatio} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="Enter your full name" className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Enter your monthly income"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalDebt">Total Monthly Debt Payments (₹)</Label>
                  <Input
                    id="totalDebt"
                    type="number"
                    value={debt}
                    onChange={(e) => setDebt(e.target.value)}
                    placeholder="Enter your total monthly debt payments"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentDebts">Current Debts Details</Label>
                  <Textarea
                    id="currentDebts"
                    placeholder="List all your current debts (credit cards, loans, EMIs, etc.)"
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full" variant="primary">
                  <Calculator className="h-4 w-4 mr-2" />
                  Analyze My Debt
                </Button>
              </form>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              <Card className="p-8 shadow-financial">
                <div className="flex items-center mb-6">
                  <TrendingDown className="h-6 w-6 text-accent mr-3" />
                  <h2 className="text-2xl font-semibold">Debt-to-Income Ratio</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Current Ratio</Label>
                    <div className="text-3xl font-bold text-primary">
                      {ratio !== null ? `${ratio.toFixed(2)}%` : "---"}
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Recommendation</Label>
                    <div className="text-lg font-medium">
                      {advice || "Analysis will appear here"}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-financial">
                <h3 className="text-xl font-semibold mb-4">Recommended Advice</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">Debt Consolidation</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider merging high-interest loans into one with lower interest.
                    </p>
                  </div>
                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-medium">Payment Strategy</h4>
                    <p className="text-sm text-muted-foreground">
                      Prioritize paying high-interest debt first and maintain consistent EMIs.
                    </p>
                  </div>
                  <div className="border-l-4 border-success pl-4">
                    <h4 className="font-medium">Savings Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      Build an emergency fund equal to 3–6 months of expenses.
                    </p>
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

export default CreditDebt;
