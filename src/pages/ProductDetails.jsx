import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import RelatedProducts from '../components/RelatedProducts';
import ImageWithLoader from '../components/ImageWithLoader';



export const ProductDetails = () => {
    const { id } = useParams();
    const { products, toggleWishlist, wishlist, trackProductView, addToCart, cart, generateOrderMessage, showToast } = useStore();

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
        addToCart(product);
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
                    <ImageWithLoader
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow)', aspectRatio: '1/1' }}
                    />
                </div>

                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                        {product.category}
                    </span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.title}</h1>

                    <h2 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>₹{parseFloat(product.price).toFixed(2)}</h2>

                    <p style={{ lineHeight: '1.8', marginBottom: '3rem', fontSize: '1.1rem', opacity: 0.9 }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button onClick={handleAddToCart} className="btn" style={{ flex: 1, minWidth: '160px', fontSize: '1.1rem', justifyContent: 'center' }}>
                            <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart
                        </button>

                        <button
                            onClick={() => {
                                // 1. Calculate what the cart WILL look like (Optimistic)
                                // We do this because setState is async
                                const existingItem = cart.find(item => item.id === product.id);
                                let nextCart;
                                if (existingItem) {
                                    nextCart = cart.map(item =>
                                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                                    );
                                } else {
                                    nextCart = [...cart, { ...product, quantity: 1 }];
                                }

                                // 2. Generate Message
                                const message = generateOrderMessage(nextCart);
                                navigator.clipboard.writeText(message);

                                // 3. Update Real Cart State (Silently, don't open sidebar)
                                addToCart(product, false);

                                // 4. Go to Insta
                                window.open(`https://ig.me/m/resin_keyring_dreams`, '_blank');
                                showToast('Order details copied! Paste in chat.', 'success');
                            }}
                            className="btn"
                            style={{
                                flex: 1,
                                minWidth: '160px',
                                fontSize: '1.1rem',
                                justifyContent: 'center',
                                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                border: 'none',
                                color: 'white'
                            }}
                        >
                            <span style={{ marginRight: '0.5rem' }}>📸</span> Order on Insta
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

            <RelatedProducts currentProduct={product} />
        </div>
    );
};
