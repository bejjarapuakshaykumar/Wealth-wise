import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Calculator from "./pages/Calculator";
import CreditDebt from "./pages/CreditDebt";
import Investment from "./pages/Investment";
import Acts from "./pages/Acts";
import Stocks from "./pages/Stocks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AIPages from "./pages/AIPages";
import FloatingAIButton from "./components/FloatingAIButton";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/credit-debt" element={<CreditDebt />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/acts" element={<Acts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ai" element={<AIPages />} />
          {}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingAIButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
