import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ email });
    setIsLoading(false);
    const nextPath = location.state?.from?.pathname || '/';
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center" style={{ background: 'transparent' }}>
      <div ref={formRef} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome <span className="gradient-text">Back</span></h1>
          <p className="text-slate-400">Sign in to your ResourceHub account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-background-secondary rounded-2xl p-8 space-y-6">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <Input label="Email" name="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={Mail} required />
          <Input label="Password" name="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} icon={Lock} required />
          <Button type="submit" variant="primary" className="w-full py-4" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          <p className="text-center text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent-purple hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
