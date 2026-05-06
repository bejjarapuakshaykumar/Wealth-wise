import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  TrendingUp,
  Calculator,
  CreditCard
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  confidence?: number;
  sources?: string[];
}

interface ChatWidgetProps {
  contextProduct?: any;
  isComparing?: boolean;
  comparedProducts?: any[];
}

const ChatWidget = ({ contextProduct, isComparing, comparedProducts }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Hi! I'm your AI Financial Advisor. I can help you understand bank products, compare options, calculate EMIs, and provide personalized recommendations. What would you like to know?",
      timestamp: new Date(),
      confidence: 95
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(inputValue, contextProduct, comparedProducts);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        confidence: response.confidence,
        sources: response.sources
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (query: string, product?: any, compared?: any[]) => {

    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("emi") || lowerQuery.includes("calculate")) {
      return {
        content: `💰 **EMI Calculation Help**\n\nI can help you calculate EMIs! Here's what I need:\n- Loan amount\n- Interest rate (% per annum)\n- Tenure (months)\n\n**Example:** ₹50,000 at 12% for 24 months\n**EMI:** ₹2,354\n**Total Interest:** ₹6,496\n**Total Amount:** ₹56,496\n\nWould you like me to calculate for specific values?`,
        confidence: 92,
        sources: ["RBI Guidelines", "Banking Regulations"]
      };
    }
    
    if (product && (lowerQuery.includes("this product") || lowerQuery.includes("explain"))) {
      return {
        content: `📊 **${product.name} Analysis**\n\n**Key Features:**\n- Bank: ${product.bank}\n- Type: ${product.type}\n- Interest Rate: ${product.apr}%\n\n**Best For:** ${product.type === 'credit_card' ? 'Regular spenders who pay bills on time' : 'Customers with stable income'}\n\n**Pros:**\n${product.pros?.map((pro: string) => `✅ ${pro}`).join('\n') || '• Competitive rates'}\n\nWould you like me to compare this with other options?`,
        confidence: 88,
        sources: [product.bank + " Official Website"]
      };
    }
    
    if (compared && compared.length > 1) {
      return {
        content: `🔄 **Product Comparison Summary**\n\nComparing ${compared.length} products:\n\n**Best for Low Interest:** ${compared[0]?.name}\n**Best for Rewards:** ${compared[1]?.name}\n\n**Recommendation:** Based on typical user profiles, I'd suggest ${compared[0]?.name} for cost-conscious users and ${compared[1]?.name} for reward seekers.\n\nNeed specific calculations for your situation?`,
        confidence: 85,
        sources: ["Product Database", "Market Analysis"]
      };
    }
    
    return {
      content: `🤔 **Great question!** \n\nI can help you with:\n\n📱 **Product Information** - Details about any bank product\n🔍 **Comparisons** - Side-by-side analysis\n💳 **Eligibility** - Check if you qualify\n📊 **Calculations** - EMI, interest, savings\n💡 **Recommendations** - Personalized suggestions\n\nWhat specific aspect interests you most?`,
      confidence: 80,
      sources: ["Financial Knowledge Base"]
    };
  };

  const quickActions = [
    { icon: Calculator, text: "Calculate EMI", action: () => setInputValue("Help me calculate EMI for a loan") },
    { icon: CreditCard, text: "Compare Cards", action: () => setInputValue("Compare credit cards for me") },
    { icon: TrendingUp, text: "Best Products", action: () => setInputValue("What are the best financial products for me?") },
  ];

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-financial z-40 ${
          isOpen ? "hidden" : "flex"
        }`}
        variant="financial"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-success rounded-full animate-pulse" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-financial z-40 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-primary rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-primary-foreground">AI Financial Advisor</div>
                <div className="text-xs text-primary-foreground/80 flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-1" />
                  Online
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Context Banner */}
          {contextProduct && (
            <div className="p-3 bg-accent/10 border-b">
              <div className="text-xs text-accent font-medium flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Analyzing: {contextProduct.name}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-4"
                      : "bg-muted mr-4"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === "assistant" && (
                      <Bot className="h-4 w-4 mt-0.5 text-primary" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      {message.confidence && (
                        <div className="mt-2 flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {message.confidence}% confident
                          </Badge>
                          {message.sources && (
                            <div className="text-xs text-muted-foreground">
                              Sources: {message.sources.join(", ")}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 mr-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 border-t bg-muted/30">
              <div className="text-xs text-muted-foreground mb-2">Quick actions:</div>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={action.action}
                  >
                    <action.icon className="h-3 w-3 mr-2" />
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about financial products..."
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                variant="primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;