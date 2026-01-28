import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { ArrowRight, CarFront, SlidersHorizontal, FileText, ShieldCheck } from "lucide-react";
import Card from "../components/ui/Card";

import BrandMarquee from "../components/BrandMarquee";

import HeroImg from "../assets/HeroImG.jpeg";

const Home = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative h-[85vh] min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={HeroImg}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Light overlay to keep image visible but text readable */}
                    <div className="absolute inset-0 bg-slate-900/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20" />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-5xl px-4"
                >
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-48 drop-shadow-xl leading-snug">
                        Enterprise-Ready <br />
                        <span className="text-slate-200">Vehicle Configuration Platform</span>
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                        <Link to="/welcome">
                            <Button variant="outline" size="lg" className="rounded-full px-8 border-white/40 text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm min-w-[180px] h-14 text-lg">
                                Start Configuring
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button size="lg" className="rounded-full px-8 shadow-xl shadow-blue-600/20 bg-blue-600 hover:bg-blue-500 text-white min-w-[180px] h-14 text-lg">
                                Register Company
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Brands Section */}
            <BrandMarquee />

            {/* Features / Intro */}
            <section id="about" className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Complete Vehicle Configuration Solution</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Our comprehensive system provides everything you need for professional vehicle configuration, from selection to invoice generation.</p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {[
                        {
                            title: "Vehicle Selection",
                            desc: "Choose from multiple segments, manufacturers, and models with detailed specifications.",
                            icon: CarFront,
                            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        },
                        {
                            title: "Custom Configuration",
                            desc: "Configure interior, exterior, and standard features with real-time pricing updates.",
                            icon: SlidersHorizontal,
                            color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        },
                        {
                            title: "Invoice Generation",
                            desc: "Generate professional invoices with detailed pricing and tax calculations.",
                            icon: FileText,
                            color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        },
                        {
                            title: "Secure Platform",
                            desc: "Enterprise-grade security with user authentication and data protection.",
                            icon: ShieldCheck,
                            color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                        }
                    ].map((feature, idx) => (
                        <motion.div key={idx} variants={item} className="h-full">
                            <Card hover className="h-full flex flex-col items-center text-center p-8 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
