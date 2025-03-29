
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast(); //encapsulate reusable logic for displaying notifications.
  const [isVisible, setIsVisible] = useState(false);      //manage the data in the forms and the loading/visibility states
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Login Form State
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate login
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Welcome back to Ethereal Threads!",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    // Simulate registration
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col justify-center">
      <div className="container-custom max-w-md">
        <div 
          className={cn(
            "bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 transform",
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to Ethereal Threads</h1>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      name="email"
                      type="email" 
                      placeholder="name@example.com" 
                      value={loginForm.email}
                      onChange={handleLoginInputChange}
                      required 
                      className="focus-visible:ring-glam-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="login-password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-glam-purple hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="login-password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={loginForm.password}
                      onChange={handleLoginInputChange}
                      required 
                      className="focus-visible:ring-glam-purple"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-glam-purple hover:bg-glam-purple-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input 
                      id="register-name" 
                      name="name"
                      placeholder="Ethereal Threads" 
                      value={registerForm.name}
                      onChange={handleRegisterInputChange}
                      required 
                      className="focus-visible:ring-glam-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      name="email"
                      type="email" 
                      placeholder="name@example.com" 
                      value={registerForm.email}
                      onChange={handleRegisterInputChange}
                      required 
                      className="focus-visible:ring-glam-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={registerForm.password}
                      onChange={handleRegisterInputChange}
                      required 
                      className="focus-visible:ring-glam-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input 
                      id="register-confirm-password" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="••••••••" 
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterInputChange}
                      required 
                      className="focus-visible:ring-glam-purple"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-glam-purple hover:bg-glam-purple-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>By continuing, you agree to our <Link to="/terms" className="text-glam-purple hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-glam-purple hover:underline">Privacy Policy</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
