import { Link } from "wouter";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* School Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Treasure-Home School</h3>
                <p className="text-sm text-gray-400">Qualitative Education and Moral Excellence</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Nurturing young minds with comprehensive education, character building, and innovative learning approaches in Seriki-Soyinka, Ifo, Ogun State.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center space-x-2" data-testid="footer-address">
                <MapPin className="text-primary-400 h-4 w-4" />
                <span>Seriki-Soyinka, Ifo, Ogun State</span>
              </p>
              <p className="flex items-center space-x-2" data-testid="footer-phone">
                <Phone className="text-primary-400 h-4 w-4" />
                <span>+234 XXX XXX XXXX</span>
              </p>
              <p className="flex items-center space-x-2" data-testid="footer-email">
                <Mail className="text-primary-400 h-4 w-4" />
                <span>info@treasurehomeschool.edu.ng</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/admissions" className="hover:text-primary-400 transition-colors" data-testid="footer-link-admissions">Admissions</Link></li>
              <li><Link href="/gallery" className="hover:text-primary-400 transition-colors" data-testid="footer-link-gallery">Gallery</Link></li>
              <li><Link href="/announcements" className="hover:text-primary-400 transition-colors" data-testid="footer-link-announcements">Announcements</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors" data-testid="footer-link-contact">Contact</Link></li>
            </ul>
          </div>

          {/* Portal Access */}
          <div>
            <h4 className="text-white font-semibold mb-4">Portal Access</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-primary-400 transition-colors" data-testid="footer-link-login">Portal Login</Link></li>
              <li><Link href="/signup" className="hover:text-primary-400 transition-colors" data-testid="footer-link-signup">Student Registration</Link></li>
              <li><Link href="/dashboard/teacher" className="hover:text-primary-400 transition-colors" data-testid="footer-link-staff">Staff Portal</Link></li>
              <li><Link href="/dashboard/parent" className="hover:text-primary-400 transition-colors" data-testid="footer-link-parent">Parent Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400" data-testid="footer-copyright">
              &copy; {currentYear} Treasure-Home School. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" data-testid="footer-social-facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" data-testid="footer-social-twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" data-testid="footer-social-instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" data-testid="footer-social-linkedin">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
