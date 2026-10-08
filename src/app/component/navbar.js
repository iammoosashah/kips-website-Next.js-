"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState(null);

  /* ── Scroll-reactive state ──────────────────────────────────────── */
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const aboutVisible = () => {
      const about = document.querySelector("[data-about-section]");
      if (!about) return window.scrollY > 300;
      return about.getBoundingClientRect().top < window.innerHeight;
    };

    const onScroll = () => {
      const aboutUp = aboutVisible();
      setHidden(false);
      setIsScrolled(aboutUp);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navHidden = hidden && !mobileMenuOpen && !openDropdown;

  /* ── Derived colour tokens ───────────────────────────────────────── */
  const s = isScrolled;
  const logoNameCls = s ? "text-[#0082CF]" : "text-gray-800";
  const logoSubCls = s ? "text-gray-500" : "text-gray-700";
  const navLinkCls = s ? "text-slate-900 hover:text-[#0082CF]" : "text-black hover:text-[#0082CF]";
  const navActiveCls = s ? "text-[#0082CF] font-semibold" : "text-white font-semibold";
  const underlineCls = s ? "bg-[#0082CF]" : "bg-[#0082CF]";
  const arrowCls = s ? "text-slate-400 group-hover:text-slate-900" : "text-slate-400 group-hover:text-slate-900";
  const applyBtnCls = s
    ? "border-[#0082CF] bg-[#0082CF] text-white hover:text-[#0082CF] hover:shadow-lg hover:scale-[1.04]"
    : "border-gray-700 bg-white/50 text-gray-800 backdrop-blur-sm hover:text-[#0082CF] hover:border-white hover:shadow-lg hover:scale-[1.04]";
  const burgerCls = s ? "text-slate-800 hover:text-[#0082CF]" : "text-white hover:text-white/70";

  const navItems = [

    {
      label: "About Us",
      href: "#about",
      hasDropdown: true,
      columns: [
        {
          title: "Our Heritage",
          items: [
            { name: "Story & History", desc: "Three decades of educational excellence" },
            { name: "Executive Vision", desc: "Message from CEO Abid Wazir Khan" },
            { name: "Core Values", desc: "Conceptual clarity and character development" },
          ],
        },
        {
          title: "Governance",
          items: [
            { name: "Academic Advisory Board", desc: "Renowned scholars and educators" },
            { name: "Leadership Team", desc: "Institutional directors and heads" },
            { name: "Annual Reports", desc: "Metrics and student achievements" },
          ],
        },
      ],
      promoImage: "https://kips.edu.pk/wp-content/uploads/2025/01/About-Us-new.webp",
      promoTitle: "Over 30 Years of Excellence",
      promoSubtitle: "Transforming Pakistan's educational standards since 1992.",
    },
    {
      label: "Education",
      href: "#education",
      hasDropdown: true,
      columns: [
        {
          title: "Academic Wings",
          items: [
            { name: "KIPS Colleges", desc: "F.Sc, ICS, I.Com & FA programmes" },
            { name: "KIPS Entry Test Academy", desc: "MDCAT, ECAT, SAT, NUMS & NUST" },
            { name: "KIPS School System", desc: "Pre-school to Matric & O/A Levels" },
          ],
        },
        {
          title: "Competitive & Prep",
          items: [
            { name: "KIPS CSS & Officer Prep", desc: "Civil Superior Services coaching" },
            { name: "KIPS Publications", desc: "Curated study books & notes" },
            { name: "Online Learning Portal", desc: "Digital lectures & test series" },
          ],
        },
      ],
      promoImage: "https://kips.edu.pk/wp-content/uploads/2026/06/ks-cambridge.png",
      promoTitle: "Admissions Open 2026",
      promoSubtitle: "Secure your place in Pakistan's top-performing institution.",
    },
    {
      label: "Become Partner",
      href: "#partner",
      hasDropdown: false,
    },
    {
      label: "Career",
      href: "#career",
      hasDropdown: false,
    },
    {
      label: "Contact",
      href: "#contact",
      hasDropdown: false,
    },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${navHidden ? "-translate-y-full" : "translate-y-0"
      } ${isScrolled
        ? "bg-white border-b border-slate-200/70 shadow-lg shadow-slate-900/8"
        : "bg-transparent border-b border-transparent shadow-none"
      }`}>
      <div className="w-full px-3 h-20 flex items-center justify-between relative">
        {/* Left: Heritage School Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-hidden mt-2">
          <img
            src="/logo2.png"
            alt="KIPS Education System Logo"
            className="h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <p className={`font-bold transition-colors duration-500 ${logoNameCls}`} style={{ fontFamily: "'Helvetica Neue', Arial, Helvetica, sans-serif " ,color:"#0082CF"}}>KIPS Education System</p>
            <p className={`text-sm transition-colors duration-500 ${logoSubCls}`} >Pre-school to Post Graduate</p>
          </div>
        </a>

        {/* Center: Main Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-10 h-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;

            return (
              <div
                key={item.label}
                className="relative h-full flex items-center group"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={() => setActiveTab(item.label)}
                  className={` text-gray-800 tracking-wide transition-colors duration-500 relative py-2 inline-flex items-center gap-1.5 font-medium ${isActive ? navActiveCls : navLinkCls
                    }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg
                      className={`w-3.5 h-3.5 transition-all duration-300 group-hover:rotate-180 ${arrowCls}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}

                  {/* Active / Hover Underline */}
                  <span
                    className={`absolute bottom-2 left-[-4px] right-[-4px] h-[2px] transition-all duration-300 ease-out ${underlineCls} ${isActive ? "w-[calc(100%+8px)] opacity-100" : "w-0 opacity-0 group-hover:w-[calc(100%+8px)] group-hover:opacity-100"
                      }`}
                  />
                </a>

                {/* Editorial Mega Menu Dropdown */}
                {item.hasDropdown && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10 rounded-b-lg p-10 mega-menu-enter z-50 ${openDropdown === item.label ? "open" : ""
                      }`}
                  >
                    {/* Top Gold Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#0082CF]" />

                    <div className="grid grid-cols-12 gap-8 text-left">
                      {/* Submenu Columns */}
                      <div className="col-span-8 grid grid-cols-2 gap-8">
                        {item.columns?.map((col) => (
                          <div key={col.title} className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 border-b border-slate-100 pb-2">
                              {col.title}
                            </h3>
                            <ul className="space-y-3">
                              {col.items.map((sub) => (
                                <li key={sub.name}>
                                  <a
                                    href="#"
                                    className="group/sub block p-1.5 rounded-xs hover:bg-slate-60 transition-colors"
                                  >
                                    <div className=" font-semibold text-slate-800 group-hover/sub:text-[#0082CF] transition-colors">
                                      {sub.name}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                      {sub.desc}
                                    </div>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Editorial Promotional Image Column */}
                      <div className="col-span-4 bg-slate-50 p-5 rounded-lg border border-slate-200/70 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="relative pr-2.5">
                            {/* Vertical Accent Bar behind the image on the right side */}
                            <div className="absolute top-2 bottom-2 right-0 w-2.5 bg-[#0082CF] rounded-r-md shadow-xs z-0" />

                            <div className="relative z-10 h-32 rounded-md overflow-hidden border border-slate-200 shadow-xs bg-white">
                              <img
                                src={item.promoImage}
                                alt={item.promoTitle}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <h5 className="font-bold text-[#0b132a]">
                            {item.promoTitle}
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed ">
                            {item.promoSubtitle}
                          </p>
                        </div>

                        <a
                          href="#apply"
                          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#0082CF] hover:text-cyan-500 pt-3 group/link "
                        >
                          <span>Explore Overview</span>
                          <span className="ml-1 group-hover/link:translate-x-1 transition-transform">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Side: Apply Now */}
        <div className="hidden lg:flex items-center">
          <a
            href="#apply"
            className={`relative isolate overflow-hidden px-7 py-2.5 rounded-full border font-sans text-sm font-semibold tracking-wider transition-all duration-300 shadow-xs before:absolute before:inset-0 before:z-0 before:origin-bottom before:scale-y-0 before:bg-white before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-y-100 ${applyBtnCls}`}
          >
            <span className="relative z-10" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 700, lineHeight: "20px" }}>Apply Now</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors duration-500 focus:outline-hidden ${burgerCls}`}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <ul className="divide-y divide-slate-100">
            {navItems.map((item) => {
              const isExpanded = mobileExpandedItem === item.label;

              return (
                <li key={item.label} className="py-3">
                  {item.hasDropdown ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setMobileExpandedItem(isExpanded ? null : item.label)}
                        className="w-full flex items-center justify-between text-left py-1 transition-colors group"
                      >
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: 700, color: isExpanded ? "#0082CF" : "#274689", lineHeight: "28px" }}>
                          {item.label}
                        </span>
                        <svg
                          className={`w-5 h-5 text-slate-400 group-hover:text-[#0082CF] transition-all duration-200 ${isExpanded ? "rotate-90 text-[#0082CF]" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Expanded Submenu Accordion on Click */}
                      {isExpanded && (
                        <div className="mt-3 pl-3 space-y-5 border-l-2 border-[#0082CF]/30 my-2 pt-1 pb-2">
                          {item.columns?.map((col) => (
                            <div key={col.title} className="space-y-2.5">
                              <h4 className="font-sans text-sm font-bold text-[#0b132a] border-b border-slate-100 pb-1 uppercase tracking-wider">
                                {col.title}
                              </h4>
                              <ul className="space-y-2 pl-1">
                                {col.items.map((sub) => (
                                  <li key={sub.name}>
                                    <a
                                      href="#"
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block py-1 group/sub"
                                    >
                                      <div className="text-sm font-semibold text-slate-800 group-hover/sub:text-[#0082CF] transition-colors">
                                        {sub.name}
                                      </div>
                                      <div className="text-xs text-slate-500 mt-0.5">
                                        {sub.desc}
                                      </div>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: 700, color: "#274689", lineHeight: "28px" }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="pt-4 border-t border-slate-100">
            <a
              href="#apply"
              onClick={() => setMobileMenuOpen(false)}
              className="relative isolate overflow-hidden block text-center w-full py-3 rounded-full border border-[#0082CF] bg-[#0082CF] text-white font-sans text-base font-semibold transition-all duration-300 hover:text-[#0082CF] hover:shadow-lg hover:scale-[1.02] before:absolute before:inset-0 before:z-0 before:origin-bottom before:scale-y-0 before:bg-white before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-y-100"
            >
              <span className="relative z-10" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 700, lineHeight: "20px" }}>Apply Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}