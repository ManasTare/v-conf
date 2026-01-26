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

    useEffect(() => {
        if (!modelId || !qty) {
            navigate("/welcome");
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await defaultConfigService.getDefaultConfig(modelId, qty);
                setConfigData(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load default configuration.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [modelId, qty, navigate]);

    if (isLoading) return <div className="p-10 text-center">Loading configuration...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    if (!configData) return null;

    return (
        <div className="py-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Default Configuration</h1>
                        <p className="text-slate-500">Review the standard features for your selected vehicle.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Vehicle Summary Panel */}
                    <div className="md:col-span-1">
                        <Card className="sticky top-24 p-6 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Selection Summary</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <span className="block text-slate-500">Model</span>
                                    <span className="font-semibold">{configData.modelName}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500">Manufacturer</span>
                                    <span className="font-semibold">{configData.manufacturerName}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500">Segment</span>
                                    <span className="font-semibold">{configData.segmentName}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-500">Quantity</span>
                                    <span className="font-semibold text-lg">{configData.minQuantity} (Min) / {qty} (Selected)</span>
                                </div>
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <span className="block text-slate-500">Base Price (Per Unit)</span>
                                    <span className="font-bold text-xl text-blue-600">₹ {configData.basePrice.toLocaleString()}</span>
                                </div>
                                <div className="pt-2">
                                    <span className="block text-slate-500">Total Price</span>
                                    <span className="font-bold text-xl text-green-600">₹ {configData.totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Default Features List */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="p-0 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <h3 className="font-semibold">Standard Components</h3>
                            </div>
                            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                {configData.defaultComponents && configData.defaultComponents.map((comp, i) => (
                                    <li key={i} className="px-6 py-3 flex items-center text-slate-600 dark:text-slate-300">
                                        <Check className="h-4 w-4 text-green-500 mr-3" />
                                        <span>
                                            <strong>{comp.key}:</strong> {comp.name}
                                        </span>
                                    </li>
                                ))}
                                {(!configData.defaultComponents || configData.defaultComponents.length === 0) && (
                                    <li className="px-6 py-3 text-slate-500 italic">No default components listed.</li>
                                )}
                            </ul>
                        </Card>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                variant="outline"
                                className="flex-1 gap-2"
                                onClick={() => navigate(`/configure/${modelId}`)}
                            >
                                <Edit3 className="h-4 w-4" />
                                Modify Configuration
                            </Button>
                            <Button
                                variant="primary"
                                className="flex-1 gap-2"
                                onClick={() => navigate("/invoice")}
                            >
                                <Settings className="h-4 w-4" />
                                Confirm Order
                            </Button>
                        </div>

                        <p className="text-center text-sm text-slate-400">
                            Selecting 'Modify' allows you to customize Interior and Exterior options.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DefaultConfig;
