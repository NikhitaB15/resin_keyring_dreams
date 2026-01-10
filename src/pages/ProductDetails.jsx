import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export const ProductDetails = () => {
    const { id } = useParams();
    const { products, toggleWishlist, wishlist, trackProductView, showToast } = useStore();

    const product = products.find(p => p.id === parseInt(id) || p.id === id);
    const isWishlisted = product ? wishlist.includes(product.id) : false;

    // Track product view
    useEffect(() => {
        if (product) {
            trackProductView(product.id);
        }
    }, [product?.id]);

    const handleWishlist = () => {
        toggleWishlist(product.id);
        const action = !isWishlisted ? 'Added to' : 'Removed from';
        showToast(`${action} Wishlist`, !isWishlisted ? 'success' : 'info');
    };

    const handleAddToCart = () => {
        showToast('Added to Cart! (Demo)', 'success');
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <Link to="/shop" className="btn">Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.7 }}>
                <ArrowLeft size={20} /> Back to Shop
            </Link>

            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 400px' }}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow)' }}
                    />
                </div>

                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                        {product.category}
                    </span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.title}</h1>

                    <h2 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>${parseFloat(product.price).toFixed(2)}</h2>

                    <p style={{ lineHeight: '1.8', marginBottom: '3rem', fontSize: '1.1rem', opacity: 0.9 }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={handleAddToCart} className="btn" style={{ flex: 1, fontSize: '1.1rem', justifyContent: 'center' }}>
                            <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart (Demo)
                        </button>
                        <button
                            onClick={handleWishlist}
                            className="btn btn-secondary"
                            style={{ width: '60px', justifyContent: 'center', padding: '0', background: isWishlisted ? '#ffebeb' : 'transparent', borderColor: isWishlisted ? '#ff6b6b' : 'var(--text)' }}
                        >
                            <Heart fill={isWishlisted ? '#ff6b6b' : 'none'} color={isWishlisted ? '#ff6b6b' : 'currentColor'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
