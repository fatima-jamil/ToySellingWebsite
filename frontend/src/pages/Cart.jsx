
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      await removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented soon! 🎉');
  };

  const handleClearCart = async () => {
    if (window.confirm('Clear all items from cart?')) {
      await clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Start adding some amazing toys to your cart!</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            style={{ padding: '1rem 2rem', fontSize: '1rem' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart 🛒</h1>
        <button onClick={handleClearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.product._id} className="cart-item">
              <div className="cart-item-content">
                <div className="cart-item-image">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </div>

                <div className="cart-item-info">
                  <div>
                    <div className="cart-item-header">
                      <div>
                        <h3 className="cart-item-title">
                          {item.product.name}
                        </h3>
                        <p className="cart-item-category">{item.product.category}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="remove-item-btn"
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>

                    <p className="cart-item-description">
                      {item.product.description}
                    </p>
                  </div>

                  <div className="cart-item-footer">
                    <div className="quantity-section">
                      <span className="quantity-label">Quantity:</span>
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          className="quantity-btn"
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="price-section">
                      <p className="price-details">
                        ₹{item.product.price} × {item.quantity}
                      </p>
                      <p className="item-total-price">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-items">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">₹{getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-value free-shipping">FREE</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Tax (18%)</span>
              <span className="summary-value">₹{Math.round(getCartTotal() * 0.18)}</span>
            </div>
          </div>

          <div className="summary-total">
            <span className="total-label">Total</span>
            <span className="total-amount">
              ₹{Math.round(getCartTotal() * 1.18)}
            </span>
          </div>

          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>

          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>

          <div className="offer-banner">
            <p className="offer-text">
              🎉 <strong>Free Shipping</strong> on orders above ₹500!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;