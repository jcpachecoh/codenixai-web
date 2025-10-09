"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Get the current locale from the pathname
  const locale = pathname.split("/")[1];

  // Services dropdown items
  const serviceItems = [
    {
      href: `/${locale}/services/ai-automation`,
      label: t("services.services_1"),
    },
    {
      href: `/${locale}/services/custom-software`,
      label: t("services.services_2"),
    },
    {
      href: `/${locale}/services/ecommerce-marketplaces`,
      label: t("services.services_3"),
    },
    {
      href: `/${locale}/services/cloud-devops`,
      label: t("services.services_4"),
    },
    {
      href: `/${locale}/services/data-analytics`,
      label: t("services.services_5"),
    },
    {
      href: `/${locale}/services/ui-ux-branding`,
      label: t("services.services_6"),
    },
    {
      href: `/${locale}/services/training-workshops`,
      label: t("services.services_7"),
    },
  ];

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect for the header
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Navigation links (excluding services since it will be a dropdown)
  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/careers`, label: t("careers") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-3 glass" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Image
              src="/logo.svg"
              alt="CodenixAI Logo"
              width={480}
              height={120}
              priority
              className="h-16 md:h-24 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link
                href={link.href}
                className={`text-base font-medium transition-colors duration-300 hover:text-primary-blue ${
                  pathname === link.href ? "text-primary-blue" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className={`text-base font-medium transition-colors duration-300 hover:text-primary-blue flex items-center space-x-1 ${
                pathname.includes("/services")
                  ? "text-primary-blue"
                  : "text-white"
              }`}
            >
              <span>{t("services.title")}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isServicesDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isServicesDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-black/90 backdrop-blur-lg rounded-lg shadow-xl border border-gray-700 py-2 z-50"
              >
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-base text-white hover:bg-primary-blue/20 hover:text-primary-blue transition-colors duration-200"
                    onClick={() => setIsServicesDropdownOpen(false)} // Cierra el menú al hacer clic
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass mt-3"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors duration-300 hover:text-primary-blue ${
                  pathname === link.href ? "text-primary-blue" : "text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Services Menu */}
            <div className="border-t border-gray-700 pt-4">
              <div className="text-base font-medium text-white mb-2">
                {t("services")}
              </div>
              <div className="ml-4 space-y-2">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-base text-gray-300 hover:text-primary-blue transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
