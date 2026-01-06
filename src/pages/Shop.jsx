import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export const Shop = () => {
    const { products, categories } = useStore();
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <>
            <div className="container" style={{ margin: '4rem auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ marginBottom: '2rem' }}>Our Collection</h1>

                    {/* Category Filters */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            className={`btn ${activeCategory === 'All' ? '' : 'btn-secondary'}`}
                            onClick={() => setActiveCategory('All')}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`btn ${activeCategory === cat ? '' : 'btn-secondary'}`}
                                onClick={() => setActiveCategory(cat)}
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
                        <h3>No products found in this category yet.</h3>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};
