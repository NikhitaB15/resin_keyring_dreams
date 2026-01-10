import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart } from 'lucide-react';
import ImageWithLoader from './ImageWithLoader';

const ProductCard = ({ product }) => {
    const { wishlist, toggleWishlist, showToast } = useStore();
    const isWishlisted = wishlist.includes(product.id);

    const handleWishlist = () => {
        toggleWishlist(product.id);
        const action = !isWishlisted ? 'Added to' : 'Removed from';
        showToast(`${action} Wishlist`, !isWishlisted ? 'success' : 'info');
    };

    return (
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', position: 'relative', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/product/${product.id}`} style={{ display: 'block', height: '300px', overflow: 'hidden' }}>
                {product.originalPrice && <span className="sale-badge">Sale</span>}
                import ImageWithLoader from './ImageWithLoader';
                // ... inside component
                <Link to={`/product/${product.id}`} style={{ display: 'block', height: '300px', overflow: 'hidden' }}>
                    {product.originalPrice && <span className="sale-badge">Sale</span>}
                    <ImageWithLoader
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', height: '100%' }}
                        className="product-img"
                    />
                </Link>

                <button
                    onClick={handleWishlist}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(255,255,255,0.8)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    <Heart size={20} fill={isWishlisted ? '#ff6b6b' : 'none'} color={isWishlisted ? '#ff6b6b' : '#333'} />
                </button>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-light)' }}>
                            {product.category}
                        </span>
                        <Link to={`/product/${product.id}`}>
                            <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{product.title}</h3>
                        </Link>
                    </div>
                    <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        {product.originalPrice && (
                            <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '0.9rem' }}>
                                ₹{product.originalPrice}
                            </span>
                        )}
                        <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text)' }}>
                            ₹{parseFloat(product.price).toFixed(2)}
                        </span>
                    </div>
                </div>
                <style>{`
        .product-img:hover { transform: scale(1.1); }
      `}</style>
        </div>
    );
};

export default ProductCard;
