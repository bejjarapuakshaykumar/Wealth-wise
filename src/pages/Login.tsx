import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-financial">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Wealth Wise account</p>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Enter your password"
                className="w-full"
              />
            </div>
            
            <div className="space-y-4">
              <Button className="w-full" variant="primary">
                Login
              </Button>
              
              <Button className="w-full" variant="ghost">
                Forgot Password?
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="text-primary hover:underline">
                Register here
              </a>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;