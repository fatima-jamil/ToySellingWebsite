import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Home = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addToCart, addToWishlist } = useCart();
  const navigate = useNavigate();


  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/', productId } });
      return;
    }

    const result = await addToCart(productId);
    if (result.success) {
      alert('Added to cart successfully!');
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    const result = await addToWishlist(productId);
    if (result.success) {
      alert('Added to wishlist!');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full border-2 border-purple-600" style={{ 
          height: '4rem', 
          width: '4rem',
          borderTopColor: 'transparent'
        }}></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ padding: '2rem 1rem' }}>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to ToyStore 🎉
        </h1>
        <p className="text-xl text-gray-600">
          Discover Amazing Toys for Kids of All Ages
        </p>
      </div>


      <div className="mb-8" />

      <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product._id}
            className="card"
          >
            <div className="relative h-64 gradient-purple-100-pink-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleAddToWishlist(product._id)}
                className="absolute bg-white p-2 rounded-full shadow-md hover-bg-red-50 transition"
                style={{ top: '0.75rem', right: '0.75rem' }}
              >
                ❤️
              </button>
              {product.stock < 10 && product.stock > 0 && (
                <span className="absolute bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ top: '0.75rem', left: '0.75rem' }}>
                  Only {product.stock} left!
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ top: '0.75rem', left: '0.75rem' }}>
                  Out of Stock
                </span>
              )}
            </div>

            <div className="p-5">
              <div className="mb-2">
                <span className="badge badge-purple">
                  {product.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center mb-2">
                <span className="text-yellow-400">{'⭐'.repeat(Math.round(product.rating || 4))}</span>
                <span className="text-sm text-gray-600 ml-2">({product.rating || 4.0})</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-purple-600">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-500">
                  Age: {product.ageRange}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  disabled={product.stock === 0}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500'
                      : 'btn-primary'
                  }`}
                  style={{ cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="btn-secondary px-4 py-2"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No toys found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Home;