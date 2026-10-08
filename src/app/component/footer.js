"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [showFixedImage, setShowFixedImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page (within last 1000px)
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollPosition < 1000) {
        setShowFixedImage(true);
      } else {
        setShowFixedImage(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Fixed Campus Image (Locked to bottom 45vh) ───────────────── */}
      {showFixedImage && (
        <div className="fixed -bottom-55 left-0 right-0 z-0 h-[85vh] pointer-events-none">
          <Image
            src="/footer2.jfif"
            alt="KIPS College Campus"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 flex flex-col p-16 bg-black/20">
            <h3 className="text-4xl font-semibold uppercase text-white md:text-6xl ">

              Your Future
              <br />
              Starts Here.
            </h3>
            <div className="mt-6 px-30 pointer-events-auto">
              <a
                href="#apply"
                className="relative isolate overflow-hidden inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-[#0082CF] bg-[#0082CF] text-white font-sans text-sm font-semibold tracking-wider transition-all duration-300 shadow-lg before:absolute before:inset-0 before:z-0 before:origin-bottom before:scale-y-0 before:bg-white before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-y-100 hover:text-[#0082CF] hover:shadow-xl hover:scale-[1.04]"
                style={{ width: "fit-content" }}
              >
                <span className="relative z-10  " style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 700 }}>Apply Now</span>
              </a>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}

      {/* ── Footer Main Content ───────────────────────────────────────── */}
      <footer className="relative z-10 bg-[#0082CF] text-white pt-14 pb-6 px-6 sm:px-35 border-t border-gray-800/50">
        {/* Right Side Vertical Multi-Color Ribbon Stripes Design Accent */}
        <div className="absolute right-0 top-0 bottom-0 h-full flex z-20 pointer-events-none">
          <div className="w-3 sm:w-5 h-full bg-[#0082CF]" />
          <div className="w-3 sm:w-0.5 h-full bg-black" />
          <div className="w-3 sm:w-3 h-full bg-white" />
          <div className="w-3 sm:w-0.5 h-full bg-black" />
          <div className="w-3 sm:w-3 h-full bg-[#0082CF]" />
          <div className="w-3 sm:w-0.5 h-full bg-black" />
          <div className="w-3 sm:w-3 h-full bg-white" />
          <div className="w-3 sm:w-0.5 h-full bg-black" />
          <div className="w-3 sm:w-5 h-full bg-[#0082CF]" />
        </div>

        {/* Content Grid — 2 columns on mobile (Brand full width on top, Links & Follow Us side-by-side), 3 columns on desktop */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-8">
          {/* Brand Column — Spans full width (2 cols) on mobile, 1 col on desktop */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h4 className="text-4xl md:text-5xl font-semibold text-white tracking-wide" style={{ fontFamily: "'DM Serif Display', serif" }}>KIPS</h4>
            <p className="text-white/90 text-base md:text-lg max-w-sm leading-relaxed " style={{ fontFamily: "'Helvetica Neue', Arial, Helvetica, sans-serif", color: "white" }}>
              Empowering students through quality education and opportunities.
            </p>
          </div>



          {/* Links Column — 1st column on mobile */}
          <div className="col-span-1 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "'DM Serif Display', serif" }}>Links</h3>
            <ul className="flex flex-col gap-3 text-cyan-300 text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <li><a href="#about" className="hover:text-gray-400 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">About Us</a></li>
              <li><a href="#partner" className="hover:text-gray-400 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">Partner</a></li>
              <li><a href="#career" className="hover:text-gray-400 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">Careers</a></li>
              <li><a href="#contact" className="hover:text-gray-400 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">Contact</a></li>
            </ul>
          </div>

          {/* Follow Us Column — 2nd column on mobile */}
          <div className="col-span-1 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "'DM Serif Display', serif" }}>Follow Us</h3>
            <ul className="flex flex-col gap-3 text-cyan-300 text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <li><a href="#" className="hover:text-blue-700 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">Facebook</a></li>
              <li><a href="#" className="hover:text-red-500 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-600 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">LinkedIn</a></li>
              <li><a href="#" className="hover:text-red-600 hover:translate-x-1.5 transition-all duration-200 inline-block font-medium cursor-pointer" data-cursor="link">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/30 text-center text-sm md:text-base text-white/80">
          © {new Date().getFullYear()} KIPS Education System. All rights reserved.
        </div>
      </footer>

      {/* ── Transparent scroll gap (Set to 45vh so max scroll locks right here) ── */}
      <div className="relative z-10 h-[45vh] bg-transparent pointer-events-none" />
    </>
  );
}