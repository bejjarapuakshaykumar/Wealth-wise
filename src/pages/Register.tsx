import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-financial">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Join Wealth Wise</h1>
            <p className="text-muted-foreground">Create your account to start your financial journey</p>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                type="text" 
                placeholder="Enter your full name"
                className="w-full"
              />
            </div>
            
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
                placeholder="Create a password"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                type="password" 
                placeholder="Confirm your password"
                className="w-full"
              />
            </div>
            
            <Button className="w-full" variant="primary">
              Register
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Login here
              </a>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;