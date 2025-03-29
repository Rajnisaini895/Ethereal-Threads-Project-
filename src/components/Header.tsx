
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Home, Package, Info, Phone, ShoppingCart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {      {/*  defines the main header component*/}
  const { totalItems } = useCart();     {/*uses the useCart hook to get the current number of items*/}
  const [isScrolled, setIsScrolled] = useState(false); {/* used to change the header's appearance on scroll.*/}
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);   {/* controls whether the mobile menu is visible or not..*/}

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center group"
        >
          <h1 className="text-2xl font-bold text-glam-purple transition-colors duration-300 group-hover:text-glam-purple-dark">
          ETHEREAL THREADS
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" icon={<Home size={18} />} label="HOME" />
          <NavLink to="/products" icon={<Package size={18} />} label="PRODUCTS" />
          <NavLink to="/about" icon={<Info size={18} />} label="ABOUT" />
          <NavLink to="/contact" icon={<Phone size={18} />} label="CONTACT" />
          <NavLink to="/cart" icon={
              <div className="relative">
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-glam-purple text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            } 
            label="CART" 
          />
          <Button asChild className="ml-4 bg-glam-purple hover:bg-glam-purple-dark transition-colors duration-300">
            <Link to="/login">Login</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="mr-4 relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-glam-purple text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={toggleMobileMenu} 
            className="text-glam-purple focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ top: '60px' }}
      >
        <div className="container py-5 flex flex-col space-y-5">
          <MobileNavLink to="/" icon={<Home size={18} />} label="HOME" onClick={toggleMobileMenu} />
          <MobileNavLink to="/products" icon={<Package size={18} />} label="PRODUCTS" onClick={toggleMobileMenu} />
          <MobileNavLink to="/about" icon={<Info size={18} />} label="ABOUT" onClick={toggleMobileMenu} />
          <MobileNavLink to="/contact" icon={<Phone size={18} />} label="CONTACT" onClick={toggleMobileMenu} />
          <Button asChild className="w-full bg-glam-purple hover:bg-glam-purple-dark transition-colors duration-300">
            <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <Link 
    to={to} 
    className="custom-link flex items-center space-x-1 text-sm font-medium"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ 
  to, 
  icon, 
  label, 
  onClick 
}: { 
  to: string; 
  icon: React.ReactNode; 
  label: string;
  onClick: () => void;
}) => (
  <Link 
    to={to} 
    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
    onClick={onClick}
  >
    <span className="text-glam-purple">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default Header;
