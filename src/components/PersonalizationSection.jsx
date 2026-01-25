import React from 'react';
import { Camera, Heart, Gift, Sparkles } from 'lucide-react';

const PersonalizationSection = () => {
    return (
        <section style={{
            padding: '6rem 2rem',
            background: 'linear-gradient(135deg, rgba(201, 162, 77, 0.05) 0%, rgba(246, 193, 204, 0.08) 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                opacity: 0.06,
                animation: 'float 8s ease-in-out infinite'
            }}>
                <Camera size={100} color="var(--accent)" />
            </div>
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '8%',
                opacity: 0.08,
                animation: 'float 10s ease-in-out infinite 2s'
            }}>
                <Sparkles size={80} color="var(--primary)" />
            </div>

            <div className="container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.95rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}>
                        <Gift size={18} /> Make It Personal
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        color: 'var(--primary)',
                        margin: '1rem 0',
                        lineHeight: 1.2
                    }}>
                        Personalized Photo Keyrings 📸
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: '1.8',
                        fontFamily: 'var(--font-main)'
                    }}>
                        Carry your cherished memories wherever you go! We create custom resin keyrings
                        with your favorite Instax photos beautifully preserved inside.
                    </p>
                </div>

                {/* Main Content - Two Column Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
                    gap: '3rem',
                    alignItems: 'center',
                    marginBottom: '3rem'
                }}>
                    {/* Image Side */}
                    <div style={{
                        position: 'relative',
                        animation: 'fadeIn 1s ease-out'
                    }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2rem',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Decorative gradient overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '6px',
                                background: 'linear-gradient(90deg, var(--primary), var(--accent))'
                            }} />

                            <img
                                src="/products/personalization_designs.jpeg"
                                alt="Personalized photo keyring with instax photo"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '12px',
                                    display: 'block'
                                }}
                                onError={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, rgba(246, 193, 204, 0.3), rgba(201, 162, 77, 0.2))';
                                    e.target.style.height = '400px';
                                    e.target.style.display = 'flex';
                                    e.target.style.alignItems = 'center';
                                    e.target.style.justifyContent = 'center';
                                    e.target.alt = '📸 Custom Photo Keyring';
                                }}
                            />
                        </div>

                        {/* Floating badge */}
                        <div style={{
                            position: 'absolute',
                            top: '-15px',
                            right: '-15px',
                            background: 'linear-gradient(135deg, var(--primary), #d4859c)',
                            color: 'white',
                            padding: '1rem 1.5rem',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            boxShadow: '0 10px 30px rgba(246, 193, 204, 0.4)',
                            animation: 'pulse 2s ease-in-out infinite',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Heart size={20} fill="white" /> ₹300
                        </div>
                    </div>

                    {/* Content Side */}
                    <div style={{ animation: 'fadeIn 1s ease-out 0.2s backwards' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                            color: 'var(--text-dark)',
                            marginBottom: '1.5rem'
                        }}>
                            How It Works
                        </h3>

                        {/* Features List */}
                        <div style={{ marginBottom: '2rem' }}>
                            {[
                                {
                                    icon: '🎨',
                                    title: 'Choose Your Design',
                                    desc: 'Select from our beautiful keyring designs or let us create a custom one for you'
                                },
                                {
                                    icon: '📷',
                                    title: 'Add Your Photo',
                                    desc: 'Bring your Instax photo or we can print one for you from your digital image'
                                },
                                {
                                    icon: '✨',
                                    title: 'Handcrafted Magic',
                                    desc: 'We carefully preserve your photo in crystal-clear resin with decorative elements'
                                },
                                {
                                    icon: '💝',
                                    title: 'Forever Keepsake',
                                    desc: 'Receive your personalized keyring - a memory that lasts forever!'
                                }
                            ].map((feature, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginBottom: '1.5rem',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.6)',
                                    borderRadius: '12px',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'default'
                                }}
                                    className="feature-item"
                                >
                                    <div style={{
                                        fontSize: '2rem',
                                        flexShrink: 0
                                    }}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 style={{
                                            fontFamily: 'var(--font-ui)',
                                            fontSize: '1.1rem',
                                            color: 'var(--text-dark)',
                                            marginBottom: '0.3rem',
                                            fontWeight: 600
                                        }}>
                                            {feature.title}
                                        </h4>
                                        <p style={{
                                            color: 'var(--text)',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6',
                                            margin: 0
                                        }}>
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pricing Card */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(246, 193, 204, 0.15), rgba(201, 162, 77, 0.1))',
                            border: '2px solid var(--primary)',
                            borderRadius: '16px',
                            padding: '2rem',
                            textAlign: 'center',
                            marginTop: '2rem'
                        }}>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '0.5rem',
                                fontWeight: 600
                            }}>
                                Complete Package
                            </p>
                            <div style={{
                                fontSize: '3rem',
                                fontFamily: 'var(--font-accent)',
                                color: 'var(--primary)',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}>
                                ₹300
                            </div>
                            <p style={{
                                color: 'var(--text)',
                                fontSize: '1rem',
                                margin: 0
                            }}>
                                Includes: Premium Keyring + Instax Photo Frame
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '3rem',
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '20px'
                }}>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-dark)',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-main)'
                    }}>
                        Ready to create your personalized keepsake?
                    </p>
                    <a
                        href="https://www.instagram.com/resin_keyring_dreams/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                            fontSize: '1.1rem',
                            padding: '1.2rem 3rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--primary)',
                            borderColor: 'var(--primary)',
                            color: 'white'
                        }}
                    >
                        <Camera size={22} /> Contact Us on Instagram
                    </a>
                </div>
            </div>

            {/* Add hover effect styles */}
            <style>{`
                .feature-item:hover {
                    transform: translateX(10px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
            `}</style>
        </section>
    );
};

export default PersonalizationSection;
