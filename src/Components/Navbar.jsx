import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../img/bigapple.png';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false);
      } else {
        setShow(true); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-9 left-10 right-10 z-50 rounded-4xl transition-transform duration-500 ease-in-out
      ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      bg-white/30 backdrop-blur-md shadow-lg`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold text-green-900 flex items-center gap-2">
            <img src={logo} alt="logo" className="w-9" />
            Bigappleworld
          </div>

          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-green-900 hover:text-green-600 transition">Home</a>
            <a href="#" className="text-green-900 hover:text-green-600 transition">Products</a>
            <a href="#" className="text-green-900 hover:text-green-600 transition">About</a>
            <a href="#" className="text-green-900 hover:text-green-600 transition">Contact</a>
          </div>

          <div className="md:hidden">
            <StyledWrapper>
              <label className="burger" htmlFor="burger">
                <input
                  type="checkbox"
                  id="burger"
                  checked={open}
                  onChange={() => setOpen(!open)}
                />
                <span />
                <span />
                <span />
              </label>
            </StyledWrapper>
          </div>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="flex flex-col px-4 pb-4 space-y-2 bg-white/80 backdrop-blur-md rounded-b-2xl">
          <a href="#" className="text-green-900 hover:text-green-600 transition">Home</a>
          <a href="#" className="text-green-900 hover:text-green-600 transition">Products</a>
          <a href="#" className="text-green-900 hover:text-green-600 transition">About</a>
          <a href="#" className="text-green-900 hover:text-green-600 transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

const StyledWrapper = styled.div`
  .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: black;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform: translateY(-100%);
    transform-origin: left center;
  }

  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;
  }
`;
