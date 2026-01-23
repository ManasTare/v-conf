import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import { vehicleService } from "../services/vehicleService";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

const Configure = () => {
    const navigate = useNavigate();
    const [selection, setSelection] = useState(null);
    const [activeTab, setActiveTab] = useState("Interior");
    const [options, setOptions] = useState({ Interior: [], Exterior: [] });
    const [loading, setLoading] = useState(true);

    // Config State
    const [config, setConfig] = useState({
        "Interior": {},
        "Exterior": {}
    });

    useEffect(() => {
        const loadData = async () => {
            const stored = vehicleService.getSelection();
            if (!stored) {
                navigate("/welcome");
                return;
            }
            setSelection(stored);

            try {
                // Fetch options from backend based on model ID
                // Assuming stored.model.id exists. Adjust if stored data structure is different.
                const data = await vehicleService.getOptions(stored.model.id);
                // Expected data format from API: { Interior: [...], Exterior: [...] }
                // If API returns a different format, we might need to transform it here.
                setOptions(data || { Interior: [], Exterior: [] });
            } catch (error) {
                console.error("Failed to load options", error);
                // Fallback or error handling
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [navigate]);

    const handleOptionChange = (category, featureId, valueId, price) => {
        setConfig(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [featureId]: { value: valueId, price: price }
            }
        }));
    };

    const calculateTotal = () => {
        if (!selection) return 0;
        let total = selection.model.price; // Changed from base_price to price

        // Add config costs
        Object.values(config).forEach(category => {
            Object.values(category).forEach(item => {
                total += item.price;
            });
        });

        return total;
    };

    const handleConfirm = () => {
        // Save final config to storage to be picked up by Invoice
        const finalOrder = {
            ...selection,
            configuration: config,
            totalPricePerUnit: calculateTotal()
        };
        localStorage.setItem("final_order", JSON.stringify(finalOrder));
        navigate("/invoice");
    };

    if (!selection) return null; // Or a loading spinner for initial auth check

    return (
        <div className="py-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-12 gap-8">

                    {/* Left: Configuration Steps */}
                    <div className="md:col-span-8 space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configure Your {selection.model.name}</h1>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 dark:border-slate-800">
                            {["Standard Features", "Interior", "Exterior"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-6 py-3 font-medium text-sm transition-colors relative",
                                        activeTab === tab
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                                    )}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div layoutId="underline" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-600" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="py-6">
                            <AnimatePresence mode="wait">
                                {activeTab === "Standard Features" ? (
                                    <motion.div
                                        key="std"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <ul className="grid grid-cols-2 gap-4">
                                            {/* Ideally this list also comes from the backend or selection model details */}
                                            {["Manual Transmission", "Standard Wheels", "Halogen Headlights", "Fabric Seats", "Basic Audio System", "Manual AC"].map((feature, i) => (
                                                <li key={i} className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center">
                                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="options"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        {loading ? (
                                            <div className="text-center py-10">Loading configuration options...</div>
                                        ) : options[activeTab]?.length === 0 ? (
                                            <div className="text-center py-10 text-slate-500">No options available for this category.</div>
                                        ) : (
                                            options[activeTab]?.map((feature) => (
                                                <Card key={feature.id} className="p-6">
                                                    <h3 className="font-semibold mb-4 text-lg">{feature.label}</h3>
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        {feature.values.map((opt) => {
                                                            const isSelected = config[activeTab]?.[feature.id]?.value === opt.id || (!config[activeTab]?.[feature.id] && opt.price === 0);
                                                            return (
                                                                <div
                                                                    key={opt.id}
                                                                    onClick={() => handleOptionChange(activeTab, feature.id, opt.id, opt.price)}
                                                                    className={cn(
                                                                        "cursor-pointer rounded-lg border p-4 transition-all",
                                                                        isSelected
                                                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500"
                                                                            : "border-slate-200 dark:border-slate-800 hover:border-blue-300"
                                                                    )}
                                                                >
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="font-medium">{opt.label}</span>
                                                                        {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                                                                    </div>
                                                                    <div className="text-sm text-slate-500 mt-1">
                                                                        {opt.price === 0 ? "Included" : `+ ₹ ${opt.price.toLocaleString()}`}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </Card>
                                            ))
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Price Summary */}
                    <div className="md:col-span-4">
                        <div className="sticky top-24">
                            <Card className="p-6 bg-slate-900 text-white border-none shadow-2xl">
                                <h3 className="text-xl font-bold mb-6">Total Cost</h3>

                                <div className="space-y-3 text-sm mb-6 pb-6 border-b border-slate-700">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Base Price</span>
                                        <span>₹ {selection.model.base_price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Total Add-ons</span>
                                        <span className="text-green-400">+ ₹ {(calculateTotal() - selection.model.base_price).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold pt-2">
                                        <span className="text-slate-300">Price Per Unit</span>
                                        <span>₹ {calculateTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Quantity</span>
                                        <span>x {selection.quantity}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg text-slate-300">Grand Total</span>
                                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                        ₹ {(calculateTotal() * selection.quantity).toLocaleString()}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full justify-between group"
                                        onClick={handleConfirm}
                                    >
                                        Confirm Order
                                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full border-slate-700 hover:bg-slate-800 text-white"
                                        onClick={() => navigate("/default-config")}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Configure;
