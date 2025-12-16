import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const { addToCart, addToWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    const result = await addToCart(product._id, quantity);
    if (result.success) {
      alert('Added to cart successfully!');
      navigate('/cart');
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = await addToWishlist(product._id);
    if (result.success) {
      alert('Added to wishlist!');
    }
  };

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

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 btn-primary px-6 py-2"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-purple-600 hover-text-purple-700 font-medium flex items-center"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1" style={{ gridTemplateColumns: '1fr', gap: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div className="gradient-purple-100-pink-100 rounded-2xl p-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-contain"
              style={{ height: '24rem' }}
            />
          </div>

          <div>
            <div className="mb-4">
              <span className="badge badge-purple">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

            <div className="flex items-center mb-6">
              <span className="text-yellow-400 text-xl">
                {'⭐'.repeat(Math.round(product.rating || 4))}
              </span>
              <span className="ml-2 text-gray-600">({product.rating || 4.0})</span>
            </div>

            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-purple-600">₹{product.price}</span>
              <span className="ml-4 text-gray-500 line-through">₹{Math.round(product.price * 1.3)}</span>
              <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                23% OFF
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600" style={{ lineHeight: '1.75' }}>{product.description}</p>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700" style={{ width: '8rem' }}>Age Range:</span>
                <span className="text-gray-600">{product.ageRange}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700" style={{ width: '8rem' }}>Stock:</span>
                <span className={product.stock > 10 ? 'text-green-600' : 'text-orange-600'}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg" style={{ width: '8rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover-bg-gray-100 transition"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover-bg-gray-100 transition"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-lg font-semibold text-lg transition ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500'
                    : 'btn-primary'
                }`}
                style={{ cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleAddToWishlist}
                className="btn-secondary px-6 py-3 font-semibold"
              >
                ❤️ Wishlist
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2" style={{ color: '#1e40af' }}>🎁 Special Offers</h4>
              <ul className="text-sm space-y-1" style={{ color: '#1e3a8a' }}>
                <li>• Free shipping on orders above ₹500</li>
                <li>• Get 10% cashback on prepaid orders</li>
                <li>• Easy 7-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;