import { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import ThemeToggle from "../themeButton";

// Custom easing from reference: cubic-bezier(0.16, 1, 0.3, 1)
const EASE_EDITORIAL = [0.16, 1, 0.3, 1];

const backdropVariants = {
  open: {
    opacity: 1,
    pointerEvents: "auto",
    transition: { duration: 0.5, ease: EASE_EDITORIAL },
  },
  closed: {
    opacity: 0,
    pointerEvents: "none",
    transition: { duration: 0.45, ease: EASE_EDITORIAL },
  },
};

const reducedBackdropVariants = {
  open: { opacity: 1, pointerEvents: "auto", transition: { duration: 0.1 } },
  closed: { opacity: 0, pointerEvents: "none", transition: { duration: 0.1 } },
};

const panelVariants = {
  open: {
    x: 0,
    pointerEvents: "auto",
    transition: { duration: 0.55, ease: EASE_EDITORIAL },
  },
  closed: {
    x: "100%",
    pointerEvents: "none",
    transition: { duration: 0.5, ease: EASE_EDITORIAL },
  },
};

const reducedPanelVariants = {
  open: { opacity: 1, x: 0, pointerEvents: "auto", transition: { duration: 0.1 } },
  closed: { opacity: 0, x: 0, pointerEvents: "none", transition: { duration: 0.1 } },
};

const listVariants = {
  open: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.15,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EDITORIAL,
    },
  },
  closed: {
    opacity: 0,
    y: 22,
    transition: {
      duration: 0.3,
      ease: EASE_EDITORIAL,
    },
  },
};

const reducedItemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.1 } },
  closed: { opacity: 0, y: 0, transition: { duration: 0.1 } },
};

export default function MobileMenu({
  isOpen,
  onClose,
  activeLink,
  navLinks,
  clubLinks,
  triggerRef,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const closeBtnRef = useRef(null);
  const wasOpenRef = useRef(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Programmatic navigation: close menu first, then navigate.
  const handleLinkClick = (e, to) => {
    e.preventDefault();
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    onClose();
    navigate(to);

    // Release the lock after the exit animation completes
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 600);
  };

  // Check user OS preference for reduced motion — computed once, stable across renders
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Handle ESC key, body scroll locking, and accessible focus restoration
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus({ preventScroll: true });
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      document.body.style.overflow = "";
      triggerRef?.current?.focus({ preventScroll: true });
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
        return;
      }

      // Accessible Focus Trap within modal dialog
      if (e.key === "Tab" && isOpen && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!mounted || typeof document === "undefined" || !document.body) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          id="mobile-menu-portal"
          className="fixed inset-0 z-[99999] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          ref={menuRef}
        >
          {/* 1. Atmospheric Blurred Backdrop (Fades in/out) */}
          <motion.div
            key="mobile-backdrop"
            initial="closed"
            animate="open"
            exit="closed"
            variants={prefersReducedMotion ? reducedBackdropVariants : backdropVariants}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* 2. Full-Height Editorial Panel (Slides in from Right with 100% Solid Opaque Background) */}
          <motion.div
            key="mobile-panel"
            initial="closed"
            animate="open"
            exit="closed"
            variants={prefersReducedMotion ? reducedPanelVariants : panelVariants}
            className="absolute top-0 right-0 w-full sm:w-[380px] sm:max-w-[380px] h-[100dvh] bg-white dark:bg-[#0F172A] border-l border-primary/20 shadow-[-12px_0_40px_rgba(0,0,0,0.35)] flex flex-col justify-between p-6 sm:p-7 overflow-y-auto z-10"
            style={{
              paddingTop: "calc(1.25rem + env(safe-area-inset-top, 0px))",
              paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {/* Panel Top Header: Brand Info + Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-primary/10">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 group"
              >
                <img
                  src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png"
                  alt="Rotaract Club Logo"
                  className="h-9 w-9 object-contain group-hover:rotate-12 transition-transform duration-300"
                />
                <div className="flex flex-col">
                  <span className="font-black text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                    ROTARACT CLUB
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                    OF TCET • RID 3141
                  </span>
                </div>
              </Link>

              <button
                type="button"
                ref={closeBtnRef}
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-foreground hover:text-primary hover:bg-primary/10 transition-colors text-xs font-bold tracking-wider uppercase border border-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Panel Navigation: Staggered Links */}
            <nav className="my-auto py-6" aria-label="Mobile Navigation List">
              <motion.ul
                variants={prefersReducedMotion ? undefined : listVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col space-y-1"
              >
                {navLinks.map((link) => {
                  const isActive = activeLink === link.name;
                  return (
                    <motion.li
                      key={link.name}
                      variants={prefersReducedMotion ? reducedItemVariants : itemVariants}
                      className="border-b border-primary/10 last:border-b-0"
                    >
                      <a
                        href={link.to}
                        onClick={(e) => handleLinkClick(e, link.to)}
                        className={`group flex items-center justify-between py-3.5 px-2 rounded-xl transition-all duration-300 ${isActive
                          ? "text-primary font-black"
                          : "text-foreground font-bold hover:text-primary"
                          }`}
                      >
                        <span className="text-xl tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                          {link.name}
                        </span>
                        <ArrowRight
                          className={`w-5 h-5 text-primary transition-all duration-300 ${isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                            }`}
                          aria-hidden="true"
                        />
                      </a>
                    </motion.li>
                  );
                })}

                {/* Club Hub Expandable Item */}
                <motion.li
                  variants={prefersReducedMotion ? reducedItemVariants : itemVariants}
                  className="border-b border-primary/10"
                >
                  <button
                    type="button"
                    onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
                    className={`group w-full flex items-center justify-between py-3.5 px-2 rounded-xl transition-all duration-300 ${activeLink === "Club hub" || isClubDropdownOpen
                      ? "text-primary font-black"
                      : "text-foreground font-bold hover:text-primary"
                      }`}
                    aria-expanded={isClubDropdownOpen}
                    aria-label="Toggle Club Hub submenu"
                  >
                    <span className="text-xl tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                      Club Hub
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 ${isClubDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Club Hub Sublinks Accordion */}
                  <AnimatePresence>
                    {isClubDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pr-2 py-2 mb-2 bg-primary/5 rounded-2xl flex flex-col gap-1 border border-primary/10">
                          {clubLinks.map((link) => (
                            <a
                              key={link.name}
                              href={link.to}
                              onClick={(e) => handleLinkClick(e, link.to)}
                              className="flex items-center justify-between py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors font-semibold text-sm"
                            >
                              <span>{link.name}</span>
                              <span className="text-xs text-muted font-normal">
                                {link.desc ? link.desc.slice(0, 22) + "..." : ""}
                              </span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>

                {/* Become a member CTA Item */}
                <motion.li
                  variants={prefersReducedMotion ? reducedItemVariants : itemVariants}
                  className="pt-4"
                >
                  <a
                    href="/join"
                    onClick={(e) => handleLinkClick(e, "/join")}
                    className="btn-rotaract flex justify-center items-center w-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold py-3.5 px-4 rounded-2xl shadow-[0_0_15px_rgba(234,88,12,0.35)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all tracking-wide text-base"
                  >
                    Become a member!
                  </a>
                </motion.li>

                {/* Dedicated Mobile Theme Control Row (Reference Style) */}
                <motion.li
                  variants={prefersReducedMotion ? reducedItemVariants : itemVariants}
                  className="pt-4 mt-2 border-t border-primary/10"
                >
                  <div className="flex items-center justify-between px-2 py-1">
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-wider text-foreground">
                        APPEARANCE
                      </span>
                      <span className="text-[10px] font-bold text-muted tracking-widest uppercase">
                        DAY / NIGHT TOGGLE
                      </span>
                    </div>
                    <ThemeToggle />
                  </div>
                </motion.li>
              </motion.ul>
            </nav>

            {/* Panel Bottom Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-primary/10 text-[10px] font-bold tracking-widest text-muted uppercase">
              <span>ROTARACT CLUB OF TCET</span>
              <span>2026-2027</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  activeLink: PropTypes.string,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
  clubLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      desc: PropTypes.string,
      icon: PropTypes.elementType,
    })
  ).isRequired,
  triggerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
