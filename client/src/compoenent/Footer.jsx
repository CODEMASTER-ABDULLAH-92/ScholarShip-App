import { Home, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2" />
              EduScholarship
            </h3>
            <p className="text-gray-300">
              Connecting students with educational opportunities worldwide. Our mission is to make quality education accessible to all.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition">About Us</a></li>
              <li><a href="/scholarships" className="text-gray-300 hover:text-white transition">Scholarships</a></li>
              <li><a href="/eligibility" className="text-gray-300 hover:text-white transition">Eligibility</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition">FAQs</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">info@eduscholarship.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">+1 (123) 456-7890</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} EduScholarship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;