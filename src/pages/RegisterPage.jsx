import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const result = await register(form.name, form.email, form.password);
      
      if (!result.success) {
        setError(result.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      const nextPath = location.state?.from?.pathname || '/';
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError('Server error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center" style={{ background: 'transparent' }}>
      <div ref={formRef} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create <span className="gradient-text">Account</span></h1>
          <p className="text-slate-400">Join ResourceHub today</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-background-secondary rounded-2xl p-8 space-y-5">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <Input label="Full Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} icon={User} required />
          <Input label="Email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} icon={Mail} required />
          <Input label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} icon={Lock} required />
          <Input label="Confirm Password" name="confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={handleChange} icon={Lock} required />
          <Button type="submit" variant="primary" className="w-full py-4" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
          <p className="text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-purple hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
