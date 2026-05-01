import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, Home, BookOpen, History, LogIn, LogOut, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2 }
    );
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Resources', path: '/resources', icon: Calendar },
    { name: 'History', path: '/history', icon: History },
    { name: 'Share', path: '/share', icon: Upload },
    isAuthenticated
      ? { name: 'Logout', action: handleLogout, icon: LogOut }
      : { name: 'Login', path: '/login', icon: LogIn },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="nav-item flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ResourceHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              link.action ? (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="nav-item px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <link.icon size={18} />
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-item px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    location.pathname === link.path
                      ? 'bg-accent-purple/20 text-accent-purple'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden nav-item p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.action ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      link.action();
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <link.icon size={20} />
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${
                      location.pathname === link.path
                        ? 'bg-accent-purple/20 text-accent-purple'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <link.icon size={20} />
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

