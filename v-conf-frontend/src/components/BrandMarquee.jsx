import { motion } from "framer-motion";
import bmw from "../assets/BMW.jpeg";
import ford from "../assets/Ford.jpeg";
import honda from "../assets/Honda.jpeg";
import hyundai from "../assets/Hyundai.jpeg";
import mahindra from "../assets/Mahindra.jpeg";
import tata from "../assets/TATA.jpeg";

const brands = [
    { name: "BMW", logo: bmw },
    { name: "Ford", logo: ford },
    { name: "Honda", logo: honda },
    { name: "Hyundai", logo: hyundai },
    { name: "Mahindra", logo: mahindra },
    { name: "TATA", logo: tata },
];

const BrandMarquee = () => {
    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Explore Our Premium Brands</h2>
                    <p className="text-slate-500 mt-2">Partnered with the world's leading manufacturers.</p>
                </div>
                {/* Optional Action or Link */}
            </div>

            <div className="relative flex w-full">
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: "-33.33%" }}
                    // We have 3 sets of items. Moving by 33.33% moves exactly one full set length.
                    style={{ width: "max-content" }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20, // Adjust speed (seconds)
                            ease: "linear",
                        },
                    }}
                >
                    {/* Render list twice for seamless loop */}
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className="w-[200px] h-[160px] flex-shrink-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-default"
                        >
                            <div className="h-16 flex items-center justify-center mb-4">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                                />
                            </div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{brand.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandMarquee;
