import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

import { Search } from 'lucide-react';

export const Shop = () => {
    const { products, categories, loading } = useStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All';
    const [searchQuery, setSearchQuery] = useState('');

    if (loading) {
        return (
            <>
                <div className="container" style={{ margin: '4rem auto', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="pulsing-heart">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                    <p style={{ marginTop: '1.5rem', fontFamily: 'var(--font-accent)', fontSize: '1.8rem', color: 'var(--primary)', letterSpacing: '1px' }}>Polishing the resin...</p>
                    <style>{`
                        .pulsing-heart {
                            animation: heartbeat 1.5s ease-in-out infinite both;
                        }
                        @keyframes heartbeat {
                            0% { transform: scale(1); opacity: 1; }
                            50% { transform: scale(1.2); opacity: 0.8; }
                            100% { transform: scale(1); opacity: 1; }
                        }
                    `}</style>
                </div>
                <Footer />
            </>
        );
    }

    const handleCategoryChange = (category) => {
        if (category === 'All') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category });
        }
    };

    const filteredProducts = products.filter(p => {
        // Parse tags: if it's a string (from DB/CSV), split it. If array, use as is.
        let productTags = [];
        if (Array.isArray(p.tags)) {
            productTags = p.tags;
        } else if (typeof p.tags === 'string') {
            // Remove { } or [ ] if present (common Supabase format artifacts) and clean quotes
            const cleanTags = p.tags.replace(/[{}"\[\]]/g, '');
            productTags = cleanTags.split(',').map(t => t.trim()).filter(Boolean);
        }

        console.log(`Product: ${p.title}, Category: ${p.category}, Tags:`, productTags); // Debugging

        const matchesCategory = activeCategory === 'All' ||
            p.category === activeCategory ||
            productTags.includes(activeCategory);

        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <div className="container" style={{ margin: '4rem auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ marginBottom: '2rem' }}>Our Collection</h1>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', width: '100%', maxWidth: '500px', marginBottom: '2rem' }}>
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input
                            type="text"
                            placeholder="Search for keyrings, earrings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                paddingLeft: '3rem',
                                marginBottom: 0,
                                borderRadius: '50px',
                                background: 'white',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}
                        />
                    </div>

                    {/* Category Filters */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            className={`btn ${activeCategory === 'All' ? '' : 'btn-secondary'}`}
                            onClick={() => handleCategoryChange('All')}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`btn ${activeCategory === cat ? '' : 'btn-secondary'}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
                        <h3>Coming Soon...</h3>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};
