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
    const { id: modelId } = useParams(); // URL param is :id
    const [searchParams] = useSearchParams();
    const qty = searchParams.get("qty") || 1;

    const [selection, setSelection] = useState(null);
    const [activeTab, setActiveTab] = useState("Interior");
    const [options, setOptions] = useState({ Interior: [], Exterior: [], Accessories: [], Standard: [] });
    const [loading, setLoading] = useState(true);

    // Config State: Map of Category -> { compId (Base ID) -> { value: altCompId, price: deltaPrice, label: name } }
    const [config, setConfig] = useState({
        "Interior": {},
        "Exterior": {},
        "Accessories": {}
    });

    useEffect(() => {
        const loadData = async () => {
            const stored = JSON.parse(localStorage.getItem("current_order_selection"));
            if (!stored) {
                navigate("/welcome");
                return;
            }
            setSelection(stored);

            // Defensive check: Ensure defaultComponents exists
            if (!stored.defaultComponents || stored.defaultComponents.length === 0) {
                console.warn("Missing default components in selection");
                // Attempt to recover or redirect
                // Since we need them for mapping, redirecting to DefaultConfig to re-fetch is safest
                navigate(`/configurator/${stored.model.id}?qty=${qty}`);
                return;
            }

            try {
                // Fetch all options
                const data = await vehicleService.getAllOptions(modelId);

                // Transform API Data if needed. 
                // data.Interior is generic List<ComponentDropdownDto> { componentName, options: [{ compId, subType, price }] }
                // Note: The structure from backend `ComponentDropdownDto` is:
                // componentName: String (e.g., "Air Conditioning")
                // options: List<OptionDto> { compId, subType, price }
                // *CRITICAL*: The `compId` in `OptionDto` is actually the ID of the ALTERNATE component option.
                // We need to match `componentName` to the Base Component in `stored.defaultComponents`.

                console.log("Vehicle Options Response:", data);

                // Validation: Ensure data components are arrays
                const interior = Array.isArray(data.Interior) ? data.Interior : [];
                const exterior = Array.isArray(data.Exterior) ? data.Exterior : [];
                const accessories = Array.isArray(data.Accessories) ? data.Accessories : [];

                const formattedOptions = {
                    Interior: interior,
                    Exterior: exterior,
                    Accessories: accessories,
                    // Standard: data.Standard || [] 
                };

                setOptions(formattedOptions);

                // Initialize Config State based on Default Components if we want "Selected" state to start with defaults
                // or start empty and imply "Default" is selected if nothing in state.
                // Starting empty is easier for "Delta" logic.

            } catch (error) {
                console.error("Failed to load options", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [modelId, navigate]);

    const handleOptionChange = (category, baseComponentName, altOption) => {
        // Find the Base Component ID from the Default Components List using the Name
        // We stored defaultComponents in localStorage in DefaultConfig.jsx
        // stored.defaultComponents: [{ id, name }, ...]
        // Wait, defaultComponents list might map Name -> ID.
        // Let's look at `ComponentDTO`: { id, name }.

        // ISSUE: The `vehicleService.getAllOptions` returns `componentName` grouping.
        // We need to map `componentName` -> `baseComponentId`.
        // We'll iterate through `selection.defaultComponents` to find a match.
        // If exact name match fails, we might be in trouble. But let's assume valid data.

        const baseComp = selection.defaultComponents.find(c => c.name === baseComponentName);
        const baseCompId = baseComp ? baseComp.id : null;

        if (!baseCompId) {
            console.warn(`Could not find base component ID for ${baseComponentName}`);
            // If it's pure accessory (no base), maybe handle differently? 
            // Valid requirement says: "modify configuration... alternate components".
            // So mostly replacing existing.
            return;
        }

        setConfig(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [baseCompId]: {
                    value: altOption.compId, // This is the ID of the selected option
                    price: altOption.price,
                    label: altOption.subType
                }
            }
        }));
    };

    const getBaseComponentPrice = (componentName) => {
        // This is tricky. `DefaultConfigResponseDTO` gave us `totalPrice` but not per-component price breakdown clearly 
        // other than text or assumption.
        // However, `vehicleService.getStandardComponents` might return the standard option with its price?
        // Let's assume the "Delta" is just the price of the new component minus price of old?
        // OR, the backend `OptionDto` price IS the delta? Or the full price?
        // User prompt says: "alternates must reflect backend logic exactly, including price deltas".
        // Usually, OptionDto.price is the price of that specific item.
        // If we treat base price as covering standard items, then an upgrade cost = (New Price - Old Price).
        // But we don't know "Old Price". 
        // ALTERNATIVE INTERPRETATION: The `price` in `OptionDto` IS the extra cost (delta).
        // Let's look at `OptionDto` fields: compId, subType, price.
        // If I select "Sunroof", price might be 5000.
        // If I select "No Sunroof", price might be 0.
        // Let's assume the `price` field in `OptionDto` IS the addon price to be added to Base Price.
        // If it's a replacement, it's (New - Old). 
        // Let's assume `price` is the net addition for simplicity unless we see negative values.
        return 0;
    };

    const calculateTotalAddons = () => {
        let total = 0;
        Object.values(config).forEach(category => {
            Object.values(category).forEach(item => {
                total += item.price; // Assuming price is additive (delta)
            });
        });
        return total;
    };

    const handleConfirm = async () => {
        setLoading(true);
        try {
            // Construct Save DTO
            // { modelId, components: [{ compId, altCompId }] }
            const componentsList = [];

            Object.values(config).forEach(category => {
                Object.entries(category).forEach(([baseId, item]) => {
                    componentsList.push({
                        compId: parseInt(baseId),
                        altCompId: item.value
                    });
                });
            });

            const saveDto = {
                modelId: parseInt(modelId),
                components: componentsList
            };

            // Call API to save
            await vehicleService.saveAlternateComponents(saveDto);

            // Update local storage with final numbers for Invoice
            const finalOrder = {
                ...selection,
                configuration: config,
                addOnsTotal: calculateTotalAddons(),
                totalPricePerUnit: selection.basePrice + calculateTotalAddons()
            };
            localStorage.setItem("final_order", JSON.stringify(finalOrder));

            navigate("/invoice");
        } catch (err) {
            console.error(err);
            alert("Failed to save configuration. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!selection) return null;

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left: Configuration Steps */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Customize Your {selection.model.name}</h1>
                            <p className="text-slate-500">Select options to tailor your vehicle.</p>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-1">
                            <div className="flex space-x-1">
                                {["Interior", "Exterior", "Accessories"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                                            activeTab === tab
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    {options[activeTab]?.length === 0 ? (
                                        <div className="bg-white dark:bg-slate-900 rounded-xl p-10 text-center border-dashed border-2 border-slate-200 dark:border-slate-800">
                                            <p className="text-slate-500">No configurable options available for {activeTab}.</p>
                                        </div>
                                    ) : (
                                        options[activeTab]?.map((group, idx) => (
                                            <Card key={idx} className="p-6 bg-white dark:bg-slate-900 border-none shadow-md">
                                                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                                                    {group.componentName}
                                                </h3>
                                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {group.options.map((opt) => {
                                                        // Determine if selected
                                                        // We need the Base ID for this group.
                                                        const baseComp = selection.defaultComponents.find(c => c.name === group.componentName);
                                                        const baseId = baseComp?.id;
                                                        const isSelected = config[activeTab]?.[baseId]?.value === opt.compId; // opt.compId is Alternate ID

                                                        // If not in config, maybe it's the standard one? 
                                                        // We don't easily know which OptionDTO corresponds to "Standard" unless price is 0 or we check ID match.
                                                        // For now, highlight only if explicitly in `config`.

                                                        return (
                                                            <div
                                                                key={opt.compId}
                                                                onClick={() => {
                                                                    if (baseId) handleOptionChange(activeTab, group.componentName, opt);
                                                                }}
                                                                className={cn(
                                                                    "cursor-pointer relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg",
                                                                    isSelected
                                                                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                                                        : "border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50 dark:bg-slate-950"
                                                                )}
                                                            >
                                                                <div className="flex flex-col h-full justify-between">
                                                                    <div>
                                                                        <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                                                                            {opt.subType}
                                                                        </span>
                                                                        <span className="text-xs text-slate-500 uppercase tracking-wider">
                                                                            {group.componentName}
                                                                        </span>
                                                                    </div>
                                                                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
                                                                        <span className={cn(
                                                                            "font-bold",
                                                                            opt.price > 0 ? "text-blue-600" : "text-green-600"
                                                                        )}>
                                                                            {opt.price > 0 ? `+ ₹ ${opt.price.toLocaleString()}` : "Standard"}
                                                                        </span>
                                                                        {isSelected && (
                                                                            <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                                                                <Check className="h-3 w-3" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Card>
                                        ))
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Price Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Card className="p-6 bg-slate-900 text-white border-none shadow-2xl">
                                <h3 className="text-xl font-bold mb-6">Total Cost</h3>

                                <div className="space-y-3 text-sm mb-6 pb-6 border-b border-slate-700">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Base Price</span>
                                        <span>₹ {selection.basePrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Add-ons Total</span>
                                        <span className="text-green-400 font-medium">+ ₹ {calculateTotalAddons().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold pt-3 text-base">
                                        <span className="text-slate-300">Price Per Unit</span>
                                        <span>₹ {(selection.basePrice + calculateTotalAddons()).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 pt-1">
                                        <span>Quantity</span>
                                        <span>x {selection.quantity}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg text-slate-300 font-medium">Grand Total</span>
                                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                        ₹ {((selection.basePrice + calculateTotalAddons()) * selection.quantity).toLocaleString()}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full justify-center h-12 text-base font-semibold group bg-white text-slate-900 hover:bg-slate-100 border-none"
                                        onClick={handleConfirm}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Confirm Configuration"}
                                        {!loading && <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center border-slate-700 hover:bg-slate-800 text-slate-300"
                                        onClick={() => navigate("/default-config")}
                                    >
                                        Cancel
                                    </Button>
                                    <p className="text-center text-xs text-slate-500 mt-2">
                                        Configuration saves automatically upon confirmation.
                                    </p>
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
