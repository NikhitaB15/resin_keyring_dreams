import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart, User, ShoppingBag, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { wishlist, isAdmin, logoutAdmin, cart, setIsCartOpen } = useStore();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => {
        const currentPath = location.pathname + decodeURIComponent(location.search);
        // If the link has a query param, exact match including query
        if (path.includes('?')) {
            return currentPath === path ? 'active' : '';
        }
        // Otherwise, match just the pathname (for Home, Shop main page, etc)
        // Ensure we don't match '/shop' when we are actually at '/shop?category=...' unless it's strictly intended.
        // But for standard nav behavior, usually highlighting 'Shop' is fine if we are in a sub-category.
        // However, the user specifically wants the sub-links to work.
        // So let's do exact match for simplicity or check if it starts with checking strict equality
        return location.pathname === path && location.search === '' ? 'active' : '';
    };

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'rgba(255, 247, 242, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(246, 193, 204, 0.2)',
            boxShadow: '0 4px 20px rgba(231, 161, 176, 0.08)',
            padding: '1rem 5%', // Responsive padding
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '2rem',
                fontWeight: '400',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary)',
                transition: 'transform 0.3s ease'
            }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <span style={{ fontSize: '1.8rem' }}>✨</span> Resin Dreams
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links-desktop">
                <Link to="/" className={isActive('/')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    transition: 'color 0.3s ease'
                }}>Home</Link>
                <Link to="/shop" className={isActive('/shop')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    transition: 'color 0.3s ease'
                }}>Shop</Link>
                <Link to="/shop?category=Valentine's Day" className={isActive('/shop?category=Valentine\'s Day')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    transition: 'color 0.3s ease'
                }}>Valentine's Day</Link>
                <Link to="/shop?category=Beach" className={isActive('/shop?category=Beach')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    transition: 'color 0.3s ease'
                }}>Beach</Link>

                {isAdmin && (
                    <Link to="/admin" className={isActive('/admin')} style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        letterSpacing: '0.5px',
                        color: 'var(--primary)',
                        position: 'relative',
                        transition: 'color 0.3s ease'
                    }}>Dashboard</Link>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/wishlist" className="btn-icon" style={{ position: 'relative' }}>
                    <Heart size={24} color={wishlist.length > 0 ? 'var(--primary)' : 'currentColor'} fill={wishlist.length > 0 ? 'var(--primary)' : 'none'} />
                    {wishlist.length > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'var(--accent)',
                            color: '#fff',
                            fontSize: '0.7rem',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>{wishlist.length}</span>
                    )}
                </Link>

                <button
                    className="btn-icon"
                    onClick={() => setIsCartOpen(true)}
                    style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}
                >
                    <ShoppingBag size={24} />
                    {cart.length > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'var(--accent)',
                            color: '#fff',
                            fontSize: '0.7rem',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>{cart.length}</span>
                    )}
                </button>

                {isAdmin ? (
                    <button onClick={logoutAdmin} className="btn-secondary" style={{ padding: '0.5rem' }} title="Logout">
                        <LogOut size={20} />
                    </button>
                ) : (
                    <Link to="/login" title="Admin Login">
                        <User size={24} />
                    </Link>
                )}

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu-container ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" className={isActive('/')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px'
                }}>Home</Link>
                <Link to="/shop" className={isActive('/shop')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px'
                }}>Shop</Link>
                <Link to="/shop?category=Valentine's Day" className={isActive('/shop?category=Valentine\'s Day')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px'
                }}>Valentine's Day</Link>
                <Link to="/shop?category=Beach" className={isActive('/shop?category=Beach')} style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px'
                }}>Beach</Link>
                {isAdmin && (
                    <Link to="/admin" className={isActive('/admin')} style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                        letterSpacing: '0.5px',
                        color: 'var(--primary)'
                    }}>Dashboard</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
