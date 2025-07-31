import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <nav className="bg-[#0f0f1d] border-b-2 border-[#1E1E2F] fixed top-0 left-0 w-full">
        <div className="flex justify-between h-16 items-center mx-auto max-w-7xl px-[5%] md:px-8">
        <h2 className="font-bold text-2xl bg-gradient-to-r from-[#00CFFF] to-[#A855F7] bg-clip-text text-transparent">Taskwala</h2>
        <div className="md:flex hidden">
            <ul className="gap-5 flex">
                <li><NavLink to={"/"} className={({isActive,})=>(
                    `${isActive || location.pathname === "/home"?"text-[#F97316]":"text-[#F5F5F5]"} text-md font-semibold hover:text-[#F97316] transition-all duration-300`
                )}>Home</NavLink>
                </li>
                <li><NavLink to={"/campaigns"} className={({isActive})=>(
                    `${isActive?"text-[#F97316]":"text-[#F5F5F5]"} text-md font-semibold hover:text-[#F97316] transition-all duration-300`
                )}>Campaigns</NavLink>
                </li>
                <li><NavLink to={"/contact"} className={({isActive})=>(
                    `${isActive?"text-[#F97316]":"text-[#F5F5F5]"} text-md font-semibold hover:text-[#F97316] transition-all duration-300`
                )}>Contact Us</NavLink>
                </li>
            </ul>
        </div>
        <div className="md:hidden">
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 transition-all duration-300"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}
            <div className={`fixed top-0 right-0 h-full w-64 bg-[#0f0f1d] z-50 p-6 transition-transform duration-500 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}>
                <ul className="gap-5 flex flex-col cursor-pointer">
                <div className="flex justify-end border-b-2 border-[#5d6167] pb-2">
                    <li onClick={() => setMenuOpen(false)}>
                    <img src="assets/cross.svg"/>
                </li>
                </div>
                <li><NavLink to={"/"} className={({isActive})=>(
                    `${isActive?"text-[#F97316]":"text-[#F5F5F5]"} text-md font-semibold hover:text-[#F97316] transition-all duration-300`
                )}>Home</NavLink>
                </li>
                <li><NavLink to={"/campaigns"} className={({isActive})=>(
                    `${isActive?"text-[#F97316]":"text-[#F5F5F5]"} text-md font-semibold hover:text-[#F97316] transition-all duration-300`
                )}>Campaigns</NavLink>
                </li>
                <li><NavLink to={"/contact"} className={({isActive})=>(
                    `${isActive?"text-[#F97316]":"text-[#F5F5F5]"} text-md font-semibold hover:text-[#F97316] transition-all duration-300`
                )}>Contact Us</NavLink>
                </li>
            </ul>
            </div>
        </div>
        <div>
            <ul>
                <li>
                    <Link className="bg-gradient-to-r from-[#F97316] to-[#713306] py-2 px-4 rounded-sm font-semibold text-sm hover:scale-105 hidden md:flex transition-all duration-300">Sign up</Link>
                </li><li>
                    <Button className="bg-transparent hover:bg-transparent cursor-pointer md:hidden" onClick={() => setMenuOpen(true)}><img src="assets/menu.svg"/></Button>
                </li>
                
            </ul>
        </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
