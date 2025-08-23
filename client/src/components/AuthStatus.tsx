import { useState } from "react";
import { Link } from "wouter";
import { User, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AuthStatusProps {
  isMobile?: boolean;
}

export default function AuthStatus({ isMobile = false }: AuthStatusProps) {
  const { toast } = useToast();
  
  // Query for current user
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include"
        });
        if (!response.ok) {
          return null;
        }
        return response.json();
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      
      // Redirect to home page
      window.location.href = "/";
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getDashboardLink = (role: string) => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";
      case "teacher":
        return "/dashboard/teacher";
      case "student":
        return "/dashboard/student";
      case "parent":
        return "/dashboard/parent";
      default:
        return "/";
    }
  };

  if (isLoading) {
    return (
      <div className={isMobile ? "space-y-2" : "flex items-center space-x-4"}>
        <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
      </div>
    );
  }

  if (!user) {
    // Logged out state
    return (
      <div className={isMobile ? "space-y-2" : "flex items-center space-x-4"}>
        <Link href="/login" className={isMobile ? "block text-gray-600" : "text-gray-600 hover:text-primary-600 transition-colors"} data-testid="auth-login-link">
          Login
        </Link>
        <Link href="/signup" data-testid="auth-signup-button">
          <Button className={isMobile ? "w-full" : "btn-primary"}>
            Portal
          </Button>
        </Link>
      </div>
    );
  }

  // Logged in state
  if (isMobile) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-600" data-testid="auth-user-greeting">
          Hello, <span className="font-medium">{user.name}</span>
        </p>
        <div className="space-y-2">
          <Link href={getDashboardLink(user.role)} className="block text-gray-600" data-testid="auth-dashboard-link">
            My Dashboard
          </Link>
          <button 
            onClick={handleLogout}
            className="block text-gray-600 w-full text-left"
            data-testid="auth-logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600" data-testid="auth-user-greeting">
        Hello, <span className="font-medium">{user.name}</span>
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900" data-testid="auth-dropdown-trigger">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="text-primary-600 h-4 w-4" />
            </div>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href={getDashboardLink(user.role)} className="w-full" data-testid="auth-dropdown-dashboard">
              My Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600" data-testid="auth-dropdown-logout">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
