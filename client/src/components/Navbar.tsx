import { useState } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthStatus from "./AuthStatus";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/admissions", label: "Admissions" },
    { href: "/gallery", label: "Gallery" },
    { href: "/announcements", label: "Announcements" },
    { href: "/contact", label: "Contact" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and School Name */}
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Treasure-Home School</h1>
              <p className="text-xs text-gray-500 -mt-1">Quality Education & Moral Excellence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium ${
                  isActiveLink(item.href)
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-primary-600"
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Status / Login */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthStatus />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? (
                <X className="text-lg" />
              ) : (
                <Menu className="text-lg" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 animate-slide-in" data-testid="mobile-menu">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block ${
                  isActiveLink(item.href)
                    ? "text-gray-900 font-medium"
                    : "text-gray-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <AuthStatus isMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
