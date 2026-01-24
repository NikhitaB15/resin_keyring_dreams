import React, { useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithLoader from './ImageWithLoader';


const CartSidebar = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal,
        showToast,
        shippingData,
        detectLocation,
        updatePincode
    } = useStore();

    const sidebarRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isCartOpen) {
                setIsCartOpen(false);
            }
        };

        if (isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, setIsCartOpen]);

    const handleCheckout = () => {
        showToast('Processing Checkout... (Demo)', 'success');
        setTimeout(() => {
            setIsCartOpen(false);
        }, 1500);
    };

    return (
        <>
            {/* Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(2px)',
                zIndex: 2000,
                opacity: isCartOpen ? 1 : 0,
                pointerEvents: isCartOpen ? 'auto' : 'none',
                transition: 'opacity 0.3s ease'
            }} />

            {/* Sidebar */}
            <div ref={sidebarRef} style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '400px',
                background: 'var(--surface)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                zIndex: 2001,
                transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Your Bag <span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 400 }}>({cart.length} items)</span>
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', paddingTop: '4rem', opacity: 0.5 }}>
                            <ShoppingBag size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                            <p>Your shopping bag is empty.</p>
                            <button onClick={() => setIsCartOpen(false)} className="btn" style={{ marginTop: '1rem' }}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                    <ImageWithLoader src={item.image} alt={item.title} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{item.title}</h4>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', color: '#ff6b6b', opacity: 0.7 }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        {item.category}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #eee', borderRadius: '4px', padding: '2px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {/* Footer */}
                {cart.length > 0 && (
                    <div style={{ padding: '1.5rem', background: 'var(--bg)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>

                        {/* Shipping Calculator */}
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>Shipping Estimate</label>
                                <button
                                    onClick={detectLocation}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    {shippingData.loading ? 'Detecting...' : '📍 Detect Location'}
                                </button>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    value={shippingData.pincode}
                                    onChange={(e) => updatePincode(e.target.value)}
                                    maxLength={6}
                                    style={{ margin: 0, padding: '0.5rem', fontSize: '0.9rem' }}
                                />
                            </div>
                            {shippingData.city && (
                                <p style={{ fontSize: '0.8rem', color: 'green', margin: '0.5rem 0 0' }}>Delivering to: {shippingData.city}</p>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '1rem', color: 'var(--text-light)' }}>
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-light)' }}>
                            <span>Shipping {shippingData.pincode ? `(${shippingData.shippingCost === 60 ? 'Metro' : 'Standard'})` : ''}</span>
                            <span>
                                {cartTotal > 999
                                    ? <span style={{ color: 'green' }}>FREE</span>
                                    : (shippingData.pincode ? `₹${shippingData.shippingCost.toFixed(2)}` : 'Enter Pincode')}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>
                            <span>Total</span>
                            <span>₹{(cartTotal + (cartTotal > 999 ? 0 : (shippingData.pincode ? shippingData.shippingCost : 0))).toFixed(2)}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', textAlign: 'center', marginBottom: '1rem' }}>
                            {cartTotal > 999 ? 'Free shipping applied!' : 'Add items worth ₹' + (1000 - cartTotal).toFixed(0) + ' more for free shipping.'}
                        </p>
                        <button
                            onClick={() => {
                                const message = generateOrderMessage();
                                navigator.clipboard.writeText(message);
                                window.open(`https://ig.me/m/resin_keyring_dreams`, '_blank');
                            }}
                            className="btn"
                            style={{ width: '100%', justifyContent: 'center', padding: '1rem', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', border: 'none' }}
                        >
                            Order via Instagram
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
