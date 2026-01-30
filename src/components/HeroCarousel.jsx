import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            type: 'brand',
            title: 'Resin Dreams',
            subtitle: 'Handcrafted resin keyrings, earrings, and jewellery.',
            description: 'Each piece captures nature\'s beauty in crystal-clear perfection.',
            cta: 'Explore Collection',
            ctaLink: '/shop',
            ctaIcon: <ArrowRight size={20} />,
            backgroundImage: '/brand_hero_bg.jpg',
            background: 'radial-gradient(circle at 30% 50%, rgba(246, 193, 204, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(201, 162, 77, 0.1) 0%, transparent 50%)'
        },
        {
            id: 2,
            type: 'personalization',
            title: 'Personalized Photo Keyrings',
            subtitle: 'Make It Personal 📸',
            description: 'Carry your cherished memories wherever you go! Custom resin keyrings with your Instax photos preserved forever.',
            price: '₹300',
            priceNote: 'Keyring + Instax Photo Frame',
            cta: 'Contact Us on Instagram',
            ctaLink: 'https://www.instagram.com/resin_keyring_dreams/',
            ctaIcon: <Camera size={20} />,
            ctaExternal: true,
            image: '/products/personalization_designs.jpeg',
            background: 'linear-gradient(135deg, rgba(201, 162, 77, 0.08) 0%, rgba(246, 193, 204, 0.12) 100%)'
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume auto-play after 10 seconds of manual interaction
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    const slide = slides[currentSlide];

    return (
        <div style={{
            margin: '1.5rem auto',
            maxWidth: '1400px',
            width: 'calc(100% - 2rem)',
            minHeight: '85vh',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '32px',
            background: slide.backgroundImage
                ? `url(${slide.backgroundImage}) center center / cover no-repeat`
                : slide.background,
            transition: 'all 0.8s ease',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)'
        }}>
            {/* Background overlay for text readability */}
            {slide.backgroundImage && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255, 247, 242, 0.85), rgba(255, 247, 242, 0.75))',
                    zIndex: 0
                }} />
            )}
            <div style={{
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
            }}>
                {slide.type === 'brand' ? (
                    // Brand Slide
                    <div style={{
                        maxWidth: '900px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.8s ease-out',
                        padding: '0 2rem'
                    }}>
                        <h1 style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
                            marginBottom: '1.5rem',
                            color: 'var(--primary)',
                            lineHeight: 1.1,
                            animation: 'slideInFromLeft 0.8s ease-out',
                            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)'
                        }}>
                            {slide.title}
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                            color: '#6b5555',
                            marginBottom: '1rem',
                            lineHeight: '1.6',
                            fontFamily: 'var(--font-ui)',
                            maxWidth: '700px',
                            margin: '0 auto 1rem',
                            animation: 'slideInFromRight 0.8s ease-out 0.2s backwards',
                            fontWeight: 500,
                            letterSpacing: '0.5px'
                        }}>
                            {slide.subtitle}
                        </p>
                        <p style={{
                            fontSize: 'clamp(1rem, 1.9vw, 1.2rem)',
                            color: '#7a6a6a',
                            marginBottom: '3rem',
                            lineHeight: '1.8',
                            fontFamily: 'var(--font-main)',
                            maxWidth: '650px',
                            margin: '0 auto 3rem',
                            animation: 'slideInFromRight 0.8s ease-out 0.3s backwards',
                            fontStyle: 'italic'
                        }}>
                            {slide.description}
                        </p>
                        <Link to={slide.ctaLink} className="btn" style={{
                            fontSize: '1rem',
                            padding: '1.2rem 3rem',
                            animation: 'fadeIn 1s ease-out 0.4s backwards',
                            display: 'inline-flex',
                            gap: '0.5rem'
                        }}>
                            {slide.cta} {slide.ctaIcon}
                        </Link>
                    </div>
                ) : (
                    // Personalization Slide
                    <div style={{
                        maxWidth: '1200px',
                        width: '100%',
                        animation: 'fadeIn 0.8s ease-out'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
                            gap: '3rem',
                            alignItems: 'center'
                        }}>
                            {/* Image Side */}
                            <div style={{
                                order: window.innerWidth < 768 ? 2 : 1,
                                animation: 'slideInFromLeft 0.8s ease-out',
                                position: 'relative' // Anchor for price badge
                            }}>
                                <div style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '6px',
                                        background: 'linear-gradient(90deg, var(--primary), var(--accent))'
                                    }} />

                                    <img
                                        src={slide.image}
                                        alt="Personalized photo keyrings"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '12px',
                                            display: 'block'
                                        }}
                                    />
                                </div>

                                {/* Floating price badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    right: '-15px',
                                    background: 'linear-gradient(135deg, var(--primary), #d4859c)',
                                    color: 'white',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    fontSize: '1.3rem',
                                    boxShadow: '0 10px 30px rgba(246, 193, 204, 0.5)',
                                    animation: 'pulse 2s ease-in-out infinite'
                                }}>
                                    {slide.price}
                                </div>
                            </div>

                            {/* Content Side */}
                            <div style={{
                                textAlign: 'center',
                                order: window.innerWidth < 768 ? 1 : 2,
                                animation: 'slideInFromRight 0.8s ease-out'
                            }}>
                                <span style={{
                                    fontFamily: 'var(--font-ui)',
                                    fontSize: '0.9rem',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    color: 'var(--accent)',
                                    fontWeight: 600
                                }}>
                                    {slide.subtitle}
                                </span>
                                <h1 style={{
                                    fontFamily: 'var(--font-accent)',
                                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                    color: 'var(--primary)',
                                    margin: '1rem 0',
                                    lineHeight: 1.2
                                }}>
                                    {slide.title}
                                </h1>
                                <p style={{
                                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                    color: 'var(--text)',
                                    marginBottom: '2rem',
                                    lineHeight: '1.8',
                                    fontFamily: 'var(--font-main)',
                                    maxWidth: '500px',
                                    margin: '0 auto 2rem'
                                }}>
                                    {slide.description}
                                </p>

                                {/* Quick Features */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    marginBottom: '2rem',
                                    textAlign: 'left',
                                    maxWidth: '400px',
                                    margin: '0 auto 2rem'
                                }}>
                                    {['🎨 Choose Your Design', '📷 Add Your Photo', '✨ Handcrafted Magic', '💝 Forever Keepsake'].map((feature, idx) => (
                                        <div key={idx} style={{
                                            padding: '0.8rem 1rem',
                                            background: 'rgba(255, 255, 255, 0.7)',
                                            borderRadius: '10px',
                                            fontSize: '1rem',
                                            color: 'var(--text-dark)',
                                            fontWeight: 500
                                        }}>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing Info */}
                                <div style={{
                                    background: 'rgba(246, 193, 204, 0.2)',
                                    border: '2px solid var(--primary)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    marginBottom: '2rem',
                                    maxWidth: '400px',
                                    margin: '0 auto 2rem'
                                }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontFamily: 'var(--font-accent)',
                                        color: 'var(--primary)',
                                        fontWeight: 'bold'
                                    }}>
                                        {slide.price}
                                    </div>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text)',
                                        margin: 0
                                    }}>
                                        {slide.priceNote}
                                    </p>
                                </div>

                                <a
                                    href={slide.ctaLink}
                                    target={slide.ctaExternal ? "_blank" : undefined}
                                    rel={slide.ctaExternal ? "noopener noreferrer" : undefined}
                                    className="btn"
                                    style={{
                                        fontSize: '1rem',
                                        padding: '1.2rem 3rem',
                                        display: 'inline-flex',
                                        gap: '0.5rem',
                                        background: 'var(--primary)',
                                        borderColor: 'var(--primary)',
                                        color: 'white'
                                    }}
                                >
                                    {slide.cta} {slide.ctaIcon}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                style={{
                    position: 'absolute',
                    left: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid var(--primary)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    zIndex: 10,
                    color: 'var(--primary)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next slide"
                style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid var(--primary)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    zIndex: 10,
                    color: 'var(--primary)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                <ChevronRight size={24} />
            </button>

            {/* Dot Indicators */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '1rem',
                zIndex: 10
            }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        style={{
                            width: currentSlide === index ? '40px' : '12px',
                            height: '12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: currentSlide === index ? 'var(--primary)' : 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: currentSlide === index ? '0 2px 8px rgba(246, 193, 204, 0.5)' : 'none'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
