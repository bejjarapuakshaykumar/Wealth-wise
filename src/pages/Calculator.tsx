import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator as CalculatorIcon, 
  TrendingUp, 
  PieChart,
  Info,
  Download,
  Share
} from "lucide-react";

interface EMIResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  monthlySchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("12");
  const [tenure, setTenure] = useState("24");
  const [tenureType, setTenureType] = useState("months");
  const [result, setResult] = useState<EMIResult | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const months = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (principal && rate && months) {
      // EMI calculation formula
      const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      const totalAmount = emi * months;
      const totalInterest = totalAmount - principal;

      // Generate amortization schedule
      const schedule = [];
      let remainingBalance = principal;

      for (let month = 1; month <= months; month++) {
        const interestPayment = remainingBalance * rate;
        const principalPayment = emi - interestPayment;
        remainingBalance -= principalPayment;

        schedule.push({
          month,
          emi: emi,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, remainingBalance)
        });
      }

      setResult({
        emi,
        totalInterest,
        totalAmount,
        monthlySchedule: schedule
      });
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure, tenureType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const loanTypes = [
    { value: "personal", label: "Personal Loan", rate: "10.5-24%" },
    { value: "home", label: "Home Loan", rate: "8.5-12%" },
    { value: "car", label: "Car Loan", rate: "8-14%" },
    { value: "education", label: "Education Loan", rate: "9-15%" },
  ];

  const popularAmounts = [100000, 500000, 1000000, 2500000];
  const popularTenures = [12, 24, 36, 60];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">EMI Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your Equated Monthly Installments (EMI) for loans and understand your repayment schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalculatorIcon className="h-5 w-5 mr-2 text-primary" />
                  Loan Details
                </CardTitle>
                <CardDescription>
                  Enter your loan information to calculate EMI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Loan Type */}
                <div>
                  <Label htmlFor="loanType" className="text-sm font-medium">Loan Type</Label>
                  <Select defaultValue="personal">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{type.label}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {type.rate}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Loan Amount */}
                <div>
                  <Label htmlFor="loanAmount" className="text-sm font-medium">
                    Loan Amount (₹)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="mt-1"
                    placeholder="Enter loan amount"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setLoanAmount(amount.toString())}
                        className="text-xs"
                      >
                        ₹{(amount / 100000).toFixed(0)}L
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <Label htmlFor="interestRate" className="text-sm font-medium">
                    Interest Rate (% per annum)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="mt-1"
                    placeholder="Enter interest rate"
                  />
                </div>

                {/* Tenure */}
                <div>
                  <Label htmlFor="tenure" className="text-sm font-medium">Tenure</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="flex-1"
                      placeholder="Enter tenure"
                    />
                    <Select value={tenureType} onValueChange={setTenureType}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="years">Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularTenures.map((t) => (
                      <Button
                        key={t}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTenure(t.toString());
                          setTenureType("months");
                        }}
                        className="text-xs"
                      >
                        {t}M
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={calculateEMI} 
                  className="w-full" 
                  variant="primary"
                >
                  Calculate EMI
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {result && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {formatCurrency(result.emi)}
                      </div>
                      <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-success mb-1">
                        {formatCurrency(result.totalInterest)}
                      </div>
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {formatCurrency(result.totalAmount)}
                      </div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Analysis */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                        Loan Analysis
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="breakdown" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                        <TabsTrigger value="schedule">Schedule</TabsTrigger>
                        <TabsTrigger value="comparison">Compare</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="breakdown" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Principal vs Interest</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Principal Amount:</span>
                                <span className="font-medium">{formatCurrency(parseFloat(loanAmount))}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Total Interest:</span>
                                <span className="font-medium text-warning">{formatCurrency(result.totalInterest)}</span>
                              </div>
                              <div className="w-full bg-border rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-l-full"
                                  style={{ 
                                    width: `${(parseFloat(loanAmount) / result.totalAmount) * 100}%` 
                                  }}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Interest is {((result.totalInterest / parseFloat(loanAmount)) * 100).toFixed(1)}% of principal
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Key Metrics</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Effective Rate:</span>
                                <span className="font-medium">{interestRate}% p.a.</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tenure:</span>
                                <span className="font-medium">
                                  {tenureType === "years" ? `${tenure} years` : `${tenure} months`}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>EMI/Income Ratio:</span>
                                <span className="font-medium">--</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="schedule" className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Month</th>
                                <th className="text-right p-2">EMI</th>
                                <th className="text-right p-2">Principal</th>
                                <th className="text-right p-2">Interest</th>
                                <th className="text-right p-2">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.monthlySchedule.slice(0, 12).map((month) => (
                                <tr key={month.month} className="border-b">
                                  <td className="p-2">{month.month}</td>
                                  <td className="text-right p-2">{formatCurrency(month.emi)}</td>
                                  <td className="text-right p-2">{formatCurrency(month.principal)}</td>
                                  <td className="text-right p-2">{formatCurrency(month.interest)}</td>
                                  <td className="text-right p-2">{formatCurrency(month.balance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {result.monthlySchedule.length > 12 && (
                            <div className="text-center py-4">
                              <Button variant="outline" size="sm">
                                View Complete Schedule
                              </Button>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="comparison" className="space-y-4">
                        <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <Info className="h-4 w-4 text-info mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-info">💡 Money-Saving Tip</p>
                              <p className="text-info/80 mt-1">
                                Prepaying ₹{formatCurrency(result.emi * 0.2).replace('₹', '')} extra per month could save you 
                                approximately ₹{formatCurrency(result.totalInterest * 0.15).replace('₹', '')} in interest and 
                                reduce your tenure by several months.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;