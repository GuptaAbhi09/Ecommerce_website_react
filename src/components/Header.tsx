import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utilsHelper/supabaseClient";


export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    getSession();

    // Listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Clean up listener
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false); // optional, will auto-set via listener
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
          <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-700" : ""}>Home</NavLink>
          <NavLink to="/product" className={({ isActive }) => isActive ? "text-orange-700" : ""}>Product</NavLink>
          <NavLink to="/deals" className={({ isActive }) => isActive ? "text-orange-700" : ""}>Deals</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-700" : ""}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-orange-700" : ""}>Contact</NavLink>
        </nav>
        

        <div className="flex gap-5">
          {/* Cart Icon - Desktop */}
        <NavLink to="/cart" className="hidden md:flex w-10 h-10 bg-gray-100 rounded-lg items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Cart"
            className="w-5 h-5 object-contain"
          />
        </NavLink>
        {/* Auth Buttons - Desktop */}
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="hidden md:flex px-4 py-2 bg-sky-500 hover:bg-sky-600 text-base font-semibold text-white rounded-lg cursor-pointer">Login</NavLink>
              <NavLink to="/signup" className="hidden md:flex px-4 py-2 bg-sky-500 hover:bg-sky-600 text-base font-semibold text-white rounded-lg cursor-pointer">Signup</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-base font-semibold text-white rounded-lg cursor-pointer">Logout</button>
          )}
        </div>

        {/* Hamburger Menu - Mobile Only */}
        <button className="md:hidden" onClick={handleToggle}>
          <span className="text-2xl font-bold">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-3 md:hidden text-sm font-medium">
          <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-700" : ""}>Home</NavLink>
          <NavLink to="/product" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-700" : ""}>Product</NavLink>
          <NavLink to="/deals" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-700" : ""}>Deals</NavLink>
          <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-700" : ""}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-700" : ""}>Contact</NavLink>
          <NavLink to="/cart" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-700" : ""}>Cart</NavLink>

          {/* Auth Buttons - Mobile */}
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" onClick={closeMenu} className="text-blue-600">Login</NavLink>
              <NavLink to="/signup" onClick={closeMenu} className="text-blue-600">Signup</NavLink>
            </>
          ) : (
            <button  onClick={()=>{
              handleLogout();
              closeMenu();
            }} className="text-red-600">Logout</button >
          )}
        </div>
      )}
    </header>
  );
};
