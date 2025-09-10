import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import hero1 from '../img/hero1.png'
import hero2 from '../img/hero2.png'
import hero3 from '../img/hero3.png'

const slides = [
  {
    id: 1,
    image: hero1,
    heading: 'Redefining Skincare for Every You',
    subheading: 'TIMELESS BEAUTY',
    description: 'Crafted with love and care, our products are designed to bring out your unique beauty, inside and out.',
  },
  {
    id: 2,
    image: hero2,
    heading: 'Nature Meets Science in Every Drop',
    subheading: 'PURE INGREDIENTS',
    description: 'We blend the best of nature and science to give your skin the care it deserves.',
  },
  {
    id: 3,
    image: hero3,
    heading: 'Glow Naturally, Live Confidently',
    subheading: 'REAL RESULTS',
    description: 'Our skincare is made to highlight your natural glow—without compromise.',
  },
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <header
      className="relative h-screen bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${currentSlide.image})`,
      }}
    >
      <Navbar />
      <div className="absolute inset-0 bg-opacity-40 z-0" />
      <div
        data-aos="fade-up"
        key={currentSlide.id}
        className="absolute inset-0 z-10 flex flex-col justify-end items-start px-6 pb-10 space-y-3 text-white transition-opacity duration-1000"
      >
        <h2 className="text-sm sm:text-base tracking-wide font-semibold">
          {currentSlide.subheading}
        </h2>

        <h1 className="text-2xl sm:text-3xl font-bold leading-snug max-w-sm">
          {currentSlide.heading}
        </h1>

        <p className="max-w-sm text-sm">{currentSlide.description}</p>

        <button className=" text-white px-4 py-2 rounded-lg border border-orange-100 text-xs font-semibold hover:bg-green-100 hover:text-green-900 transition duration-300 cursor-pointer">
          Shop Now
        </button>
      </div>
    </header>
  );
};

export default Header;
