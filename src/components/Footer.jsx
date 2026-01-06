import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: 'linear-gradient(135deg, rgba(246, 193, 204, 0.1) 0%, rgba(255, 247, 242, 1) 100%)',
            borderTop: '1px solid rgba(231, 161, 176, 0.2)',
            padding: '4rem 2rem 2rem',
            marginTop: '4rem'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '3rem'
                }}>
                    {/* Brand Section */}
                    <div>
                        <h3 style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '2rem',
                            color: 'var(--primary)',
                            marginBottom: '1rem'
                        }}>
                            ✨ Resin Dreams
                        </h3>
                        <p style={{
                            color: 'var(--text-light)',
                            lineHeight: '1.6',
                            marginBottom: '1.5rem'
                        }}>
                            Handcrafted resin jewelry capturing nature's beauty in every piece.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="https://www.instagram.com/resin_keyring_dreams?utm_source=qr&igsh=MXI1a2ZveGRscGlyMg==" target="_blank" rel="noopener noreferrer"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--secondary)'}
                            >
                                <Instagram size={20} color="white" />
                            </a>
                            <a href="mailto:nikhitabhatt153@gmail.com"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--secondary)'}
                            >
                                <Mail size={20} color="white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '1.1rem',
                            marginBottom: '1.5rem',
                            color: 'var(--text)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Quick Links
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/shop', label: 'Shop All' },
                                { to: '/wishlist', label: 'Wishlist' }
                            ].map(link => (
                                <li key={link.to} style={{ marginBottom: '0.75rem' }}>
                                    <Link to={link.to} style={{
                                        color: 'var(--text-light)',
                                        transition: 'color 0.3s ease',
                                        fontFamily: 'var(--font-main)'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Collections */}
                    <div>
                        <h4 style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '1.1rem',
                            marginBottom: '1.5rem',
                            color: 'var(--text)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Collections
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Keyrings', 'Earrings', 'Necklaces', 'Valentine Special'].map(cat => (
                                <li key={cat} style={{ marginBottom: '0.75rem' }}>
                                    <Link to="/shop" style={{
                                        color: 'var(--text-light)',
                                        transition: 'color 0.3s ease',
                                        fontFamily: 'var(--font-main)'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-light)'}
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '1.1rem',
                            marginBottom: '1.5rem',
                            color: 'var(--text)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Get in Touch
                        </h4>
                        <div style={{ color: 'var(--text-light)', fontFamily: 'var(--font-main)' }}>
                            <p style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} color="var(--accent)" />
                                nikhitabhatt153@gmail.com
                            </p>

                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(231, 161, 176, 0.15)',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    color: 'var(--text-light)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.9rem'
                }}>
                    <p style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        Made with <Heart size={16} fill="var(--primary)" color="var(--primary)" /> by Resin Dreams © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
