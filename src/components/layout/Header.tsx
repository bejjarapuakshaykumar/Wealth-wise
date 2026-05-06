import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp, Shield, Calculator, CreditCard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: TrendingUp },
    { name: "Credit & Debt", href: "/credit-debt", icon: Shield },
    { name: "EMI Calculator", href: "/calculator", icon: Calculator },
    { name: "Investments", href: "/investment", icon: TrendingUp },
    { name: "Acts", href: "/acts", icon: Shield },
    { name: "Bank Products", href: "/products", icon: CreditCard },
    { name: "Stocks", href: "/stocks", icon: TrendingUp },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Wealth Wise</span>
              <span className="text-xs text-muted-foreground">Financial Success</span>
            </div>
          </Link>

          {}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActivePath(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Register
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>

          {}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                      isActivePath(item.href)
                        ? "text-primary bg-primary/5 border-r-2 border-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 px-4 space-y-2">
                <Link to="/login" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="block">
                  <Button variant="primary" size="sm" className="w-full justify-start">
                    Register
                  </Button>
                </Link>
                <Link to="/dashboard" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;