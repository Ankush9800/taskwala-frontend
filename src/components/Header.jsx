import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Target, Zap } from "lucide-react";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800 fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="flex justify-between h-16 items-center mx-auto max-w-7xl px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-xl bg-gradient-to-r from-[#F97316] to-[#713306] bg-clip-text text-transparent">
              TaskWala
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => (
                    `${isActive || location.pathname === "/home" ? "text-[#F97316] border-b-2 border-[#F97316]" : "text-gray-300 hover:text-[#F97316]"} 
                    text-sm font-medium transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-[#F97316]/50`
                  )}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/campaigns" 
                  className={({isActive}) => (
                    `${isActive ? "text-[#F97316] border-b-2 border-[#F97316]" : "text-gray-300 hover:text-[#F97316]"} 
                    text-sm font-medium transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-[#F97316]/50`
                  )}
                >
                  Campaigns
                </NavLink>
              </li>
              {/* <li>
                <NavLink 
                  to="/refer" 
                  className={({isActive}) => (
                    `${isActive ? "text-[#F97316] border-b-2 border-[#F97316]" : "text-gray-300 hover:text-[#F97316]"} 
                    text-sm font-medium transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-[#F97316]/50`
                  )}
                >
                  Refer & Earn
                </NavLink>
              </li> */}
              <li>
                <NavLink 
                  to="/contact" 
                  className={({isActive}) => (
                    `${isActive ? "text-[#F97316] border-b-2 border-[#F97316]" : "text-gray-300 hover:text-[#F97316]"} 
                    text-sm font-medium transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-[#F97316]/50`
                  )}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80 
              px-6 py-2.5 rounded-lg font-medium text-sm text-white transition-all duration-300 transform hover:scale-105 
              shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            className="md:hidden bg-transparent hover:bg-gray-800 p-2 rounded-lg transition-colors duration-300" 
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-300" />
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-sm border-l border-gray-800 z-50 
          transition-transform duration-300 transform ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
          
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-2 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-lg text-white">TaskWala</h3>
            </div>
            <Button 
              className="bg-transparent hover:bg-gray-800 p-2 rounded-lg transition-colors duration-300" 
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-5 h-5 text-gray-300" />
            </Button>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-6 space-y-6">
            <ul className="space-y-4">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => (
                    `${isActive ? "text-[#F97316] bg-[#F97316]/10" : "text-gray-300 hover:text-[#F97316] hover:bg-gray-800"} 
                    block px-4 py-3 rounded-lg font-medium transition-all duration-300`
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/campaigns" 
                  className={({isActive}) => (
                    `${isActive ? "text-[#F97316] bg-[#F97316]/10" : "text-gray-300 hover:text-[#F97316] hover:bg-gray-800"} 
                    block px-4 py-3 rounded-lg font-medium transition-all duration-300`
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Campaigns
                </NavLink>
              </li>
              {/* <li>
                <NavLink 
                  to="/refer" 
                  className={({isActive}) => (
                    `${isActive ? "text-[#F97316] bg-[#F97316]/10" : "text-gray-300 hover:text-[#F97316] hover:bg-gray-800"} 
                    block px-4 py-3 rounded-lg font-medium transition-all duration-300`
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Refer & Earn
                </NavLink>
              </li> */}
              <li>
                <NavLink 
                  to="/contact" 
                  className={({isActive}) => (
                    `${isActive ? "text-[#F97316] bg-[#F97316]/10" : "text-gray-300 hover:text-[#F97316] hover:bg-gray-800"} 
                    block px-4 py-3 rounded-lg font-medium transition-all duration-300`
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* Mobile CTA Button */}
            <Link 
              to="/signup"
              className="block w-full bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80 
              px-6 py-3 rounded-lg font-medium text-center text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
