import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export const Wishlist = () => {
    const { getWishlistProducts } = useStore();
    const wishlistProducts = getWishlistProducts();

    return (
        <>
            <div className="container" style={{ margin: '4rem auto' }}>
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Your Wishlist</h1>

                {wishlistProducts.length > 0 ? (
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {wishlistProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
                        <h3>Your wishlist is empty</h3>
                        <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>Save items you love to find them easily later.</p>
                        <Link to="/shop" className="btn">Continue Shopping</Link>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};
