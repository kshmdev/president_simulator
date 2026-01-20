import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateInputs = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateInputs()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password');
          } else {
            setError(error.message);
          }
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            setError('This email is already registered. Please sign in instead.');
          } else {
            setError(error.message);
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-6 sm:py-0" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-crimson/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-40 sm:w-96 h-40 sm:h-96 bg-navy-light/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-5xl sm:text-6xl mb-3 sm:mb-4 block">🦅</span>
          <h1 className="headline-display text-2xl sm:text-4xl text-gradient-gold mb-2">
            PRESIDENTIAL
          </h1>
          <p className="text-xs sm:text-base text-muted-foreground break-words">
            {isLogin ? 'Sign in to continue your campaign' : 'Create an account to save your progress'}
          </p>
        </div>

        {/* Form */}
        <div className="card-glass rounded-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 sm:py-3 bg-muted/50 border border-border rounded-lg text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 sm:py-3 bg-muted/50 border border-border rounded-lg text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg">
                <p className="text-xs sm:text-sm text-destructive break-words">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-presidential px-6 sm:px-8 py-2 sm:py-4 rounded-lg text-sm sm:text-lg uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-xs sm:text-base text-muted-foreground hover:text-foreground transition-colors break-words"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>

        {/* Back to game */}
        <div className="mt-4 sm:mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs sm:text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            ← Back to game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
