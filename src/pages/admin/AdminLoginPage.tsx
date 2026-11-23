import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // If live Supabase configured, attempt Supabase Auth
      if (isSupabaseConfigured && supabase) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (authError) {
          throw authError;
        }

        if (data.user) {
          localStorage.setItem('dotpic_admin_auth', JSON.stringify({
            email: data.user.email,
            role: 'owner',
            token: data.session?.access_token
          }));
          navigate('/admin');
          return;
        }
      }

      // Default Studio Admin Passcode check
      // Allows immediate access for owner: admin@dotpic.com / dotpic2026
      if (
        (email.trim().toLowerCase() === 'admin@dotpic.com' && password === 'dotpic2026') ||
        (password === 'dotpic2026')
      ) {
        localStorage.setItem('dotpic_admin_auth', JSON.stringify({
          email: email || 'admin@dotpic.com',
          role: 'owner',
          token: 'dotpic_session_' + Date.now()
        }));
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. (Default demo login: admin@dotpic.com / dotpic2026)');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dotpic-black text-dotpic-white flex flex-col justify-center items-center p-4 relative">
      <Link
        to="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-dotpic-muted hover:text-dotpic-gold transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Public Website</span>
      </Link>

      <div className="max-w-md w-full bg-dotpic-charcoal border border-dotpic-border p-8 rounded-sm shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-dotpic-gold/10 border border-dotpic-gold/30 text-dotpic-gold flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block mb-1">
            STUDIO MANAGEMENT CONSOLE
          </span>
          <h2 className="text-2xl font-serif text-white">DOTPIC Admin Portal</h2>
          <p className="text-xs text-dotpic-muted mt-1">Sign in with owner or editor credentials.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Studio Email *</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dotpic.com"
            />
          </div>

          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Passcode / Key *</label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              icon={<KeyRound className="w-4 h-4 text-dotpic-black" />}
            >
              Sign In to Management Platform
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-dotpic-border text-center text-xs text-dotpic-muted space-y-2">
          <p className="text-[11px] font-mono text-dotpic-muted/70">
            Owner Credentials: <span className="text-teal-400">admin@dotpic.com</span> / <span className="text-teal-400">dotpic2026</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@dotpic.com');
              setPassword('dotpic2026');
            }}
            className="text-[11px] font-orbitron text-teal-400 hover:text-teal-300 underline tracking-wider"
          >
            Click to Auto-Fill Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
