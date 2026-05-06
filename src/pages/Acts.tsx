import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, FileText, Scale, Shield } from "lucide-react";

const Acts = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Government Acts & Regulations</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay informed about financial laws and regulations that protect your interests.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Search Section */}
            <Card className="p-8 shadow-financial">
              <div className="flex items-center mb-6">
                <Search className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Search Financial Acts</h2>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="actSearch">Enter Act Name</Label>
                  <Input 
                    id="actSearch"
                    type="text" 
                    placeholder="Search for RBI Act, Banking Regulation Act, SEBI Act, etc."
                    className="w-full mt-2"
                  />
                </div>
                <Button className="mt-8" variant="primary">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            <Card className="p-8 shadow-financial">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-accent mr-3" />
                <h2 className="text-2xl font-semibold">Act Summary</h2>
              </div>
              
              <div className="bg-muted p-6 rounded-lg min-h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Act summary and details will appear here after searching
                </p>
              </div>
            </Card>

            {/* Popular Acts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-financial hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Scale className="h-5 w-5 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">RBI Act, 1934</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Governs the Reserve Bank of India and monetary policy in the country.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </Card>

              <Card className="p-6 shadow-financial hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Banking Regulation Act, 1949</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Regulates all banking companies in India and protects depositors' interests.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </Card>

              <Card className="p-6 shadow-financial hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">SEBI Act, 1992</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Establishes Securities and Exchange Board of India to protect investors.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </Card>

              <Card className="p-6 shadow-financial hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Scale className="h-5 w-5 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Consumer Protection Act, 2019</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Protects consumers from unfair trade practices in financial services.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Acts;