import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock, Mail } from 'lucide-react';
import Footer from '../components/Footer';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginAdmin } = useStore();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (loginAdmin(email, password)) {
            navigate('/admin');
        } else {
            setError('Invalid email or password');
            // Clear password field on error
            setPassword('');
        }
    };

    return (
        <>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '2rem' }}>
                <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        boxShadow: '0 4px 15px rgba(231, 161, 176, 0.3)'
                    }}>
                        <Lock color="white" size={32} />
                    </div>

                    <h2 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-accent)', fontSize: '2.5rem', color: 'var(--primary)' }}>Admin Access</h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontFamily: 'var(--font-main)' }}>
                        Enter your credentials to access the dashboard
                    </p>

                    <form onSubmit={handleLogin}>
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <Mail size={20} color="var(--accent)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    paddingLeft: '3rem',
                                    width: '100%',
                                    fontFamily: 'var(--font-ui)'
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                            <Lock size={20} color="var(--accent)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    paddingLeft: '3rem',
                                    width: '100%',
                                    fontFamily: 'var(--font-ui)'
                                }}
                            />
                        </div>

                        {error && (
                            <div style={{
                                background: 'rgba(231, 76, 60, 0.1)',
                                border: '1px solid rgba(231, 76, 60, 0.3)',
                                borderRadius: '4px',
                                padding: '0.75rem',
                                marginBottom: '1rem',
                                color: '#e74c3c'
                            }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn" style={{
                            width: '100%',
                            justifyContent: 'center',
                            marginTop: '1rem',
                            background: 'var(--primary)',
                            borderColor: 'var(--primary)',
                            color: 'white',
                            fontSize: '1rem',
                            padding: '1rem'
                        }}>
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};
