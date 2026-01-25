import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PersonalizationSection from '../components/PersonalizationSection';
import Footer from '../components/Footer';

export const Home = () => {
    const { products, trackPageVisit } = useStore();

    // Filter rose petal products for Valentine section
    const valentineProducts = products.filter(p =>
        p.title.toLowerCase().includes('rose') ||
        p.title.toLowerCase().includes('petal') ||
        p.description.toLowerCase().includes('rose')
    );

    // Track page visit
    useEffect(() => {
        trackPageVisit();
    }, []);

    return (
        <div>
            {/* Hero */}
            <div style={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                padding: '2rem',
                background: 'radial-gradient(circle at 30% 50%, rgba(246, 193, 204, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(201, 162, 77, 0.1) 0%, transparent 50%)'
            }}>
                <div style={{
                    maxWidth: '900px',
                    animation: 'fadeIn 1.2s ease-out',
                    padding: '0 2rem'
                }}>
                    <h1 style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: 'clamp(3rem, 8vw, 5rem)',
                        marginBottom: '1.5rem',
                        color: 'var(--primary)',
                        lineHeight: 1.2,
                        animation: 'slideInFromLeft 0.8s ease-out'
                    }}>
                        Resin Dreams
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                        color: 'var(--text)',
                        marginBottom: '3rem',
                        lineHeight: '1.8',
                        fontFamily: 'var(--font-main)',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        animation: 'slideInFromRight 0.8s ease-out 0.2s backwards'
                    }}>
                        Handcrafted resin keyrings, earrings, and jewellery. <br />
                        Each piece captures nature's beauty in crystal-clear perfection.
                    </p>
                    <Link to="/shop" className="btn" style={{
                        fontSize: '1rem',
                        padding: '1.2rem 3rem',
                        animation: 'fadeIn 1s ease-out 0.4s backwards',
                        display: 'inline-flex'
                    }}>
                        Explore Collection <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Personalization Section */}
            <PersonalizationSection />

            {/* Valentine's Special Section */}
            <section style={{
                padding: '5rem 2rem',
                background: 'linear-gradient(180deg, rgba(246, 193, 204, 0.08) 0%, rgba(255, 247, 242, 1) 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative hearts */}
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '5%',
                    opacity: 0.1,
                    animation: 'float 6s ease-in-out infinite'
                }}>
                    <Heart size={80} fill="var(--primary)" color="var(--primary)" />
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '3rem',
                    left: '8%',
                    opacity: 0.08,
                    animation: 'float 8s ease-in-out infinite 1s'
                }}>
                    <Sparkles size={60} color="var(--accent)" />
                </div>

                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {/* Section Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.9rem',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: 'var(--accent)',
                            fontWeight: 500
                        }}>
                            Limited Edition
                        </span>
                        <h2 style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            color: 'var(--primary)',
                            margin: '1rem 0',
                            lineHeight: 1.2
                        }}>
                            Valentine's Special 💕
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            fontFamily: 'var(--font-main)'
                        }}>
                            Celebrate love with our exclusive rose petal collection. Each piece is handcrafted with real rose petals,
                            preserved forever in crystal-clear resin.
                        </p>
                    </div>

                    {/* Valentine Products Grid */}
                    {valentineProducts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2rem',
                            marginBottom: '3rem'
                        }}>
                            {valentineProducts.map(product => (
                                <div key={product.id} style={{ animation: 'fadeIn 0.8s ease-out' }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-light)', fontStyle: 'italic' }}>
                            Coming soon! Check back for our Valentine's collection.
                        </p>
                    )}

                    {/* CTA */}
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/shop" className="btn" style={{
                            fontSize: '1rem',
                            padding: '1.2rem 3rem',
                            display: 'inline-flex',
                            background: 'var(--primary)',
                            borderColor: 'var(--primary)',
                            color: 'white'
                        }}>
                            View All Valentine Gifts <Heart size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};
