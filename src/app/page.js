"use client";
import Image from "next/image";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const brands = [
    "KIPS College",
    "KIPS Academy",
    "KIPS School",
    "KIPS Publications",
    "KIPS CSS"
  ];

  const features = [
    {
      icon: "🎓",
      title: "Quality Education",
      description: "Empowering students with knowledge, skills, and confidence for a brighter future",
      image: "/quality.webp"
    },
    {
      icon: "👨‍🏫",
      title: "Expert Faculty",
      description: "Experienced educators dedicated to inspiring, guiding, and nurturing every student's potential",
      image: "/expert-fac.png"
    },
    {
      icon: "🏫",
      title: "Modern Campuses",
      description: "Modern learning environments designed to inspire creativity, growth, and academic excellence",
      image: "/modern-camp.webp"
    },
    {
      icon: "🚀",
      title: "Career Growth",
      description: "Guiding students toward meaningful opportunities, skills, and successful careers",
      image: "/career-gro.jpg"
    }
  ];

  const statistics = [
    {
      number: "A+/A",
      title: "Achived By Every Second Student"
    },
    {
      number: "70%",
      title: "Seats Secured In Universities By KIPSIANS"
    },
    {
      number: "1M+",
      title: "Alumni"
    },
    {
      number: "200+",
      title: "Campuses"
    }
  ];

  // ── Scroll-driven hero + About split ─────────────────────────────────────
  const [scrolled, setScrolled] = useState(false);
  const [aboutSplit, setAboutSplit] = useState(0);
  const [leadProgress, setLeadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutImgRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const leadRef = useRef(null);
  const projectsImgRef = useRef(null);
  const projectsRef = useRef(null);
  const [projectsProgress, setProjectsProgress] = useState(0);

  const locationsRef = useRef(null);
  const locationsImgRef = useRef(null);
  const [locationsSplit, setLocationsSplit] = useState(0);

  const partnerRef = useRef(null);
  const partnerImgRef = useRef(null);
  const [partnerProgress, setPartnerProgress] = useState(0);

  const CEO_LINES = [
    "KIPS, an organization with a diversified portfolio, has established itself as a name of trust and excellence in academic circles at large and among students in particular.",
    "It provides a complete career path to students, from Pre-School to professional education.",
    "With the vision of ‘Nation Development through Quality Education’, it has expanded its sphere of services to all major cities of Pakistan.",
    "KIPS inspires its students to explore the depths of intellectual brilliance, the breadths of moral distinction, and the heights of professional excellence.",
  ];

  const MD_LINES = [
    "Education is the light that illuminates minds, kindles hearts, and transforms individuals and societies into refined humans and civilizations.",
    "By laying the foundation of KIPS, we have taken a humble step towards making our dream of transforming our youth into world leaders come true.",
    "Since its inception, KIPS has achieved unparalleled success at different academic levels.",
    "However, our focus is not only on achieving short-term educational goals, but also on building the physical, intellectual, moral, and social foundations of character in our students.",
  ];

  const LEAD_SWAP = 1;
  const LEAD_STEPS = CEO_LINES.length + LEAD_SWAP + MD_LINES.length;
  const ABOUT_IMG_W = 570;
  const ABOUT_IMG_H = 600;
  const aboutOverlap = ABOUT_IMG_W * (0.4 - 0.3 * aboutSplit); // 40% → 10% with scroll
  const locationsOverlap = ABOUT_IMG_W * (0.4 - 0.3 * locationsSplit);
  const partnerOverlap = ABOUT_IMG_W * (0.4 - 0.3 * partnerProgress);

  const ceoLineP = leadProgress;
  const mdEnter = Math.min(1, Math.max(0, leadProgress - CEO_LINES.length));
  const mdLineP = leadProgress - CEO_LINES.length - LEAD_SWAP;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.35);

      const lead = leadRef.current;
      if (lead) {
        const pin = Math.max(1, lead.offsetHeight - window.innerHeight);
        const top = lead.getBoundingClientRect().top;
        const raw = Math.min(1, Math.max(0, -top / pin));
        setLeadProgress(raw * (LEAD_STEPS - 0.02));
      }

      const about = aboutRef.current;
      if (about) {
        const vh = window.innerHeight;
        const top = about.getBoundingClientRect().top;
        const start = vh * 1.2;
        const end = vh * 0.15;
        const p = (start - top) / (start - end);
        setAboutSplit(Math.min(1, Math.max(0, p)));
      }

      const projects = projectsRef.current;
      if (projects) {
        const vh = window.innerHeight;
        const top = projects.getBoundingClientRect().top;
        const start = vh * 1.2;
        const end = vh * 0.15;
        const p = (start - top) / (start - end);
        setProjectsProgress(Math.min(1, Math.max(0, p)));
      }

      const locations = locationsRef.current;
      if (locations) {
        const vh = window.innerHeight;
        const top = locations.getBoundingClientRect().top;
        const start = vh * 1.2;
        const end = vh * 0.15;
        const p = (start - top) / (start - end);
        setLocationsSplit(Math.min(1, Math.max(0, p)));
      }

      const partner = partnerRef.current;
      if (partner) {
        const vh = window.innerHeight;
        const top = partner.getBoundingClientRect().top;
        const start = vh * 1.2;
        const end = vh * 0.15;
        const p = (start - top) / (start - end);
        setPartnerProgress(Math.min(1, Math.max(0, p)));
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── About Us accent bar: animate when section enters viewport ──
    const aboutSection = aboutSectionRef.current;
    let aboutObserver;
    if (aboutSection) {
      aboutObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAboutInView(true);
            aboutObserver.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      aboutObserver.observe(aboutSection);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      if (aboutObserver) aboutObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Top Accent Bar on page (blue with right-side block pattern, vanishes on scroll) */}
      <div className="w-full h-2.5 bg-[#0082CF]  relative z-40 flex justify-between items-center overflow-hidden">
        <div className="flex-1 h-full bg-[#0082CF]" />

        {/* Right Side Block Accent Pattern */}
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

        <div className="absolute  p-10 pointer-events-none z-10" />
      </div>

      <Navbar />

      <main >

        {/* ── Hero pin runway (350vh) ────────────────────────────────────
            Sticky inner pane is 100vh. About uses -mt-[100vh], so:
              • first ~150vh  — hero stays put; split plays, then holds
              • last  100vh   — About KIPS slides up over the pinned hero
            (cover starts at heroHeight − 200vh = 150vh of scroll)
        ─────────────────────────────────────────────────────────────────── */}
        <div ref={heroRef} style={{ height: "350vh" }} className="relative z-0">
          <div className="sticky top-0 z-0 overflow-hidden" style={{ height: "100vh" }}>

            {/* Image pane — shrinks in both width (68%) and height (84%) on desktop when content panel appears; overlaps on mobile */}
            <div
              style={{
                position: "absolute",
                top: isMobile ? 0 : (scrolled ? "8%" : 0),
                left: 0,
                backgroundImage: "url(/hero.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: isMobile ? "100%" : (scrolled ? "68%" : "100%"),
                height: isMobile ? (scrolled ? "45%" : "100%") : (scrolled ? "84%" : "100%"),
                borderRadius: scrolled ? (isMobile ? "0 0 1.5rem 1.5rem" : "0 1.5rem 1.5rem 0") : "0px",
                transition: "all 1s cubic-bezier(0.77,0,0.175,1)",
              }}
            />

            {/* Initial fullscreen headline — fades OUT on scroll */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: isMobile ? "1.5rem" : "5rem",
                opacity: scrolled ? 0 : 1,
                transform: scrolled ? "translateY(-30px)" : "translateY(0)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: scrolled ? "none" : "auto",
              }}
            >

            </div>

            {/* Content panel — 40% wide on desktop (right: 0), 100% wide on mobile overlapping image from top 42% */}
            <div
              style={{
                position: "absolute",
                top: isMobile ? (scrolled ? "42%" : "50%") : "50%",
                bottom: isMobile ? 0 : "auto",
                left: isMobile ? 0 : "auto",
                right: 0,
                width: isMobile ? "100%" : "40%",
                transform: isMobile
                  ? scrolled
                    ? "translateY(0)"
                    : "translateY(80px)"
                  : scrolled
                    ? "translate(0, -50%)"
                    : "translate(80px, -50%)",
                background: "#fefefeff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: isMobile ? "1.5rem 1.75rem" : "2.5rem 3rem",
                borderRadius: isMobile ? "1.5rem 1.5rem 0 0" : "0",
                opacity: scrolled ? 1 : 0,
                transition: "opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s, top 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s",
                pointerEvents: scrolled ? "auto" : "none",
                boxShadow: isMobile
                  ? "0 -12px 40px rgba(0,0,0,0.18)"
                  : "-8px 0 40px rgba(0,0,0,0.15), 0 8px 40px rgba(0,0,0,0.12)",
              }}
            >
              {/* Crimson accent bar */}
              <div style={{ width: 60, height: 4, background: "#0082CF", borderRadius: 2, marginBottom: isMobile ? "0.75rem" : "1.5rem" }} />

              <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#0082CF] uppercase mb-2 sm:mb-4">
                Welcome to KIPS Education System
              </p>

              <h1 className="font-bold text-2xl sm:text-4xl text-gray-700 leading-tight">
                Empowering Students<br />for a Better Future
              </h1>

              <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-5 max-w-lg">
                Discover opportunities, education, and excellence with KIPS.
              </p>

              <div className="flex flex-wrap gap-3 mt-3 sm:mt-5">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 border text-gray-600 text-xs sm:text-sm font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-[#0082CF] hover:text-white hover:border-[#0082CF]"
                  style={{ borderColor: "#0082CF", width: "fit-content" }}
                >
                  Discover Our Colleges <span>→</span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 border text-gray-600 text-xs sm:text-sm font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-[#0082CF] hover:text-white hover:border-[#0082CF]"
                  style={{ borderColor: "#0082CF", width: "fit-content" }}
                >
                  Explore All Institutions <span>→</span>
                </a>
              </div>
            </div>

          </div>
        </div>
        {/* ── End Hero ─────────────────────────────────────────────────────── */}

        {/* About (and the rest of the page) slides up over the pinned hero
            only after the split has played and a medium hold has passed. */}
        <div
          id="about"
          data-about-section
          className="relative z-10 -mt-[100vh] bg-white shadow-[0_-16px_48px_rgba(11,19,42,0.12)]"
        >
          <section
            ref={aboutRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-16 lg:pt-20 px-4 sm:px-6"
          >
            <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">
              {/* Premium Editorial Accent Bar — overlaps image & content */}
              <div
                className="about-accent-bar"
                style={{
                  transform: aboutInView ? "scaleY(1)" : "scaleY(0)",
                }}
              />

              {/* Photo — top on mobile, right on desktop */}
              <div
                ref={aboutImgRef}
                className="relative z-5 shrink-0 rounded-2xl lg:rounded-none overflow-hidden order-1 lg:order-2"
                style={{
                  width: isMobile ? "min(92vw, 500px)" : ABOUT_IMG_W,
                  height: isMobile ? "320px" : ABOUT_IMG_H,
                  backgroundImage: "url(/aboutus.jfif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",

                  transform: isMobile
                    ? `translateY(${(1 - aboutSplit) * -30}px) scale(${0.95 + aboutSplit * 0.05})`
                    : `translateX(${(1 - aboutSplit) * 120}px) scale(${0.94 + aboutSplit * 0.06})`,

                  opacity: aboutSplit,
                  filter: `blur(${(1 - aboutSplit) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
                role="img"
                aria-label="About KIPS"
              />

              {/* Content — sits below photo on mobile and moves DOWN from center of photo on scroll */}
              <div
                className="relative z-10 flex min-h-[10px] flex-col justify-center bg-[#fefefe] py-7 px-6 sm:px-10 lg:pl-12 lg:pr-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:shadow-[8px_0_40px_rgba(0,0,0,0.08)] order-2 lg:order-1 rounded-2xl lg:rounded-none"
                style={{
                  width: isMobile ? "min(92vw, 500px)" : "min(32rem, 42vw)",
                  marginRight: isMobile ? 0 : `-${aboutOverlap}px`,
                  marginTop: isMobile ? "-50px" : 0,

                  transform: isMobile
                    ? `translateY(${(1 - aboutSplit) * 60}px)`
                    : `translateX(${(1 - aboutSplit) * -140}px)`,

                  opacity: aboutSplit,
                  filter: `blur(${(1 - aboutSplit) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: "#0082CF",
                    borderRadius: 2,
                    marginBottom: "1.5rem",

                    transform: `scaleX(${aboutSplit})`,
                    transformOrigin: "left",
                    transition: "transform 0.15s linear",
                  }}
                />

                <p
                  className="text-sm font-semibold tracking-[0.3em] text-[#0082CF] uppercase mb-4"
                  style={{
                    opacity: Math.min(1, aboutSplit * 1.5),
                    transform: `translateY(${(1 - aboutSplit) * 20}px)`,
                    transition: "opacity 0.15s linear, transform 0.15s linear",
                  }}
                >
                  Our Heritage
                </p>

                <h2
                  className="font-bold text-3xl sm:text-4xl text-gray-700 leading-tight"
                  style={{
                    opacity: Math.min(1, aboutSplit * 1.3),
                    transform: `translateY(${(1 - aboutSplit) * 25}px)`,
                    transition: "opacity 0.15s linear, transform 0.15s linear",
                  }}
                >
                  About KIPS
                </h2>

                <p
                  className="text-gray-600 mt-5 max-w-lg"
                  style={{
                    opacity: Math.min(
                      1,
                      Math.max(0, (aboutSplit - 0.15) * 1.4)
                    ),
                    transform: `translateY(${Math.max(
                      0,
                      (1 - aboutSplit) * 25
                    )}px)`,
                    transition: "opacity 0.15s linear, transform 0.15s linear",
                  }}
                >
                  KIPS is dedicated to providing quality education
                  and helping students achieve their academic and
                  professional goals.
                </p>

                <p
                  className="text-gray-600 mt-4 max-w-lg"
                  style={{
                    opacity: Math.min(
                      1,
                      Math.max(0, (aboutSplit - 0.25) * 1.4)
                    ),
                    transform: `translateY(${Math.max(
                      0,
                      (1 - aboutSplit) * 25
                    )}px)`,
                    transition: "opacity 0.15s linear, transform 0.15s linear",
                  }}
                >
                  We believe in innovation, excellence, and creating
                  opportunities for students.
                </p>

                {/* BUTTON */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 mt-7 px-6 py-3 border text-gray-600 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-[#0082CF] hover:text-white"
                  style={{
                    borderColor: "#0082CF",
                    width: "fit-content",

                    opacity: Math.min(
                      1,
                      Math.max(0, (aboutSplit - 0.7) * 3)
                    ),

                    transform: `
                      translateY(${Math.max(
                      0,
                      (1 - aboutSplit) * 20
                    )}px)
                    `,
                  }}
                >
                  Read More
                  <span>→</span>
                </a>
              </div>
            </div>
          </section>

          {/* =========================================================
    LEADERSHIP
    - Small framed section
    - Full CEO message shown at once
    - CEO exits right
    - MD enters from left
========================================================= */}

          <section
            ref={leadRef}
            className="relative z-10"
            style={{
              height: `${100 + LEAD_STEPS * 12}vh`,
            }}
          >
            {/* Sticky section */}
            <div className="sticky top-[10vh] flex h-[70vh] items-center justify-center">

              {/* =====================================================
        MAIN FRAME
    ====================================================== */}
              <div className="relative mx-[3vw] h-[62vh] w-full overflow-hidden mt-30 border border-[#0082CF] bg-white">


                {/* ===================================================
          CONTENT WINDOW
      ==================================================== */}
                <div className="relative h-full w-full overflow-hidden">

                  {/* =================================================
            CEO BLOCK
            Entire block moves RIGHT
        ================================================== */}
                  <div
                    className="absolute inset-0 flex items-center px-[6vw]"
                    style={{
                      transform: `translateX(${mdEnter * 100}%)`,
                      opacity: mdEnter > 4 ? 0 : 2,
                    }}
                  >

                    <div className="mx-auto grid w-full max-w-[1500px] grid-cols-[220px_1fr] items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
                      {/* ================================
                CEO IMAGE
            ================================= */}
                      <div className="flex justify-center">
                        <div className="relative h-[260px] w-[210px] overflow-hidden bg-[#f5f5f5] lg:h-[310px] lg:w-[250px]">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage:
                                "url(https://kips.edu.pk/wp-content/uploads/2025/01/CEO.webp)",
                            }}
                            role="img"
                            aria-label="Abid Wazir Khan, Chief Executive"
                          />
                        </div>
                      </div>
                      {/* ================================
                CEO MESSAGE
                FULL TEXT — NO LINE ANIMATION
            ================================= */}
                      <div>
                        <div className="max-w-[1000px]">
                          {CEO_LINES.map((line, i) => (
                            <p
                              key={`ceo-${i}`}
                              className=" mb-3 leading-snug text-[#0082CF]"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                        {/* CEO NAME */}
                        <div className="mt-7">
                          <h3 className="text-2xl font-bold text-[#0082CF] font-cormorant">
                            Abid Wazir Khan
                          </h3>
                          <p1 className="mt-1 text-md font-semibold text-black font-cormorant">
                            Chief Executive
                          </p1>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
            MANAGING DIRECTOR BLOCK
            Entire block comes FROM LEFT
        ================================================== */}
                  <div
                    className="absolute inset-0 flex items-center px-[6vw]"
                    style={{
                      transform: `translateX(${(mdEnter - 1) * 110}%)`,
                      opacity:
                        mdEnter < 0.05
                          ? 0
                          : Math.min(1, mdEnter * 1.5),
                    }}
                  >
                    <div className="mx-auto grid w-full max-w-[1500px] grid-cols-[220px_1fr] items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
                      {/* ================================
                MD IMAGE
            ================================= */}
                      <div className="flex justify-center">
                        <div className="relative h-[260px] w-[210px] overflow-hidden bg-[#f5f5f5] lg:h-[310px] lg:w-[250px]">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage: "url(/md.webp)",
                            }}
                            role="img"
                            aria-label="Managing Director"
                          />
                        </div>
                      </div>
                      {/* ================================
                MD MESSAGE
                FULL TEXT — NO LINE ANIMATION
            ================================= */}
                      <div>
                        <div className="max-w-[1000px]">
                          {MD_LINES.map((line, i) => (
                            <p
                              key={`md-${i}`}
                              className="
                      mb-3 leading-snug
                      text-[#0082CF] "
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                        {/* MD NAME */}
                        <div className="mt-7">
                          <h3 className="text-2xl font-bold text-[#0082CF] font-cormorant">
                            Salman Maqsood
                          </h3>
                          <p1 className="mt-1 text-md font-semibold text-black font-cormorant">
                            Managing Director
                          </p1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* =========================================================
    WHAT MAKES US KIPS
========================================================= */}

          <section className="relative mt-32 overflow-hidden bg-blue-400 py-24">

            {/* Heading */}
            <div className="mx-auto mb-20 max-w-4xl px-6 text-center">
              <h2 className="text-5xl font-black uppercase tracking-tight text-[#071b18] md:text-7xl lg:text-8xl">
                WHAT MAKES US
                <br />
                KIPS?
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#4b514b] md:text-lg">
                Discover the values, opportunities, and educational
                experience that make KIPS unique.
              </p>

            </div>


            {/* =========================================================
    MOVING CARDS
========================================================= */}

            <div className="kips-marquee relative w-full overflow-hidden">
              <div className="kips-marquee-track flex w-max">

                {/* FIRST SET */}
                {features.map((feature, index) => (
                  <div
                    key={`first-${feature.title}-${index}`}
                    className="kips-card group cursor-pointer mx-2 w-[300px] shrink-0 md:mx-4 md:w-[360px] lg:w-[400px]"
                    data-cursor="link"
                  >
                    <div className="relative h-[440px] md:h-[500px] overflow-hidden rounded-[2rem] bg-gray-900 p-3 md:p-5 flex flex-col justify-end shadow-xl border border-transparent group-hover:border-[#0082CF]/40 transition-colors duration-500">
                      {/* Image */}
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        priority={index === 0}
                        loading="eager"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 300px) 150px, (max-width: 360px) 200px, 250px"
                      />

                      {/* Dark Overlay for Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                      {/* White Responsive Overlay Card Spec */}
                      <div className="relative z-10 bg-white/15 backdrop-blur-sm rounded-3xl p-6 shadow-xl max-w-md w-full border border-white/40 group-hover:border-white/70 transition-all duration-300">
                        {/* Badge */}
                        <div className="inline-flex items-center bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                          KIPS
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-[#0e4b85] my-3 font-serif uppercase tracking-tight">
                          {feature.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {feature.description ||
                            "Building confidence, knowledge and opportunities for every learner."}
                        </p>

                        {/* Action Arrow */}
                        <div className="mt-4 flex justify-end">
                          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:bg-[#0082CF] group-hover:text-white group-hover:border-[#0082CF] transition-colors duration-300">
                            →
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}


                {/* DUPLICATE SET FOR INFINITE MARQUEE */}
                {features.map((feature, index) => (
                  <div
                    key={`second-${feature.title}-${index}`}
                    className="kips-card group cursor-pointer mx-2 w-[300px] shrink-0 md:mx-4 md:w-[360px] lg:w-[400px]"
                    data-cursor="link"
                  >
                    <div className="relative h-[440px] md:h-[500px] overflow-hidden rounded-[2rem] bg-gray-900 p-3 md:p-5 flex flex-col justify-end shadow-xl border border-transparent group-hover:border-[#0082CF]/40 transition-colors duration-500">
                      {/* Image */}
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 300px) 150px, (max-width: 360px) 200px, 250px"
                      />

                      {/* Dark Overlay for Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                      {/* White Responsive Overlay Card Spec */}
                      <div className="relative z-10 bg-white/15 backdrop-blur-sm rounded-3xl p-6 shadow-xl max-w-md w-full border border-white/40 group-hover:border-white/70 transition-all duration-300">
                        {/* Badge */}
                        <div className="inline-flex items-center bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                          KIPS
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-[#0e4b85] my-3 font-serif uppercase tracking-tight">
                          {feature.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {feature.description ||
                            "Building confidence, knowledge and opportunities for every learner."}
                        </p>

                        {/* Action Arrow */}
                        <div className="mt-4 flex justify-end">
                          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:bg-[#0082CF] group-hover:text-white group-hover:border-[#0082CF] transition-colors duration-300">
                            →
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>


            {/* View All */}
            <div className="mt-16 flex justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-8 py-3.5 border text-gray-600 bg-white text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:bg-[#0082CF] hover:text-white hover:border-[#0082CF]"
                style={{ borderColor: "#01090dff", width: "fit-content" }}
              >
                View All <span>→</span>
              </a>
            </div>

          </section>
          {/* =========================================================
    OUR PROJECTS
    Photo LEFT → Content RIGHT
    Scroll-driven animation like About KIPS
========================================================= */}

          <section
            ref={projectsRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-16 lg:pt-20 px-4 sm:px-6"
          >
            <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">

              {/* =====================================================
        PHOTO — TOP on mobile, LEFT on desktop
    ===================================================== */}

              <div
                ref={projectsImgRef}
                className="relative z-5 shrink-0 rounded-2xl lg:rounded-none overflow-hidden order-1"
                style={{
                  width: isMobile ? "min(92vw, 500px)" : ABOUT_IMG_W,
                  height: isMobile ? "320px" : ABOUT_IMG_H,

                  backgroundImage:
                    "url(/Projects-College-new.webp)",

                  backgroundSize: "cover",
                  backgroundPosition: "center",

                  transform: isMobile
                    ? `translateY(${(1 - projectsProgress) * -30}px) scale(${0.95 + projectsProgress * 0.05})`
                    : `translateX(${(1 - projectsProgress) * 120}px) scale(${0.94 + projectsProgress * 0.06})`,

                  opacity: projectsProgress,
                  filter: `blur(${(1 - projectsProgress) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
                role="img"
                aria-label="Our Projects"
              />

              {/* =====================================================
        CONTENT — BOTTOM on mobile (moves DOWN from center of image), RIGHT on desktop
    ===================================================== */}

              <div
                className="relative z-10 flex flex-col justify-center bg-[#fefefe] py-8 px-6 sm:px-10 lg:py-10 lg:pl-12 shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:shadow-[8px_0_40px_rgba(0,0,0,0.08)] order-2 rounded-2xl lg:rounded-none"
                style={{
                  width: isMobile ? "min(92vw, 500px)" : "min(38rem, 45vw)",

                  marginLeft: isMobile ? 0 : `-${aboutOverlap}px`,
                  marginTop: isMobile ? "-50px" : 0,

                  transform: isMobile
                    ? `translateY(${(1 - projectsProgress) * 60}px)`
                    : `translateX(${(1 - projectsProgress) * -140}px)`,

                  opacity: projectsProgress,
                  filter: `blur(${(1 - projectsProgress) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
              >

                {/* ===================================================
          ACCENT LINE
      =================================================== */}

                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: "#0082CF",
                    borderRadius: 2,
                    marginBottom: "1.5rem",

                    transform: `scaleX(${projectsProgress})`,
                    transformOrigin: "left",
                  }}
                />

                {/* ===================================================
          SMALL LABEL
      =================================================== */}

                <p
                  className="text-sm font-semibold tracking-[0.3em] text-[#0082CF] uppercase mb-4"
                  style={{
                    opacity: Math.min(1, projectsProgress * 1.5),
                    transform: `
            translateY(${(1 - projectsProgress) * 20}px)
          `,
                  }}
                >
                  Our Initiatives
                </p>

                {/* ===================================================
          HEADING
      =================================================== */}

                <h2
                  className="font-bold text-4xl text-gray-700 leading-tight"
                  style={{
                    opacity: Math.min(1, projectsProgress * 1.3),
                    transform: `
            translateY(${(1 - projectsProgress) * 25}px)
          `,
                  }}
                >
                  Our Projects
                </h2>

                {/* ===================================================
          DESCRIPTION
      =================================================== */}

                <p
                  className="text-gray-600 mt-5 max-w-lg"
                  style={{
                    opacity: Math.min(
                      1,
                      Math.max(0, (projectsProgress - 0.15) * 1.4)
                    ),

                    transform: `
            translateY(${Math.max(
                      0,
                      (1 - projectsProgress) * 25
                    )}px)
          `,
                  }}
                >
                  KIPS caters to a wide range of scholastic needs, providing
                  quality education and learning opportunities from Pre-School
                  to professional education.
                </p>

                {/* ===================================================
          PROJECT LIST
          Items reveal progressively
      =================================================== */}

                <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-gray-700 font-semibold">

                  {[
                    { name: "KIPS School", href: "https://kipsschool.com/" },
                    { name: "KIPS College", href: "https://kipscolleges.com/" },
                    { name: "KIPS Preparations", href: "https://kipsprep.com/" },
                    { name: "KIPS Publications", href: "https://kipspublications.com/" },
                    { name: "KIPS Virtual", href: "https://kipsvirtual.com/" },
                    { name: "KIPS Competitive Exams", href: "https://kipscss.com/" },
                    { name: "PAMIR Private School", href: "https://pamirprivateschool.org/" },
                    { name: "7Cs School", href: "https://7csschool.com/" },
                    { name: "KIPS Online School", href: "https://kipsonlineschool.com/" },
                    { name: "KIPS School Cambridge", href: "https://kipscc.edu.pk/" },
                  ].map(({ name, href }, index) => {

                    /*
                      Each item gets a slightly delayed reveal
                    */

                    const itemStart = 0.35 + index * 0.035;

                    const itemProgress = Math.min(
                      1,
                      Math.max(
                        0,
                        (projectsProgress - itemStart) / 0.35
                      )
                    );

                    return (
                      <li
                        key={name}
                        style={{
                          opacity: itemProgress,

                          transform: `
                  translateY(${(1 - itemProgress) * 15}px)
                `,

                          transition:
                            "opacity 0.2s linear, transform 0.2s linear",
                        }}
                      >
                        <a
                          href={href}
                          className="group/link flex items-center gap-2 py-1 transition-all duration-300 hover:text-[#0082CF] hover:translate-x-1"
                        >
                          <span className="text-[#0082CF] text-lg transition-transform duration-300 group-hover/link:translate-x-1">
                            →
                          </span>

                          {name}
                        </a>
                      </li>
                    );
                  })}

                </ul>


              </div>
            </div>
          </section>

          {/* =========================================================
              BY THE NUMBERS (DISCOVER KIPS) - Crimson background with outline icons & right vertical ribbon
          ========================================================= */}
          <section className="bg-blue-400 text-white py-24 px-6 relative overflow-hidden my-20">
            {/* Right Side Vertical Multi-Color Ribbon Stripes Design Accent */}
            <div className="absolute right-0 top-0 bottom-0 h-full flex z-20 pointer-events-none">
              <div className="w-3 sm:w-5 h-full bg-blue-400" />
              <div className="w-3 sm:w-0.5 h-full bg-black" />
              <div className="w-3 sm:w-3 h-full bg-white" />
              <div className="w-3 sm:w-0.5 h-full bg-black" />
              <div className="w-3 sm:w-3 h-full bg-blue-400" />
              <div className="w-3 sm:w-0.5 h-full bg-black" />
              <div className="w-3 sm:w-3 h-full bg-white" />
              <div className="w-3 sm:w-0.5 h-full bg-black" />
              <div className="w-3 sm:w-5 h-full bg-blue-400" />
            </div>
            <div className="max-w-6xl mx-auto text-center relative z-10 pr-6 sm:pr-16 lg:pr-24">
              <h2 className=" text-4xl sm:text-5xl font-bold tracking-tight text-white mb-16">
                By the Numbers
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 text-left max-w-5xl mx-auto">
                {/* Stat 1 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <svg className="w-14 h-14 text-amber-300 shrink-0 -ml-2" fill="none"
                      stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 100 100">
                      {/* Document outer frame with folded corner */}
                      <path d="M 20 18 H 50 L 70 38 V 82 H 20 Z" />
                      {/* Folded corner flap */}
                      <path d="M 50 18 V 38 H 70" />
                      {/* 'A' letter paths */}
                      <path d="M 29 68 L 37 46 L 45 68" />
                      <path d="M 32 60 H 42" />
                      {/* '+' sign paths */}
                      <path d="M 50 57 H 62" />
                      <path d="M 56 51 V 63" />
                    </svg>
                    <span className="font-cormorant text-4xl  font-bold tracking-tight text-white">
                      72%
                    </span>
                  </div>
                  <p className="text-sm text-white/85 leading-snug pl-1 ">
                    A+/A Result Achievers
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <svg className="w-11 h-11 text-amber-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5" />
                    </svg>
                    <span className="font-cormorant text-4xl  font-bold tracking-tight text-white">
                      70%
                    </span>
                  </div>
                  <p className="text-sm text-white/85 leading-snug pl-1">
                    Seats Secured In Top Universities By KIPSIANS
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <svg className="w-11 h-11 text-amber-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 14.6l7.74-4.453a.75.75 0 000-1.294L12 4.4 4.26 8.853a.75.75 0 000 1.294zM4.5 12.75V17.25C4.5 18.5 7.86 19.5 12 19.5s7.5-1 7.5-2.25V12.75" />
                    </svg>
                    <span className="font-cormorant text-4xl  font-bold tracking-tight text-white">
                      1M+
                    </span>
                  </div>
                  <p className="text-sm text-white/85 leading-snug pl-1">
                    Alumni Worldwide Leading Industries
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <svg className="w-11 h-11 text-amber-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m16.5-18v18M6.75 6.75h.008v.008H6.75V6.75zm0 3.75h.008v.008H6.75V10.5zm0 3.75h.008v.008H6.75v-.008zm0 3.75h.008v.008H6.75v-.008zm10.5-11.25h.008v.008h-.008V6.75zm0 3.75h.008v.008h-.008V10.5zm0 3.75h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008zM10.5 6.75h3v14.25h-3V6.75z" />
                    </svg>
                    <span className="font-cormorant text-4xl  font-bold tracking-tight text-white">
                      200+
                    </span>
                  </div>
                  <p className="text-sm text-white/85 leading-snug pl-1">
                    Campuses Across Major Cities of Pakistan
                  </p>
                </div>

                {/* Stat 5 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <svg className="w-13 h-13 text-amber-300 shrink-0 -mb-2" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 90 90">
                      {/* Outer truncated roof */}
                      <path d="M 16 43 L 34 23 L 66 23 L 84 43" />
                      {/* Center triangular gable */}
                      <path d="M 34 43 L 50 30 L 66 43" />
                      {/* Main building top horizontal line */}
                      <path d="M 16 43 H 84" />
                      {/* Main building outer frame */}
                      <path d="M 16 43 V 75 H 84 V 43" />
                      {/* Center circular window */}
                      <circle cx="50" cy="50" r="4.5" />
                      {/* Center arched doorway */}
                      <path d="M 43 75 V 63 A 7 7 0 0 1 57 63 V 75" />
                      {/* Doorway side vertical accents */}
                      <path d="M 38 48 V 63" />
                      <path d="M 62 48 V 63" />
                      {/* Left square windows */}
                      <rect x="23" y="48" width="9" height="9" rx="1" />
                      <rect x="23" y="61" width="9" height="9" rx="1" />
                      {/* Right square windows */}
                      <rect x="68" y="48" width="9" height="9" rx="1" />
                      <rect x="68" y="61" width="9" height="9" rx="1" />
                    </svg>
                    <span className="font-cormorant text-4xl font-bold tracking-tight text-white">
                      30+
                    </span>
                  </div>
                  <p className="text-sm text-white/85 leading-snug pl-1">
                    Years of Academic Excellence & Trust
                  </p>
                </div>

                {/* Stat 6 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <svg className="w-11 h-11 text-amber-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span className="font-cormorant text-4xl font-bold tracking-tight text-white">
                      100%
                    </span>
                  </div>
                  <p className="text-sm text-white/85 leading-snug pl-1">
                    Conceptual Clarity & Character Building
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
            OUR LOCATIONS (Same Design & Animations as Become a Partner / About KIPS)
          ========================================================= */}
          <section
            ref={locationsRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-16 lg:pt-20 px-4 mb-20 pb-20 sm:px-6"
          >
            <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">
              {/* Content — Left */}
              <div
                className="relative z-10 flex min-h-[10px] flex-col justify-center bg-[#fefefe] py-7 px-6 sm:px-10 lg:pl-12 lg:pr-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:shadow-[8px_0_40px_rgba(0,0,0,0.08)] order-2 lg:order-1 rounded-2xl lg:rounded-none pt-10 pb-10"

                style={{
                  width: isMobile ? "min(92vw, 500px)" : "min(32rem, 42vw)",
                  marginRight: isMobile ? 0 : `-${locationsOverlap}px`,
                  marginTop: isMobile ? "-50px" : 0,

                  transform: isMobile
                    ? `translateY(${(1 - locationsSplit) * 60}px)`
                    : `translateX(${(1 - locationsSplit) * -140}px)`,

                  opacity: locationsSplit,
                  filter: `blur(${(1 - locationsSplit) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: "#0082CF",
                    borderRadius: 2,
                    marginBottom: "1.5rem",

                    transform: `scaleX(${locationsSplit})`,
                    transformOrigin: "left",
                    transition: "transform 0.15s linear",
                  }}
                />

                <p
                  className="text-sm font-semibold tracking-[0.3em] text-[#0082CF] uppercase mb-4"
                  style={{
                    opacity: Math.min(1, locationsSplit * 1.5),
                    transform: `translateY(${(1 - locationsSplit) * 20}px)`,
                    transition: "opacity 0.15s linear, transform 0.15s linear",
                  }}
                >
                  Nationwide Network
                </p>

                <h2
                  className="font-bold text-3xl sm:text-4xl text-gray-700 leading-tight"
                  style={{
                    opacity: Math.min(1, locationsSplit * 1.3),
                    transform: `translateY(${(1 - locationsSplit) * 25}px)`,
                    transition: "opacity 0.15s linear, transform 0.15s linear",
                  }}
                >
                  Our Locations
                </h2>

                <p
                  className="text-gray-600 mt-5 max-w-lg "
                  style={{
                    opacity: Math.min(
                      1,
                      Math.max(0, (locationsSplit - 0.15) * 1.4)
                    ),
                    transform: `translateY(${Math.max(
                      0,
                      (1 - locationsSplit) * 25
                    )}px)`,
                    transition: "opacity 0.15s linear, transform 0.15s linear",
                  }}
                >
                  KIPS has established state-of-the-art campuses across major cities in Pakistan, bringing world-class educational facilities and expert guidance closer to students.
                </p>

              </div>

              {/* Photo / Map — Right */}
              <div
                ref={locationsImgRef}
                className="relative z-5 shrink-0 rounded-2xl lg:rounded-none overflow-hidden order-1 lg:order-2"
                style={{
                  width: isMobile ? "min(92vw, 500px)" : ABOUT_IMG_W,
                  height: isMobile ? "400px" : ABOUT_IMG_H,
                  backgroundImage: "url(/Map-1.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",

                  transform: isMobile
                    ? `translateY(${(1 - locationsSplit) * -30}px) scale(${0.95 + locationsSplit * 0.05})`
                    : `translateX(${(1 - locationsSplit) * 120}px) scale(${0.94 + locationsSplit * 0.06})`,

                  opacity: locationsSplit,
                  filter: `blur(${(1 - locationsSplit) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
                role="img"
                aria-label="Discover Our Locations"
              />
            </div>
          </section>

          {/* =========================================================
              BECOME A PARTNER (Same Design as Our Projects)
          ========================================================= */}
          <section
            ref={partnerRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-5 mt-30 px-4 sm:px-6 pb-20"
          >
            <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">

              {/* PHOTO — LEFT */}
              <div
                ref={partnerImgRef}
                className="relative z-5 shrink-0 rounded-2xl lg:rounded-none overflow-hidden order-1"
                style={{
                  width: isMobile ? "min(92vw, 500px)" : ABOUT_IMG_W,
                  height: isMobile ? "320px" : ABOUT_IMG_H,
                  backgroundImage: "url(partner.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",

                  transform: isMobile
                    ? `translateY(${(1 - partnerProgress) * -30}px) scale(${0.95 + partnerProgress * 0.05})`
                    : `translateX(${(1 - partnerProgress) * 120}px) scale(${0.94 + partnerProgress * 0.06})`,

                  opacity: partnerProgress,
                  filter: `blur(${(1 - partnerProgress) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
                role="img"
                aria-label="Become a Partner"
              />

              {/* CONTENT — RIGHT */}
              <div
                className="relative z-10 flex flex-col justify-center bg-[#fefefe] py-8 px-6 sm:px-10 lg:py-10 lg:pl-12 shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:shadow-[8px_0_40px_rgba(0,0,0,0.08)] order-2 rounded-2xl lg:rounded-none"
                style={{
                  width: isMobile ? "min(92vw, 500px)" : "min(38rem, 45vw)",

                  marginLeft: isMobile ? 0 : `-${partnerOverlap}px`,
                  marginTop: isMobile ? "-50px" : 0,

                  transform: isMobile
                    ? `translateY(${(1 - partnerProgress) * 60}px)`
                    : `translateX(${(1 - partnerProgress) * -140}px)`,

                  opacity: partnerProgress,
                  filter: `blur(${(1 - partnerProgress) * 10}px)`,

                  transition:
                    "transform 0.15s linear, opacity 0.15s linear, filter 0.15s linear",
                }}
              >

                {/* ACCENT LINE */}
                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: "#0082CF",
                    borderRadius: 2,
                    marginBottom: "1.5rem",

                    transform: `scaleX(${partnerProgress})`,
                    transformOrigin: "left",
                  }}
                />

                {/* SMALL LABEL */}
                <p
                  className="text-sm font-semibold tracking-[0.3em] text-[#0082CF] uppercase mb-4"
                  style={{
                    opacity: Math.min(1, partnerProgress * 1.5),
                    transform: `
                      translateY(${(1 - partnerProgress) * 20}px)
                    `,
                  }}
                >
                  Join Our Network
                </p>

                {/* HEADING */}
                <h2
                  className="font-bold text-3xl sm:text-4xl text-gray-700 leading-tight"
                  style={{
                    opacity: Math.min(1, partnerProgress * 1.3),
                    transform: `
                      translateY(${(1 - partnerProgress) * 25}px)
                    `,
                  }}
                >
                  Become a Partner
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="text-gray-600 mt-5 max-w-lg"
                  style={{
                    opacity: Math.min(
                      1,
                      Math.max(0, (partnerProgress - 0.15) * 1.4)
                    ),

                    transform: `
                      translateY(${Math.max(
                      0,
                      (1 - partnerProgress) * 25
                    )}px)
                    `,
                  }}
                >
                  Join the KIPS network and become part of a leading educational institution dedicated to academic brilliance, innovation, and empowering future leaders.
                </p>

                {/* BUTTON */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 mt-7 px-6 py-3 border text-gray-600 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-[#0082CF] hover:text-white"
                  style={{
                    borderColor: "#0082CF",
                    width: "fit-content",

                    opacity: Math.min(
                      1,
                      Math.max(0, (partnerProgress - 0.7) * 3)
                    ),

                    transform: `
                      translateY(${Math.max(
                      0,
                      (1 - partnerProgress) * 20
                    )}px)
                    `,
                  }}
                >
                  Get Started
                  <span>→</span>
                </a>

              </div>
            </div>
          </section>
        </div>

      </main >

      <Footer />
    </>
  );
}