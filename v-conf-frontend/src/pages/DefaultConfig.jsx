import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { defaultConfigService } from "../services/defaultConfigService";
import { Settings, Check, Edit3 } from "lucide-react";

const DefaultConfig = () => {
    const navigate = useNavigate();
    const { modelId } = useParams();
    const [searchParams] = useSearchParams();
    const qty = searchParams.get("qty");

    const [configData, setConfigData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePath, setImagePath] = useState(null);

    useEffect(() => {
        if (!modelId || !qty) {
            navigate("/welcome");
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch default components list from the correct backend endpoint
                const componentsList = await defaultConfigService.getDefaultConfig(modelId);

                // Retrieve model details from local storage as the backend list endpoint is minimal
                const currentSelection = JSON.parse(localStorage.getItem("current_order_selection"));

                if (!currentSelection || !currentSelection.model) {
                    throw new Error("Missing model selection data");
                }

                const model = currentSelection.model;
                const quantity = parseInt(qty) || 1;

                // Construct a full configuration object merging backend list + local model data
                const constructedData = {
                    modelName: model.name,
                    manufacturerName: currentSelection.manufacturer ? currentSelection.manufacturer.name : "",
                    segmentName: currentSelection.segment ? currentSelection.segment.name : "",
                    defaultComponents: componentsList,
                    basePrice: model.price,
                    minQuantity: model.minQty,
                    totalPrice: model.price * quantity,
                    imagePath: model.imagePath
                };

                setConfigData(constructedData);

                // Image Path Logic
                let finalImagePath = `/images/${model.name}.jpg`;
                if (model.imagePath) {
                    const parts = model.imagePath.split('/');
                    const fileName = parts[parts.length - 1];
                    finalImagePath = `/images/${fileName}`;
                }
                setImagePath(finalImagePath);

                // Update current selection with the fetched components
                const updatedSelection = {
                    ...currentSelection,
                    defaultComponents: componentsList,
                    basePrice: model.price
                };
                localStorage.setItem("current_order_selection", JSON.stringify(updatedSelection));

            } catch (err) {
                console.error(err);
                setError("Failed to load default configuration.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [modelId, qty, navigate]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="text-red-500 font-medium">{error}</div>
        </div>
    );

    if (!configData) return null;

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Default Configuration</h1>
                    <p className="text-slate-500 mt-2">Review standard features and pricing for your {configData.modelName}.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Image and Details */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Image Card */}
                        <Card className="overflow-hidden bg-white dark:bg-slate-900 border-none shadow-xl">
                            <div className="aspect-video relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <img
                                    src={imagePath}
                                    alt={configData.modelName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/600x400?text=No+Image+Available"; // Fallback
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                                    <h2 className="text-2xl font-bold">{configData.manufacturerName} {configData.modelName}</h2>
                                    <p className="opacity-90">{configData.segmentName}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Standard Components List */}
                        <Card className="p-0 overflow-hidden shadow-lg border-0">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-blue-500" />
                                    Standard Features
                                </h3>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-6">
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {configData.defaultComponents && configData.defaultComponents.map((comp, i) => (
                                        <li key={i} className="flex items-start p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                            <div className="mt-1 mr-3 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                                                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
                                                    {comp.name.split(' ')[0]} {/* Simple heuristic for label, or mock it */}
                                                    Component
                                                </span>
                                                <span className="font-medium text-slate-700 dark:text-slate-200">
                                                    {comp.name}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Pricing and Actions */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="sticky top-24">
                            <Card className="p-6 bg-white dark:bg-slate-900 border-none shadow-xl ring-1 ring-slate-200 dark:ring-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                                        <span className="text-slate-500">Base Price</span>
                                        <span className="font-bold text-lg text-slate-900 dark:text-white">₹ {configData.basePrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Min Quantity</span>
                                        <span className="font-medium">{configData.minQuantity}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Selected Quantity</span>
                                        <span className="font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">x {qty}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span className="text-slate-900 dark:text-white font-bold">Total Estimated</span>
                                        <span className="font-bold text-2xl text-blue-600">₹ {configData.totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center h-12 text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-blue-600"
                                        onClick={() => navigate(`/configure/${modelId}`)}
                                    >
                                        <Edit3 className="mr-2 h-4 w-4" />
                                        Modify Configuration
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="w-full justify-center h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                                        onClick={() => navigate("/invoice")}
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        Proceed to Order
                                    </Button>
                                </div>
                                <p className="text-center text-xs text-slate-400 mt-4 px-4">
                                    Prices are indicative and subject to tax at final invoice.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DefaultConfig;
