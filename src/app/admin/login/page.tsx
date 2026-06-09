'use client';
import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const router = useRouter();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch allowed admin emails securely from environment variables
  const ALLOWED_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If already logged in, bypass immediately
        if (user.email && !ALLOWED_EMAILS.includes(user.email)) {
          await signOut(auth);
          setError('Unauthorized access. Your email is not whitelisted for Admin access.');
          setLoading(false);
          return;
        }
        router.push('/admin');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router, ALLOWED_EMAILS]);

  const handleSecretClick = () => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current === 3) {
      setShowLogin(true);
      clickCountRef.current = 0;
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 2000);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message || 'Google Sign-In failed');
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"></div>;

  if (!showLogin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium border-r border-gray-600 pr-6 mr-6 py-2 tracking-widest">404</h1>
          <h2 className="text-sm font-normal text-gray-200">
            This page <span onClick={handleSecretClick} className="cursor-text select-text" style={{ cursor: 'text' }}>could</span> not be found.
          </h2>
        </div>
      </div>
    );
  }

  // Fade-in login screen
  return (
    <div className="min-h-screen bg-[#020510] flex flex-col items-center justify-center p-4 font-sans text-white selection:bg-[#0d9488]/30 animate-fade-in">

      <div className="w-full max-w-md bg-[#0a1128] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-gray-800 bg-[#060b1f]">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white border border-gray-600 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <i className="fa-solid fa-shield-halved text-xl"></i>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white font-heading tracking-tight">Command Center</h1>
          <p className="text-gray-400 text-center text-sm mt-1">Authorized Agency Personnel Only</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
              <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Identity</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020510] border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white font-medium focus:outline-none focus:border-[#0d9488] transition-colors placeholder-gray-600"
                  placeholder="admin@devzilla.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Access Key</label>
              <div className="relative">
                <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020510] border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white font-medium focus:outline-none focus:border-[#0d9488] transition-colors placeholder-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e293b] hover:bg-[#334155] text-white border border-gray-700 py-3.5 rounded-xl font-bold transition-all mt-4 flex items-center justify-center gap-2"
            >
              Initialize Override <i className="fa-solid fa-arrow-right-to-bracket text-sm opacity-70"></i>
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-[1px] bg-gray-800 flex-1"></div>
            <span className="text-gray-500 text-xs font-bold uppercase">Or Secure Access Via</span>
            <div className="h-[1px] bg-gray-800 flex-1"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <i className="fa-brands fa-google text-blue-600"></i> Continue with Google
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-600 font-mono">
        <p>DevZilla Agency OS v2.0</p>
        <p>Secured via Firebase Gateway</p>
      </div>

    </div>
  );
}
