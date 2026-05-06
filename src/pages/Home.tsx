import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Shield, 
  Calculator, 
  Brain, 
  CreditCard, 
  PiggyBank, 
  Home,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Advisor",
      description: "Get personalized financial recommendations powered by advanced AI that understands your unique situation.",
      color: "bg-accent"
    },
    {
      icon: Shield,
      title: "Trusted Product Database",
      description: "Access verified information from 50+ banks with real-time updates and accurate product details.",
      color: "bg-success"
    },
    {
      icon: Calculator,
      title: "Smart Calculators",
      description: "Calculate EMIs, compare interest rates, and visualize your financial scenarios with our advanced tools.",
      color: "bg-info"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Stay ahead with market trends, interest rate forecasts, and expert financial guidance.",
      color: "bg-warning"
    }
  ];

  const productTypes = [
    {
      icon: CreditCard,
      title: "Credit Cards",
      description: "Compare rewards, APR, and benefits",
      count: "150+ Cards",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: PiggyBank,
      title: "Personal Loans",
      description: "Find the best interest rates",
      count: "200+ Options",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: Home,
      title: "Home Loans",
      description: "Compare mortgage rates & terms",
      count: "100+ Lenders",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: TrendingUp,
      title: "Savings Accounts",
      description: "Maximize your savings potential",
      count: "80+ Banks",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "Wealth Wise helped me find the perfect credit card that saved me $500 annually in fees. The AI advisor explained everything clearly!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "The loan comparison tool was amazing. Found a home loan with 0.5% lower interest rate, saving thousands over the loan term.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "Best financial app I've used. The AI actually understands my questions and gives practical advice, not generic responses.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Users Helped", value: "50,000+", icon: Users },
    { label: "Money Saved", value: "$5M+", icon: TrendingUp },
    { label: "Bank Partners", value: "50+", icon: Shield },
    { label: "Success Rate", value: "94%", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen">
      {}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Financial Advisor
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Wealth Wise
              <span className="block text-accent-light">Way to Financial Success</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Making financial wisdom accessible to everyone, everywhere. Compare bank products, 
              calculate EMIs, and get personalized financial guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="accent" size="lg" className="group">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="accent" size="lg" className="group">
                <Link to="/calculator">
                  Try EMI Calculator
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-foreground/10 rounded-full animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-light/20 rounded-full animate-bounce-subtle" />
      </section>

      {}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Wealth Wise?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with comprehensive financial data 
              to provide you with the most accurate and personalized advice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${feature.color}/10 mb-4 mx-auto`}>
                    <feature.icon className={`h-8 w-8 text-foreground`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Compare Financial Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive information on thousands of financial products from trusted banks and lenders.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productTypes.map((product, index) => (
              <Card key={index} className="group hover:shadow-financial transition-all duration-300 cursor-pointer border-border/50">
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${product.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {product.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {product.count}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {product.description}
                  </CardDescription>
                  <Button asChild variant="ghost" size="sm" className="w-full group-hover:bg-primary/10">
                    <Link to="/products">
                      View All
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their financial journey with Wealth Wise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of users who are making smarter financial decisions with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="accent">
              <Link to="/products">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;