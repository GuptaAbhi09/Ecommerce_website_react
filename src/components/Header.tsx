import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { User, LogOut, ShoppingCart, Menu, X, Settings } from "lucide-react";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const { getCartTotals } = useCart();
  const { itemCount } = getCartTotals();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <header className="w-full border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/34f4251cfd824aad1d0767c6f917d5755152fbeb?placeholderIfAbsent=true"
            alt="Tech Haven Logo"
            className="w-6 h-6 object-contain"
          />
          <h1 className="text-lg font-bold text-neutral-900">
            <Link to="/">Tech Haven</Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Product
          </NavLink>
          <NavLink
            to="/deals"
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Deals
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart Icon - Desktop */}
          <NavLink
            to="/cart"
            className="hidden md:flex relative w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg items-center justify-center transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </NavLink>

          {/* Auth Section - Desktop */}
          {loading ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ) : !isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              {/* User Profile Dropdown */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.user_metadata?.name ||
                    user?.email?.split("@")[0] ||
                    "User"}
                </span>
              </div>
              <NavLink
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Profile</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu - Mobile Only */}
        <button className="md:hidden" onClick={handleToggle}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-3 md:hidden text-sm font-medium">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/product"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Product
          </NavLink>
          <NavLink
            to="/deals"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Deals
          </NavLink>
          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "text-orange-700" : "")}
          >
            Contact
          </NavLink>
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-orange-700" : ""}`
            }
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
            {itemCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </NavLink>

          {/* Auth Section - Mobile */}
          {loading ? (
            <div className="flex items-center gap-2 py-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : !isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 py-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  {user?.user_metadata?.name ||
                    user?.email?.split("@")[0] ||
                    "User"}
                </span>
              </div>
              <NavLink
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Settings className="w-4 h-4" />
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
