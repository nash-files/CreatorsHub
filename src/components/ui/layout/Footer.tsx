
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Upload } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-creator text-white">
              <Upload className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">Creators Hub</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Empowering creators to share and monetize their digital resources.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/store" className="text-sm text-muted-foreground hover:text-foreground">
                Browse Store
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/trending" className="text-sm text-muted-foreground hover:text-foreground">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/new" className="text-sm text-muted-foreground hover:text-foreground">
                New Releases
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">For Creators</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/become-creator" className="text-sm text-muted-foreground hover:text-foreground">
                Become a Creator
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing Plans
              </Link>
            </li>
            <li>
              <Link to="/guidelines" className="text-sm text-muted-foreground hover:text-foreground">
                Creator Guidelines
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Creators Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
