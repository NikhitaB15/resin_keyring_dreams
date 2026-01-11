import React, { createContext, useState, useEffect, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const DEFAULT_CATEGORIES = ['Keyrings', 'Earrings', 'Necklaces', 'Sets', 'Valentine\'s Day', 'Beach'];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: 'Blush Floral Keyring',
    price: 120.00,
    originalPrice: 150.00,
    category: 'Keyrings',
    image: '/products/keyring_floral.jpg',
    description: 'Handcrafted oval keyring with delicate pink florals and gold shimmering touches.'
  },
  {
    id: 2,
    title: 'Midnight Blue Hydrangea Earrings',
    price: 150.00,
    originalPrice: 200.00,
    category: 'Earrings',
    image: '/products/earrings_blue.jpg',
    description: 'Rectangular blue resin earrings featuring real hydrangea petals.'
  },
  {
    id: 3,
    title: 'Rose Petal Dangles',
    price: 100.00,
    category: 'Valentine\'s Day',
    image: '/products/earrings_rose_1.jpg',
    description: 'Circular resin drops filled with vibrant rose petals and gold foil.'
  },
  {
    id: 4,
    title: 'Emerald Leaf Squares',
    price: 115.00,
    category: 'Earrings',
    image: '/products/earrings_green.jpg',
    description: 'Square studs encapsulating fresh green leaves and glitter.'
  },
  {
    id: 5,
    title: 'Autumn Gold Drops',
    price: 140.00,
    category: 'Earrings',
    image: '/products/earrings_rose_2.jpg',
    description: 'Golden hour inspired dangles with scattered petals.'
  },
  {
    id: 6,
    title: 'Beach Keyring',
    price: 130.00,
    originalPrice: 180.00,
    category: 'Beach',
    image: '/products/beach_keyring.png',
    description: 'Ocean-inspired keyring with beach elements preserved in crystal-clear resin.'
  },
  {
    id: 7,
    title: 'Pink Rose Oval Earrings',
    price: 125.00,
    originalPrice: 175.00,
    category: 'Valentine\'s Day',
    image: '/products/big_rose_earrings.jpg',
    description: 'Elegant oval-shaped earrings featuring delicate pink rose petals and floral accents.'
  },
  {
    id: 8,
    title: 'Floral Dreams Keyring',
    price: 135.00,
    originalPrice: 190.00,
    category: 'Keyrings',
    image: '/products/flower_keyring.jpg',
    description: 'Rectangular keyring adorned with painted pink and purple flowers on a soft background.'
  },
  {
    id: 9,
    title: 'Heartbreak Studs',
    price: 110.00,
    category: 'Valentine\'s Day',
    image: '/products/heart_broken.jpg',
    description: 'Heart-shaped pink resin studs with artistic red and white patterns, perfect for Valentine\'s.'
  }
];

export const StoreProvider = ({ children }) => {
  // State initialization with localStorage checks
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Analytics State
  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem('analytics');
    let parsed = saved ? JSON.parse(saved) : null;

    if (!parsed) {
      return {
        pageVisits: 0,
        uniqueVisitors: 0,
        productViews: {},
        wishlistStats: {}
      };
    }

    // Migration for existing data
    if (parsed.uniqueVisitors === undefined) {
      parsed.uniqueVisitors = parsed.pageVisits > 0 ? 1 : 0;
    }

    return parsed;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  // Location & Shipping State
  const [shippingData, setShippingData] = useState({
    pincode: '',
    city: '',
    loading: false,
    shippingCost: 0
  });

  const detectLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    setShippingData(prev => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();

          // Basic logic to mimic "Official Data" - normally you'd use a real shipping API here
          const detectedPin = data.postcode || '';

          setShippingData({
            pincode: detectedPin,
            city: data.city || data.locality || '',
            loading: false,
            shippingCost: calculateShipping(detectedPin)
          });

          showToast(`Location detected: ${data.city || 'Unknown'}`, 'success');
        } catch (error) {
          console.error('Error fetching location:', error);
          setShippingData(prev => ({ ...prev, loading: false }));
          showToast('Failed to fetch address details', 'error');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setShippingData(prev => ({ ...prev, loading: false }));
        showToast('Location access denied. Please enter manually.', 'info');
      }
    );
  };

  const calculateShipping = (pincode) => {
    // Mimic official DTDC/Shipping logic
    // 1. Valid Indian Pincodes are 6 digits
    if (!pincode || pincode.length !== 6) return 0;

    // 2. Metro Cities often start with 11 (Delhi), 40 (Mumbai), 56 (Bangalore), 60 (Chennai), 70 (Kolkata)
    const metroPrefixes = ['11', '40', '56', '60', '70'];
    const isMetro = metroPrefixes.some(prefix => pincode.startsWith(prefix));

    // Base Rates
    if (isMetro) return 60; // Cheaper for metros
    return 80; // Standard for others
  };

  const updatePincode = (newPincode) => {
    setShippingData(prev => ({
      ...prev,
      pincode: newPincode,
      shippingCost: calculateShipping(newPincode)
    }));
  };

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('analytics', JSON.stringify(analytics));
  }, [analytics]);

  // Actions
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, ...updatedData } : p
    ));
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    // Also remove from wishlist if present
    setWishlist(wishlist.filter(id => id !== productId));
  };

  const reorderProducts = (newOrder) => {
    setProducts(newOrder);
  };

  // Analytics Functions
  const trackPageVisit = () => {
    const hasVisited = localStorage.getItem('has_visited_site');

    setAnalytics(prev => {
      const newUnique = !hasVisited ? (prev.uniqueVisitors || 0) + 1 : (prev.uniqueVisitors || 0);
      return {
        ...prev,
        pageVisits: prev.pageVisits + 1,
        uniqueVisitors: newUnique
      };
    });

    if (!hasVisited) {
      localStorage.setItem('has_visited_site', 'true');
    }
  };

  const trackProductView = (productId) => {
    setAnalytics(prev => ({
      ...prev,
      productViews: {
        ...prev.productViews,
        [productId]: (prev.productViews[productId] || 0) + 1
      }
    }));
  };

  const getAnalytics = () => {
    return analytics;
  };

  const loginAdmin = (email, password) => {
    // Check credentials - in production, this should be done server-side
    const ADMIN_EMAIL = 'nikhitabhatt153@gmail.com';
    const ADMIN_PASSWORD = 'Iammad@15';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      // Store encrypted flag in localStorage (not the actual credentials)
      localStorage.setItem('adminAuth', btoa(email)); // Basic encoding, not encryption
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminAuth');
  };

  const toggleWishlist = (productId) => {
    const isAdding = !wishlist.includes(productId);

    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );

    // Track wishlist stats
    if (isAdding) {
      setAnalytics(prev => ({
        ...prev,
        wishlistStats: {
          ...prev.wishlistStats,
          [productId]: (prev.wishlistStats[productId] || 0) + 1
        }
      }));
    }
  };

  const getWishlistProducts = () => {
    return products.filter(p => wishlist.includes(p.id));
  };

  // Cart Actions
  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        showToast(`Increased ${product.title} quantity`, 'success');
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast('Added to Cart', 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Removed from Cart', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      wishlist,
      isAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      reorderProducts,
      addCategory,
      loginAdmin,
      logoutAdmin,
      toggleWishlist,
      getWishlistProducts,
      trackPageVisit,
      trackProductView,
      getAnalytics,
      analytics,
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      toast,
      showToast,
      toast,
      showToast,
      hideToast,
      shippingData,
      detectLocation,
      updatePincode
    }}>
      {children}
    </StoreContext.Provider>
  );
};
