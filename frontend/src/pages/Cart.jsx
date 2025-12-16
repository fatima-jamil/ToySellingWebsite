// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import './Cart.css';

// const Cart = () => {
//   const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useCart();
//   const navigate = useNavigate();

//   const handleQuantityChange = async (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     await updateCartQuantity(productId, newQuantity);
//   };

//   const handleRemoveItem = async (productId) => {
//     if (window.confirm('Remove this item from cart?')) {
//       await removeFromCart(productId);
//     }
//   };

//   const handleCheckout = () => {
//     alert('Checkout functionality will be implemented soon!');
//   };

//   const handleClearCart = async () => {
//     if (window.confirm('Clear all items from cart?')) {
//       await clearCart();
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="text-center">
//           <div className="text-6xl mb-4">🛒</div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
//           <p className="text-gray-600 mb-8">Start adding some amazing toys to your cart!</p>
//           <button
//             onClick={() => navigate('/')}
//             className="btn-primary px-8 py-3 font-semibold"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">Shopping Cart 🛒</h1>
//         <button
//           onClick={handleClearCart}
//           className="text-red-600 hover-text-red-700 font-medium"
//         >
//           Clear Cart
//         </button>
//       </div>

//       <div className="cart-layout">
//         <div className="cart-items">
//           {cart.map(item => (
//             <div key={item.product._id} className="cart-item">
//               <div className="cart-item-image gradient-purple-100-pink-100">
//                 <img
//                   src={item.product.image}
//                   alt={item.product.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="cart-item-details">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800">
//                       {item.product.name}
//                     </h3>
//                     <p className="text-sm text-gray-600">{item.product.category}</p>
//                   </div>
//                   <button
//                     onClick={() => handleRemoveItem(item.product._id)}
//                     className="text-red-500 hover-text-red-700"
//                   >
//                     🗑️
//                   </button>
//                 </div>

//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {item.product.description}
//                 </p>

//                 <div className="cart-item-actions">
//                   <div className="flex items-center space-x-4">
//                     <span className="text-gray-700 font-medium">Quantity:</span>
//                     <div className="quantity-control">
//                       <button
//                         onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
//                         className="px-3 py-1 hover-bg-gray-100 transition"
//                       >
//                         -
//                       </button>
//                       <span className="px-4 py-1 border-x border-gray-300">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
//                         className="px-3 py-1 hover-bg-gray-100 transition"
//                         disabled={item.quantity >= item.product.stock}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-sm text-gray-600">
//                       ₹{item.product.price} x {item.quantity}
//                     </p>
//                     <p className="text-2xl font-bold text-purple-600">
//                       ₹{item.product.price * item.quantity}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="cart-summary sticky top-24">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between text-gray-700">
//                 <span>Subtotal</span>
//                 <span>₹{getCartTotal()}</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span>Shipping</span>
//                 <span className="text-green-600">FREE</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span>Tax (18%)</span>
//                 <span>₹{Math.round(getCartTotal() * 0.18)}</span>
//               </div>
//               <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
//                 <span>Total</span>
//                 <span className="text-purple-600">
//                   ₹{Math.round(getCartTotal() * 1.18)}
//                 </span>
//               </div>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="w-full btn-primary py-3 mb-3 font-semibold"
//             >
//               Proceed to Checkout
//             </button>

//             <button
//               onClick={() => navigate('/')}
//               className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover-bg-gray-200 transition font-semibold"
//             >
//               Continue Shopping
//             </button>

//             <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
//               <p className="text-sm text-green-800">
//                 🎉 <strong>Free Shipping</strong> on orders above ₹500!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
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