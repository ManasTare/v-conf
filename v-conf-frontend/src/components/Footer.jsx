/**
 * Purpose: Application Footer.
 * Displays social links, site map, and language selector.
 */
import { Facebook, Instagram, Twitter, Mail, Youtube, Globe } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { useI18n } from "../context/I18nContext";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { language, changeLanguage, i18n } = useI18n();
    const t = i18n.footer || {};

    const socialLinks = [
        { icon: Facebook, label: "Facebook" },
        { icon: Instagram, label: "Instagram" },
        { icon: Twitter, label: "Twitter" },
        { icon: Mail, label: "Email" },
        { icon: Youtube, label: "YouTube" }
    ];

    const footerLinks = [
        { label: t.sitemap || "Sitemap", path: "/sitemap" },
        { label: t.privacy || "Privacy Policy", path: "#" },
        { label: t.terms || "Terms of Service", path: "#" },
        { label: t.contact || "Contact Us", path: "/contact" },
        { label: t.support || "Enterprise Support", path: "#" }
    ];

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'mr', label: 'Marathi' },
        { code: 'fr', label: 'French' }
    ];

    return (
        <footer className="w-full border-t border-white/20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md mt-auto">
            <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center space-y-4">

                {/* Branding / Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                        V-CONF
                    </h2>
                    <p className="text-sm font-medium text-slate-500">
                        Enterprise Vehicle Configuration Platform
                    </p>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                    {footerLinks.map((link, idx) => (
                        link.path.startsWith("/") ? (
                            <Link
                                key={idx}
                                to={link.path}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <button
                                key={idx}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {link.label}
                            </button>
                        )
                    ))}
                </motion.div>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    {socialLinks.map((social) => (
                        <button
                            key={social.label}
                            aria-label={social.label}
                            className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                        >
                            <social.icon size={20} strokeWidth={2} />
                        </button>
                    ))}

                    {/* Language Switcher Dropdown */}
                    <div className="relative group ml-4">
                        <select
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="appearance-none flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-600 font-semibold text-sm hover:border-slate-900 dark:hover:border-slate-100 transition-colors bg-transparent text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                        <Globe size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                    </div>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="pt-2 text-xs font-semibold text-slate-400 tracking-wide"
                >
                    Copyright © {currentYear} V-CONF, Inc.
                </motion.div>
            </div>
        </footer>
    );
};


export default Footer;
