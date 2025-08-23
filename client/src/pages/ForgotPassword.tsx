import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/auth/forgot-password", { email });
    },
    onSuccess: () => {
      setIsEmailSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Please check your email for password reset instructions."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" data-testid="forgot-password-success">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Check Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent password reset instructions to your email address
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Please check your email inbox for a message from Treasure-Home School. 
                  Follow the instructions in the email to reset your password.
                </p>
                
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button 
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail("");
                    }}
                    className="text-primary-600 hover:text-primary-700 underline"
                    data-testid="try-again-button"
                  >
                    try again
                  </button>
                </p>

                <div className="pt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full" data-testid="back-to-login">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" data-testid="forgot-password-page">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="text-white text-2xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Reset Your Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  data-testid="input-email"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Enter the email address associated with your account
                </p>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={forgotPasswordMutation.isPending}
                data-testid="submit-forgot-password"
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset email...
                  </>
                ) : (
                  "Send Reset Email"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium" data-testid="link-login">
                  Sign in
                </Link>
              </p>
              
              <Link href="/" className="block text-sm text-gray-500 hover:text-gray-700" data-testid="link-home">
                ← Back to Homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
