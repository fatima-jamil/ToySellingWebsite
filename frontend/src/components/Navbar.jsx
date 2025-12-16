// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';



// const Navbar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const { getCartCount } = useCart();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4" style={{ padding: '0 1.5rem' }}>
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl">🧸</span>

//             <span className="text-xl font-bold hidden sm:inline">ToyStore</span>
//           </Link>


//           <div className="flex-1 mx-4">
//             <div className="max-w-2xl mx-auto flex items-center gap-2 sm:gap-3">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search toys..."
//                 className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />

//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="hidden sm:block px-2 py-1 sm:px-3 sm:py-2 border border-gray-200 rounded-lg bg-white text-sm"
//               >
//                 {categories?.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4 sm:space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-purple-600 transition">
//               Home
//             </Link>

//             {isAuthenticated ? (
//               <>
//                 <Link to="/cart" className="relative text-gray-700 hover:text-purple-600 transition">
//                   <span className="text-xl">🛒</span>
//                   {getCartCount() > 0 && (
//                     <span className="absolute bg-red-500 text-white text-xs rounded-full flex items-center justify-center" style={{ 
//                       top: '-0.5rem', 
//                       right: '-0.5rem', 
//                       height: '1.25rem', 
//                       width: '1.25rem' 
//                     }}>
//                       {getCartCount()}
//                     </span>
//                   )}
//                 </Link>

//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm">Hi, {user?.name}</span>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-medium"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Link
//                   to="/login"
//                   className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition font-medium text-white"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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