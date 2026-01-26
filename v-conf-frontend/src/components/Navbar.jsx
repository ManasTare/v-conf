import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";
import logo from "../assets/BlueLogo.png"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("access_token");

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/#about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="V-CONF Logo"
                            className="h-32 w-auto object-contain hover:opacity-90 transition-opacity translate-y-4"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm">Register Company</Button>
                                </Link>
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/welcome">
                                    <Button variant="primary" size="sm">Dashboard</Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hover:bg-red-600 hover:text-white hover:border-red-600 dark:hover:bg-red-600 dark:hover:border-red-600 transition-colors"
                                    onClick={() => {
                                        import("../services/authService").then(({ authService }) => {
                                            authService.logout();
                                        });
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden border-t border-white/10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md"
                >
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm font-medium text-slate-600"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)}>
                                        <Button variant="primary" className="w-full">Register Company</Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Link to="/welcome" onClick={() => setIsOpen(false)}>
                                        <Button variant="primary" className="w-full">Dashboard</Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="w-full hover:bg-red-600 hover:text-white hover:border-red-600 dark:hover:bg-red-600 dark:hover:border-red-600 transition-colors"
                                        onClick={() => {
                                            import("../services/authService").then(({ authService }) => {
                                                authService.logout();
                                            });
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;