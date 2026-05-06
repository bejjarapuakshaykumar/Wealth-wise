import { Link } from "react-router-dom";
import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Products": [
      { name: "Credit Cards", href: "/products?type=credit_card" },
      { name: "Personal Loans", href: "/products?type=personal_loan" },
      { name: "Home Loans", href: "/products?type=home_loan" },
      { name: "Savings Accounts", href: "/products?type=savings_account" },
    ],
    "Tools": [
      { name: "EMI Calculator", href: "/calculator" },
      { name: "Investment Guides", href: "/guides" },
      { name: "Compare Products", href: "/compare" },
      { name: "AI Advisor", href: "/ai-advisor" },
    ],
    "Company": [
      { name: "About Us", href: "/about" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-gradient-to-t from-muted/50 to-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Wealth Wise</span>
                <span className="text-xs text-muted-foreground">Way to Financial Success</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Your trusted financial advisor powered by AI. Make informed decisions about credit cards, 
              loans, and investments with personalized guidance and expert insights.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                support@wealthwise.com
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                1-800-WEALTH (932-584)
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Financial District, New York, NY
              </div>
            </div>
          </div>

          {}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Wealth Wise. All rights reserved.
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg px-4 py-2">
            <p className="text-xs text-warning-foreground">
              <strong>Disclaimer:</strong> Wealth Wise provides educational guidance and not financial or legal advice. 
              Always consult with qualified professionals for financial decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;