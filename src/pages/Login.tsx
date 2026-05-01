/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/AuthServices';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/map', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      navigate('/map', { replace: true });
    } catch (err) {
      setError('Email o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-cyan-400">Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-cyan-400 text-sm font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="block text-cyan-400 text-sm font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Cargando...' : 'Login'}
            </button>
          </form>

          <div className="text-right">
            <p className="text-cyan-400 text-sm">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="hover:text-cyan-300 transition">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}