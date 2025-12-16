

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🧸</span>
          <span className="logo-text hide-mobile">ToyStore</span>
        </Link>

        <div className="navbar-search">
          <div className="search-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search toys..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select hide-mobile"
          >
            {categories?.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="navbar-actions">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            <span className="hide-mobile">Home</span>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-link cart-link">
                <span className="cart-icon-wrapper">
                  🛒
                  {getCartCount() > 0 && (
                    <span className="cart-badge">{getCartCount()}</span>
                  )}
                </span>
                <span className="hide-mobile">Cart</span>
              </Link>

              <div className="user-menu">
                <span className="user-greeting hide-tablet">Hi, {user?.name}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-auth btn-login">
                Login
              </Link>
              <Link to="/signup" className="btn-auth btn-signup hide-mobile">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;