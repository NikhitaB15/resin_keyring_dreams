import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

import { Search } from 'lucide-react';

export const Shop = () => {
    const { products, categories } = useStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All';

    const handleCategoryChange = (category) => {
        if (category === 'All') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category });
        }
    };
    const [searchQuery, setSearchQuery] = useState('');

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
