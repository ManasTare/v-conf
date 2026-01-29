/**
 * Purpose: 404 Error Page.
 * Displayed when a user navigates to a non-existent route.
 */
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";
import notFoundImage from "../assets/PageNotFounf.png";

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background elements for premium feel */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto z-10"
            >
                <div className="relative mb-8 inline-block">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative z-10"
                    >
                        <img
                            src={notFoundImage}
                            alt="404 Page Not Found"
                            className="h-64 md:h-80 object-contain mx-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Decorative ring behind image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent dark:from-slate-800 rounded-full blur-2xl -z-10 opacity-60 transform scale-110"></div>
                </div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
                >
                    Oops! Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-md mx-auto leading-relaxed"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link to="/">
                        <Button size="lg" className="min-w-[160px] gap-2 shadow-lg shadow-blue-500/20">
                            <Home className="w-5 h-5" />
                            Go Home
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        size="lg"
                        className="min-w-[160px] gap-2"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
