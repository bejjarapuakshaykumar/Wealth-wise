import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  PiggyBank, 
  Home as HomeIcon, 
  TrendingUp, 
  Search,
  Filter,
  Star,
  GitCompare,
  Eye,
  Calculator
} from "lucide-react";

interface Product {
  id: string;
  bank: string;
  name: string;
  type: "credit_card" | "personal_loan" | "home_loan" | "savings_account";
  apr: number;
  interestType: "fixed" | "floating";
  processingFee: number;
  joiningFee: number;
  annualFee: number;
  rewards: { type: string; value: string };
  eligibility: string;
  requiredDocuments: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviews: number;
  lastUpdated: string;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    bank: "HDFC Bank",
    name: "MoneyBack Credit Card",
    type: "credit_card",
    apr: 3.5,
    interestType: "floating",
    processingFee: 0,
    joiningFee: 500,
    annualFee: 500,
    rewards: { type: "Cashback", value: "1% on all spends" },
    eligibility: "Min income ₹2,00,000/year",
    requiredDocuments: ["Salary slips", "Bank statements", "PAN card"],
    pros: ["No processing fee", "Good cashback rate", "Wide acceptance"],
    cons: ["Annual fee applicable", "Limited lounge access"],
    rating: 4.2,
    reviews: 1250,
    lastUpdated: "2024-01-15"
  },
  {
    id: "2",
    bank: "ICICI Bank",
    name: "Personal Loan",
    type: "personal_loan",
    apr: 12.5,
    interestType: "fixed",
    processingFee: 2500,
    joiningFee: 0,
    annualFee: 0,
    rewards: { type: "None", value: "N/A" },
    eligibility: "Min income ₹3,00,000/year",
    requiredDocuments: ["Salary slips", "Bank statements", "Identity proof"],
    pros: ["Quick approval", "Flexible tenure", "No collateral required"],
    cons: ["High interest rate", "Processing fees applicable"],
    rating: 3.8,
    reviews: 890,
    lastUpdated: "2024-01-14"
  },
  {
    id: "3",
    bank: "SBI",
    name: "Home Loan Regular",
    type: "home_loan",
    apr: 8.5,
    interestType: "floating",
    processingFee: 10000,
    joiningFee: 0,
    annualFee: 0,
    rewards: { type: "None", value: "N/A" },
    eligibility: "Min income ₹5,00,000/year",
    requiredDocuments: ["Property papers", "Income proof", "Bank statements"],
    pros: ["Competitive rates", "Trusted lender", "Tax benefits"],
    cons: ["Lengthy approval process", "High processing fee"],
    rating: 4.0,
    reviews: 2100,
    lastUpdated: "2024-01-13"
  },
  {
    id: "4",
    bank: "Kotak Mahindra",
    name: "811 Savings Account",
    type: "savings_account",
    apr: 4.0,
    interestType: "fixed",
    processingFee: 0,
    joiningFee: 0,
    annualFee: 0,
    rewards: { type: "Interest", value: "4% per annum" },
    eligibility: "Min age 18 years",
    requiredDocuments: ["Aadhaar card", "PAN card"],
    pros: ["Zero balance account", "High interest rate", "Digital banking"],
    cons: ["Limited branch network", "Transaction limits"],
    rating: 4.3,
    reviews: 3200,
    lastUpdated: "2024-01-16"
  }
];

const Products = () => {
  const [products] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedBank, setSelectedBank] = useState<string>("all");

  const productTypeIcons = {
    credit_card: CreditCard,
    personal_loan: PiggyBank,
    home_loan: HomeIcon,
    savings_account: TrendingUp
  };

  const productTypeLabels = {
    credit_card: "Credit Card",
    personal_loan: "Personal Loan",
    home_loan: "Home Loan",
    savings_account: "Savings Account"
  };

  const banks = Array.from(new Set(products.map(p => p.bank)));

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProducts(term, selectedType, selectedBank);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterProducts(searchTerm, type, selectedBank);
  };

  const handleBankFilter = (bank: string) => {
    setSelectedBank(bank);
    filterProducts(searchTerm, selectedType, bank);
  };

  const filterProducts = (term: string, type: string, bank: string) => {
    let filtered = products;

    if (term) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.bank.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter(product => product.type === type);
    }

    if (bank !== "all") {
      filtered = filtered.filter(product => product.bank === bank);
    }

    setFilteredProducts(filtered);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      credit_card: "bg-blue-500",
      personal_loan: "bg-green-500",
      home_loan: "bg-orange-500",
      savings_account: "bg-purple-500"
    };
    return colors[type as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Financial Products</h1>
          <p className="text-muted-foreground">
            Compare and find the best financial products from trusted banks and lenders.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or banks..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedType} onValueChange={handleTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="credit_card">Credit Cards</SelectItem>
              <SelectItem value="personal_loan">Personal Loans</SelectItem>
              <SelectItem value="home_loan">Home Loans</SelectItem>
              <SelectItem value="savings_account">Savings Accounts</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBank} onValueChange={handleBankFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Banks</SelectItem>
              {banks.map(bank => (
                <SelectItem key={bank} value={bank}>{bank}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const IconComponent = productTypeIcons[product.type];
            return (
              <Card key={product.id} className="hover:shadow-card transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-lg ${getTypeColor(product.type)} flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {product.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{product.bank}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {productTypeLabels[product.type]}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {product.type === 'savings_account' ? 'Interest Rate' : 'APR'}
                      </p>
                      <p className="text-lg font-semibold text-primary">{product.apr}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Processing Fee</p>
                      <p className="text-lg font-semibold">
                        {product.processingFee === 0 ? 'FREE' : `₹${product.processingFee.toLocaleString()}`}
                      </p>
                    </div>
                  </div>

                  {/* Rewards */}
                  {product.rewards.type !== "None" && (
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                      <p className="text-xs text-success font-medium">{product.rewards.type}</p>
                      <p className="text-sm text-success">{product.rewards.value}</p>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Updated {new Date(product.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Eligibility</p>
                    <p className="text-sm">{product.eligibility}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <GitCompare className="h-3 w-3 mr-1" />
                      Compare
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calculator className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all products.
            </p>
            <Button 
              variant="primary" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedBank("all");
                setFilteredProducts(products);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;