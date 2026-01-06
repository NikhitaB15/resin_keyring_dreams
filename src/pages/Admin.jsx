import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Trash2, Edit2, GripVertical, X, Save, TrendingUp, Eye, Heart as HeartIcon, Users } from 'lucide-react';
import Footer from '../components/Footer';

export const Admin = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct, reorderProducts, addCategory, analytics } = useStore();

    // New Product State
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        originalPrice: '',
        category: categories[0],
        image: '',
        description: ''
    });

    // Edit Product State
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({});

    // New Category State
    const [newCategory, setNewCategory] = useState('');

    // Drag and Drop State
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.price) return;

        const productToAdd = {
            ...newProduct,
            price: parseFloat(newProduct.price),
            originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : null,
            image: newProduct.image || '/products/placeholder.jpg'
        };

        addProduct(productToAdd);
        setNewProduct({
            title: '',
            price: '',
            originalPrice: '',
            category: categories[0],
            image: '',
            description: ''
        });
        alert('Product Added Successfully! ✨');
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (newCategory) {
            addCategory(newCategory);
            setNewCategory('');
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product.id);
        setEditForm({ ...product });
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setEditForm({});
    };

    const saveEdit = () => {
        updateProduct(editingProduct, {
            ...editForm,
            price: parseFloat(editForm.price),
            originalPrice: editForm.originalPrice ? parseFloat(editForm.originalPrice) : null
        });
        setEditingProduct(null);
        setEditForm({});
        alert('Product Updated! ✅');
    };

    const handleDelete = (productId, productTitle) => {
        if (window.confirm(`Are you sure you want to delete "${productTitle}"?`)) {
            deleteProduct(productId);
            alert('Product Deleted! 🗑️');
        }
    };

    // Drag and Drop Handlers
    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newProducts = [...products];
        const draggedItem = newProducts[draggedIndex];
        newProducts.splice(draggedIndex, 1);
        newProducts.splice(index, 0, draggedItem);

        reorderProducts(newProducts);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <>
            <div className="container" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
                <h1 style={{
                    marginBottom: '2rem',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '3rem',
                    color: 'var(--primary)'
                }}>
                    Admin Dashboard
                </h1>

                {/* Analytics Dashboard */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '1.5rem'
                    }}>
                        <TrendingUp size={28} color="var(--accent)" /> Analytics & Insights
                    </h2>

                    {/* Stats Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        {/* Page Visits */}
                        <div className="glass-panel" style={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(246, 193, 204, 0.1) 0%, white 100%)'
                        }}>
                            <Users size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-ui)' }}>
                                {analytics.pageVisits}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontFamily: 'var(--font-ui)' }}>
                                Page Visits
                            </div>
                        </div>

                        {/* Total Products */}
                        <div className="glass-panel" style={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(201, 162, 77, 0.1) 0%, white 100%)'
                        }}>
                            <Plus size={32} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', fontFamily: 'var(--font-ui)' }}>
                                {products.length}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontFamily: 'var(--font-ui)' }}>
                                Total Products
                            </div>
                        </div>

                        {/* Total Views */}
                        <div className="glass-panel" style={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(231, 161, 176, 0.1) 0%, white 100%)'
                        }}>
                            <Eye size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-ui)' }}>
                                {Object.values(analytics.productViews).reduce((a, b) => a + b, 0)}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontFamily: 'var(--font-ui)' }}>
                                Product Views
                            </div>
                        </div>

                        {/* Total Wishlists */}
                        <div className="glass-panel" style={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(246, 193, 204, 0.15) 0%, white 100%)'
                        }}>
                            <HeartIcon size={32} color="#e74c3c" style={{ marginBottom: '0.5rem' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c', fontFamily: 'var(--font-ui)' }}>
                                {Object.values(analytics.wishlistStats).reduce((a, b) => a + b, 0)}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontFamily: 'var(--font-ui)' }}>
                                Wishlist Adds
                            </div>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {/* Most Viewed Products */}
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1.1rem',
                                fontFamily: 'var(--font-ui)'
                            }}>
                                <Eye size={20} color="var(--accent)" /> Most Viewed Products
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {Object.entries(analytics.productViews)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 5)
                                    .map(([productId, views]) => {
                                        const product = products.find(p => p.id == productId);
                                        if (!product) return null;
                                        return (
                                            <div key={productId} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.5rem',
                                                background: 'rgba(0,0,0,0.02)',
                                                borderRadius: '4px'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                                    <img src={product.image} alt="" style={{ width: '30px', height: '30px', borderRadius: '4px', objectFit: 'cover' }} />
                                                    <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-main)' }}>{product.title}</span>
                                                </div>
                                                <span style={{
                                                    fontWeight: 'bold',
                                                    color: 'var(--primary)',
                                                    fontSize: '0.9rem',
                                                    fontFamily: 'var(--font-ui)'
                                                }}>
                                                    {views} views
                                                </span>
                                            </div>
                                        );
                                    })}
                                {Object.keys(analytics.productViews).length === 0 && (
                                    <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem', padding: '1rem' }}>
                                        No product views yet
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Most Wishlisted Products */}
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1.1rem',
                                fontFamily: 'var(--font-ui)'
                            }}>
                                <HeartIcon size={20} color="#e74c3c" /> Most Wishlisted Products
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {Object.entries(analytics.wishlistStats)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 5)
                                    .map(([productId, count]) => {
                                        const product = products.find(p => p.id == productId);
                                        if (!product) return null;
                                        return (
                                            <div key={productId} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.5rem',
                                                background: 'rgba(231, 76, 60, 0.05)',
                                                borderRadius: '4px'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                                    <img src={product.image} alt="" style={{ width: '30px', height: '30px', borderRadius: '4px', objectFit: 'cover' }} />
                                                    <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-main)' }}>{product.title}</span>
                                                </div>
                                                <span style={{
                                                    fontWeight: 'bold',
                                                    color: '#e74c3c',
                                                    fontSize: '0.9rem',
                                                    fontFamily: 'var(--font-ui)'
                                                }}>
                                                    {count} ♥
                                                </span>
                                            </div>
                                        );
                                    })}
                                {Object.keys(analytics.wishlistStats).length === 0 && (
                                    <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem', padding: '1rem' }}>
                                        No wishlist activity yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* Add Product Form */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <Plus size={24} color="var(--accent)" /> Add New Product
                        </h2>
                        <form onSubmit={handleProductSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>Product Title</label>
                                <input
                                    value={newProduct.title}
                                    onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                                    required
                                    placeholder="e.g., Rose Petal Earrings"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>Price (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newProduct.price}
                                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                        required
                                        placeholder="120"
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>Original Price (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newProduct.originalPrice}
                                        onChange={e => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                                        placeholder="200 (optional)"
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>Category</label>
                                <select
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>Image Path</label>
                                <input
                                    value={newProduct.image}
                                    onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                    placeholder="/products/image.jpg"
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>Description</label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                    rows={3}
                                    placeholder="Handcrafted with real rose petals..."
                                />
                            </div>

                            <button type="submit" className="btn" style={{
                                width: '100%',
                                justifyContent: 'center',
                                background: 'var(--primary)',
                                borderColor: 'var(--primary)',
                                color: 'white'
                            }}>
                                <Plus size={20} /> Publish Product
                            </button>
                        </form>
                    </div>

                    {/* Categories & Stats */}
                    <div>
                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h2 style={{ marginBottom: '1rem' }}>Add Category</h2>
                            <form onSubmit={handleCategorySubmit} style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    value={newCategory}
                                    onChange={e => setNewCategory(e.target.value)}
                                    placeholder="New Category Name"
                                    style={{ marginBottom: 0, flex: 1 }}
                                />
                                <button type="submit" className="btn">Add</button>
                            </form>
                            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {categories.map(c => (
                                    <span key={c} style={{
                                        background: 'var(--secondary)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontFamily: 'var(--font-ui)',
                                        color: 'white'
                                    }}>
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h2>Inventory Stats</h2>
                            <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-ui)' }}>
                                Total Products: <strong style={{ color: 'var(--primary)' }}>{products.length}</strong>
                            </p>
                        </div>
                    </div>

                </div>

                {/* Product Management Section */}
                <div className="glass-panel" style={{ padding: '2rem', marginTop: '3rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <GripVertical size={24} color="var(--accent)" /> Manage Products
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 'normal', marginLeft: '1rem' }}>
                            (Drag to reorder)
                        </span>
                    </h2>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: draggedIndex === index ? 'rgba(231, 161, 176, 0.1)' : 'white',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    borderRadius: '8px',
                                    cursor: editingProduct === product.id ? 'default' : 'grab',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <GripVertical size={20} color="var(--text-light)" style={{ cursor: 'grab' }} />

                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        objectFit: 'cover',
                                        border: '2px solid var(--secondary)'
                                    }}
                                />

                                {editingProduct === product.id ? (
                                    // Edit Mode
                                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', gap: '0.5rem', alignItems: 'center' }}>
                                        <input
                                            value={editForm.title}
                                            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                            style={{ marginBottom: 0, padding: '0.5rem' }}
                                        />
                                        <input
                                            type="number"
                                            value={editForm.price}
                                            onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                            style={{ marginBottom: 0, padding: '0.5rem' }}
                                        />
                                        <select
                                            value={editForm.category}
                                            onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                            style={{ marginBottom: 0, padding: '0.5rem' }}
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={saveEdit}
                                                className="btn"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                            >
                                                <Save size={16} /> Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="btn-secondary"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                            >
                                                <X size={16} /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', fontSize: '1rem', fontFamily: 'var(--font-main)' }}>
                                                {product.title}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                                                <span style={{ fontFamily: 'var(--font-ui)' }}>
                                                    {product.originalPrice && (
                                                        <span style={{ textDecoration: 'line-through', marginRight: '0.5rem', opacity: 0.6 }}>
                                                            ₹{product.originalPrice}
                                                        </span>
                                                    )}
                                                    <strong style={{ color: 'var(--primary)' }}>₹{product.price}</strong>
                                                </span>
                                                <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>•</span>
                                                <span>{product.category}</span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => startEdit(product)}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid var(--accent)',
                                                    color: 'var(--accent)',
                                                    padding: '0.5rem',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'var(--accent)';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--accent)';
                                                }}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id, product.title)}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #e74c3c',
                                                    color: '#e74c3c',
                                                    padding: '0.5rem',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#e74c3c';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = '#e74c3c';
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
                            <p>No products yet. Add your first product above! ✨</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
