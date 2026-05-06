import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie } from "recharts";
import { 
  User, 
  Bookmark, 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Bell
} from "lucide-react";

const Dashboard = () => {
  // ✅ Dummy static data instead of API
  const [investments] = useState([
    { stockSymbol: "RELIANCE", investmentAmount: 50000, projectedValue: 62000 },
    { stockSymbol: "TCS", investmentAmount: 40000, projectedValue: 48000 },
    { stockSymbol: "INFY", investmentAmount: 30000, projectedValue: 35000 },
  ]);

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
  const currentValue = investments.reduce((sum, inv) => sum + inv.projectedValue, 0);
  const totalGains = currentValue - totalInvestment;
  const activeEMIs = 3;

  // Chart data
  const portfolioData = investments.map(inv => ({
    name: inv.stockSymbol,
    value: inv.projectedValue
  }));
  const pieData = investments.map(inv => ({
    name: inv.stockSymbol,
    value: inv.projectedValue
  }));

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Financial Dashboard</h1>
            <p className="text-muted-foreground">Track your financial journey and manage your investments</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Profile Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 shadow-financial">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-primary mr-3" />
                  <h2 className="text-lg font-semibold">Your Profile</h2>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Premium Member</p>

                  <div className="space-y-2 text-left mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Risk Profile:</span>
                      <Badge variant="outline">Moderate</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Investment Experience:</span>
                      <Badge variant="outline">Intermediate</Badge>
                    </div>
                  </div>

                  <Button className="w-full mt-3" variant="outline">Edit Profile</Button>
                </div>
              </Card>

              <Card className="p-6 shadow-financial">
                <div className="flex items-center mb-4">
                  <Bell className="h-5 w-5 text-primary mr-3" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Portfolio Review</p>
                    <p className="text-xs text-muted-foreground">Your monthly review is ready</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">EMI Reminder</p>
                    <p className="text-xs text-muted-foreground">Payment due in 3 days</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Dashboard Right Side */}
            <div className="lg:col-span-3 space-y-6">
              {/* Key Figures */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4 shadow-financial">
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="text-2xl font-bold text-primary">₹{totalInvestment.toLocaleString()}</p>
                </Card>
                <Card className="p-4 shadow-financial">
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="text-2xl font-bold text-success">₹{currentValue.toLocaleString()}</p>
                </Card>
                <Card className="p-4 shadow-financial">
                  <p className="text-sm text-muted-foreground">Total Gains</p>
                  <p className="text-2xl font-bold text-accent">₹{totalGains.toLocaleString()}</p>
                </Card>
                <Card className="p-4 shadow-financial">
                  <p className="text-sm text-muted-foreground">Active EMIs</p>
                  <p className="text-2xl font-bold text-primary">{activeEMIs}</p>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 shadow-financial">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-5 w-5 text-primary mr-3" />
                    <h3 className="text-lg font-semibold">Portfolio Performance</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={portfolioData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 shadow-financial">
                  <div className="flex items-center mb-4">
                    <PieChart className="h-5 w-5 text-primary mr-3" />
                    <h3 className="text-lg font-semibold">Asset Allocation</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <RePieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#3b82f6" label />
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Saved Products */}
              <Card className="p-6 shadow-financial">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Bookmark className="h-5 w-5 text-primary mr-3" />
                    <h3 className="text-lg font-semibold">Saved Products</h3>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-medium">HDFC Credit Card</h4>
                    <p className="text-sm text-muted-foreground mb-3">Cashback rewards on all purchases</p>
                    <div className="flex justify-between text-sm">
                      <span>APR: 3.5% p.m.</span>
                      <Button variant="ghost" size="sm">Compare</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-medium">SBI Personal Loan</h4>
                    <p className="text-sm text-muted-foreground mb-3">Quick processing, minimal documentation</p>
                    <div className="flex justify-between text-sm">
                      <span>Interest: 11.5% p.a.</span>
                      <Button variant="ghost" size="sm">Apply</Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 shadow-financial">
                <div className="flex items-center mb-6">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">EMI Calculation</p>
                      <p className="text-sm text-muted-foreground">Calculated for ₹5,00,000 home loan</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Product Comparison</p>
                      <p className="text-sm text-muted-foreground">Compared 3 credit cards</p>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Investment Analysis</p>
                      <p className="text-sm text-muted-foreground">Analyzed mutual fund portfolio</p>
                    </div>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
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

export default Dashboard;
