import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/images/logo.png';
import { resetCart } from '../slices/cartSlice';
import { useState } from 'react';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="h-10 w-10 rounded bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition">
              <img src={logo} alt="ProShop" className="h-8 w-8" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">ProShop</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex mx-4 max-w-lg ml-auto">
            <SearchBox />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0">
            {/* Cart Link */}
            <Link
              to="/cart"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition relative group"
            >
              <FaShoppingCart size={18} className="group-hover:scale-110 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium px-2 py-1 rounded hover:bg-gray-100">
                  <FaUser size={16} />
                  <span className="hidden xl:inline text-xs lg:text-sm whitespace-nowrap">{userInfo.name}</span>
                </button>
                <div className="absolute right-0 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition border-t border-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium text-xs lg:text-sm whitespace-nowrap"
              >
                <FaUser size={16} />
                <span className="hidden lg:inline">Sign In</span>
              </Link>
            )}

            {/* Admin Menu */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 transition font-bold px-2 py-1 text-sm rounded hover:bg-gray-100">
                  Admin
                </button>
                <div className="absolute right-0 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                   <Link
                     to="/admin/productlist"
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                   >
                     Products
                   </Link>
                   <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Categories
                    </Link>
                    <Link
                      to="/admin/taxrates"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Tax Rates
                    </Link>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Users
                    </Link>
                   <Link
                     to="/admin/orderlist"
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition border-t border-gray-100"
                   >
                     Orders
                   </Link>
                 </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-500/30 pt-4 space-y-3 animate-slide-in">
            <div className="px-2">
              <SearchBox />
            </div>

            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition py-2 px-2 relative rounded-lg hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              <FaShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                  {cartCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <>
                <button
                   onClick={() => setUserDropdown(!userDropdown)}
                   className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition w-full py-2 px-2 rounded-lg hover:bg-blue-50"
                 >
                  <FaUser size={18} />
                  <span>{userInfo.name}</span>
                </button>
                {userDropdown && (
                  <div className="pl-4 border-l-2 border-blue-500 ml-2">
                    <Link
                      to="/profile"
                      className="block text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded hover:bg-blue-50"
                      onClick={() => {
                        setIsOpen(false);
                        setUserDropdown(false);
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setIsOpen(false);
                        setUserDropdown(false);
                      }}
                      className="text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded hover:bg-blue-50 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded-lg hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                <FaUser size={18} />
                <span>Sign In</span>
              </Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <>
                <button
                  onClick={() => setAdminDropdown(!adminDropdown)}
                  className="text-gray-900 hover:text-blue-600 transition w-full text-left font-bold py-2 px-2 rounded-lg hover:bg-blue-50 mt-2"
                >
                  Admin
                </button>
                {adminDropdown && (
                   <div className="pl-4 border-l-2 border-blue-500 ml-2">
                     <Link
                       to="/admin/productlist"
                       className="block text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded hover:bg-blue-50"
                       onClick={() => {
                         setIsOpen(false);
                         setAdminDropdown(false);
                       }}
                     >
                       Products
                     </Link>
                     <Link
                       to="/admin/categorylist"
                       className="block text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded hover:bg-blue-50"
                       onClick={() => {
                         setIsOpen(false);
                         setAdminDropdown(false);
                       }}
                     >
                       Categories
                     </Link>
                     <Link
                       to="/admin/taxrates"
                       className="block text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded hover:bg-blue-50"
                       onClick={() => {
                         setIsOpen(false);
                         setAdminDropdown(false);
                       }}
                     >
                       Tax Rates
                     </Link>
                     <Link
                       to="/admin/userlist"
                       className="block text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded hover:bg-blue-50"
                       onClick={() => {
                         setIsOpen(false);
                         setAdminDropdown(false);
                       }}
                     >
                       Users
                     </Link>
                     <Link
                       to="/admin/orderlist"
                       className="block text-gray-900 hover:text-blue-600 transition py-2 px-2 rounded hover:bg-blue-50"
                       onClick={() => {
                         setIsOpen(false);
                         setAdminDropdown(false);
                       }}
                     >
                       Orders
                     </Link>
                   </div>
                 )}
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
