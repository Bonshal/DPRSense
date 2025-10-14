import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginCredentials } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return await apiRequest("POST", "/api/auth/login", credentials);
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome to the DPR Appraisal Platform",
      });
      setLocation("/upload");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-card-border rounded-lg p-8 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              DPR Appraisal Platform
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Ministry of Development of North Eastern Region
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          data-testid="input-username"
                          placeholder="Enter username"
                          className="pl-10"
                          autoComplete="username"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          data-testid="input-password"
                          type="password"
                          placeholder="Enter password"
                          className="pl-10"
                          autoComplete="current-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                data-testid="button-login"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Demo Credentials: admin / password123
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Secure Government Infrastructure Platform
          </p>
        </div>
      </div>
    </div>
  );
}
