/**
 * Purpose: Configuration Editor.
 * Allows customization of interior, exterior, and accessories.
 */
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import { vehicleService } from "../services/vehicleService";
import { Check, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";
import { useDispatch, useSelector } from "react-redux";
import { selectOption } from "../store/slices/configSlice";

const ModifyConfig = () => {
    const navigate = useNavigate();
    const { id: modelId } = useParams();
    const [searchParams] = useSearchParams();
    const qty = searchParams.get("qty") || 1;

    const [activeTab, setActiveTab] = useState("Interior");
    const [options, setOptions] = useState({ Interior: [], Exterior: [], Accessories: [] });
    const [loading, setLoading] = useState(true);
    const [imagePath, setImagePath] = useState(null);

    // Redux
    const dispatch = useDispatch();
    const {
        selectedModel,
        quantity,
        defaultComponents,
        selectedOptions,
        pricing
    } = useSelector((state) => state.config);

    // config and priceDeltas are now derived or direct from Redux
    // derivedConfig: map expected by the UI for value binding
    const config = Object.keys(selectedOptions).reduce((acc, outputBaseId) => {
        acc[outputBaseId] = selectedOptions[outputBaseId].optionId;
        return acc;
    }, {});

    useEffect(() => {
        const loadData = async () => {
            try {
                // Check Redux State first
                if (!selectedModel) {
                    navigate("/welcome");
                    return;
                }

                // Image Path Logic
                if (selectedModel.imagePath) {
                    const parts = selectedModel.imagePath.split('/');
                    setImagePath(`/images/${parts[parts.length - 1]}`);
                } else {
                    setImagePath(`/images/${selectedModel.name}.jpg`);
                }

                // Fetch Options
                const data = await vehicleService.getAllOptions(modelId);

                const formatOptions = (list) => Array.isArray(list) ? list : [];

                setOptions({
                    Interior: formatOptions(data.Interior),
                    Exterior: formatOptions(data.Exterior),
                    Accessories: formatOptions(data.Accessories),
                    Standard: formatOptions(data.Standard)
                });

                setLoading(false);

            } catch (error) {
                console.error("Failed to load options", error);
                setLoading(false);
            }
        };

        loadData();
    }, [modelId, navigate, qty, selectedModel]);

    // Helper to find the base component ID corresponding to a dropdown group
    const resolveBaseComponent = (group, defaults) => {
        // Strategy 1: Precise Match by ID
        if (defaults) {
            const matchById = defaults.find(defComp =>
                group.options.some(opt => opt.compId === defComp.id)
            );
            if (matchById) return { id: matchById.id, name: matchById.name };

            // Strategy 2: Name Match (Fallback)
            const matchByName = defaults.find(c => c.name === group.componentName);
            if (matchByName) return { id: matchByName.id, name: matchByName.name };
        }

        // Strategy 3: Fallback to First Option
        if (group.options && group.options.length > 0) {
            return { id: group.options[0].compId, name: group.componentName };
        }
        return null;
    };

    const handleOptionChange = (group, selectedOptionId) => {
        const optionList = group.options;
        const selectedOption = optionList.find(o => o.compId == selectedOptionId);

        // Resolve Base Component
        const baseComp = resolveBaseComponent(group, defaultComponents);

        if (!baseComp) {
            console.warn(`Could not resolve base component for group ${group.componentName}`);
            return;
        }

        // Dispatch Update to Redux
        // If selectedOption is undefined (cleared), pass null/undefined
        dispatch(selectOption({
            baseComponentId: baseComp.id,
            option: selectedOption ? {
                ...selectedOption, // contains compId, price, subType, etc.
                // Ensure we map fields if names differ slightly
            } : null
        }));
    };

    const handleConfirm = async () => {
        setLoading(true);
        try {
            // Construct Save DTO
            // Redux selectedOptions: { [baseId]: { optionId, ... } }
            // API expects: { compId (base), altCompId (opt) }
            const componentsList = Object.entries(selectedOptions).map(([baseId, optDetail]) => ({
                compId: parseInt(baseId),
                altCompId: optDetail.optionId
            }));

            if (componentsList.length > 0) {
                const saveDto = {
                    modelId: parseInt(modelId),
                    components: componentsList
                };
                await vehicleService.saveAlternateComponents(saveDto);
            }

            // Persistence for Invoice page if it still uses localStorage or just nav?
            // Invoice should now use Redux.
            // We can persist just in case of refresh on Invoice page (if we implement hydration there)
            // But Redux state is source of truth.

            navigate("/invoice");

        } catch (err) {
            console.error(err);
            alert("Failed to save configuration.");
        } finally {
            setLoading(false);
        }
    };

    // calculateTotalAddons and reconstructConfigForInvoice are no longer needed locally
    // as we use Redux 'pricing' state.

    if (!selectedModel) return null;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left: Configuration */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Modify Configuration</h1>
                            <div className="mt-4 aspect-video relative rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={imagePath}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Vehicle"; }}
                                    alt={selectedModel?.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <h2 className="text-2xl font-bold text-white">{selectedModel?.name}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-1 mb-6">
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

                        {/* Options List */}
                        <div className="space-y-4">
                            {options[activeTab].length === 0 ? (
                                <Card className="p-8 text-center border-dashed">
                                    <p className="text-slate-500">No options available for this category.</p>
                                </Card>
                            ) : (
                                options[activeTab].map((group, idx) => {
                                    // Robust base component resolution
                                    const baseComp = resolveBaseComponent(group, defaultComponents); // Use Redux defaultComponents

                                    // If we can't find the base component, we can't key the state, so warn and skip/hide?
                                    // Or show a disabled state? Showing it allows debugging.
                                    const currentVal = baseComp ? (config[baseComp.id] || "") : "";

                                    // If no base component found, we default to showing the dropdown but it won't save correctly.
                                    // We should visually indicate this if necessary, but "Select Option" is a good default.

                                    // Prepare options for Select component
                                    const selectOptions = [
                                        { value: "", label: "Select Option" },
                                        ...group.options.map(o => ({
                                            value: o.compId,
                                            // Fallback to componentName if subType is null (Backend mapping issue: maps to 'type' column which is NULL)
                                            label: `${o.subType || group.componentName} ${o.price > 0 ? `(+₹${o.price.toLocaleString()})` : ""}`
                                        }))
                                    ];

                                    return (
                                        <Card key={idx} className="p-6 bg-white dark:bg-slate-900 border-none shadow-sm flex items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-900 dark:text-white">{group.componentName}</h3>
                                                <p className="text-sm text-slate-500 mb-1">Select your preferred option</p>
                                                {!baseComp && (
                                                    <span className="text-xs text-red-500">
                                                        * Required base component not found in default configuration.
                                                    </span>
                                                )}
                                            </div>
                                            <div className="w-64">
                                                <Select
                                                    id={`opt-${idx}`}
                                                    value={currentVal}
                                                    onChange={(e) => handleOptionChange(group, e.target.value)}
                                                    options={selectOptions}
                                                    className="mb-0" // Override default margin
                                                    disabled={!baseComp}
                                                />
                                            </div>
                                        </Card>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Card className="p-6 bg-slate-900 text-white border-none shadow-2xl">
                                <h3 className="text-xl font-bold mb-6">Total Cost</h3>

                                <div className="space-y-3 text-sm mb-6 pb-6 border-b border-slate-700">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Base Price</span>
                                        <span>₹ {pricing.basePrice?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Add-ons Total</span>
                                        <span className="text-green-400 font-medium">+ ₹ {pricing.addOnsTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold pt-3 text-base">
                                        <span className="text-slate-300">Total Per Unit</span>
                                        <span>₹ {pricing.totalPerUnit.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 pt-1">
                                        <span>Quantity</span>
                                        <span>x {quantity}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg text-slate-300 font-medium">Grand Total</span>
                                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                        ₹ {pricing.grandTotal.toLocaleString()}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full justify-center h-12 text-base font-semibold group bg-white text-slate-900 hover:bg-slate-100 border-none"
                                        onClick={handleConfirm}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Confirm & Order"}
                                        {!loading && <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center border-slate-700 hover:bg-slate-800 text-slate-300"
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

export default ModifyConfig;
