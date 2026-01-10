import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

const RelatedProducts = ({ currentProduct }) => {
    const { products } = useStore();

    const related = useMemo(() => {
        if (!currentProduct) return [];

        // Filter by same category, excluding current product
        const sameCategory = products.filter(p =>
            p.category === currentProduct.category && p.id !== currentProduct.id
        );

        // Shuffle and take 3
        const shuffled = [...sameCategory].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, [currentProduct, products]);

    if (related.length === 0) return null;

    return (
        <div style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-accent)', color: 'var(--primary)' }}>You Might Also Like</h3>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {related.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
