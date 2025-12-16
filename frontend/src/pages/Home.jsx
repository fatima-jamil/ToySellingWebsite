import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = ({ searchTerm, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistedItems, setWishlistedItems] = useState(new Set());
  const { isAuthenticated } = useAuth();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      const wishlistIds = new Set(wishlist.map(item => item.product._id || item.product));
      setWishlistedItems(wishlistIds);
    } else {
      setWishlistedItems(new Set());
    }
  }, [wishlist]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/', productId } });
      return;
    }

    const result = await addToCart(productId);
    if (result.success) {
      showNotification('✅ Added to cart successfully!');
    }
  };

  const handleWishlistToggle = async (productId, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    const isWishlisted = wishlistedItems.has(productId);
    
    if (isWishlisted) {
      const result = await removeFromWishlist(productId);
      if (result.success) {
        showNotification('💔 Removed from wishlist');
      }
    } else {
      const result = await addToWishlist(productId);
      if (result.success) {
        showNotification('❤️ Added to wishlist!');
      }
    }
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  };

  const filteredProducts = products.filter(product => {
    const name = (product.name || '').toString();
    const description = (product.description || '').toString();
    const query = (searchTerm || '').toString().toLowerCase();

    const matchesSearch = (name + ' ' + description).toLowerCase().includes(query);
    const matchesCategory = (selectedCategory === 'All') || (product.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading amazing toys...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to ToyStore 🎉
        </h1>
        <p className="hero-subtitle">
          Discover Amazing Toys for Kids of All Ages
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">😢</div>
          <h2>No toys found</h2>
          <p>Try adjusting your search or browse all categories</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => {
            const isWishlisted = wishlistedItems.has(product._id);
            
            return (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  
                  <button
                    className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                    onClick={(e) => handleWishlistToggle(product._id, e)}
                    aria-label="Add to wishlist"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="heart-icon"
                      fill={isWishlisted ? '#ef4444' : 'none'}
                      stroke={isWishlisted ? '#ef4444' : '#9ca3af'}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  {product.stock === 0 && (
                    <div className="stock-badge out-of-stock">Out of Stock</div>
                  )}
                  {product.stock > 0 && product.stock < 10 && (
                    <div className="stock-badge low-stock">Only {product.stock} left!</div>
                  )}
                </div>

                <div className="product-details">
                  <span className="product-category">{product.category}</span>
                  
                  <h3 
                    className="product-name"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-rating">
                    {'⭐'.repeat(Math.round(product.rating || 4))}
                    <span className="rating-text">({product.rating || 4.0})</span>
                  </div>

                  <div className="product-footer">
                    <div className="product-price-section">
                      <span className="product-price">₹{product.price}</span>
                      <span className="product-age">{product.ageRange}</span>
                    </div>

                    <div className="product-actions">
                      <button
                        onClick={(e) => handleAddToCart(product._id, e)}
                        disabled={product.stock === 0}
                        className={`btn-add-cart ${product.stock === 0 ? 'disabled' : ''}`}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="btn-view"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;