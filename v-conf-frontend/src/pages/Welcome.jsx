import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { welcomeService } from "../services/welcomeService";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
    const navigate = useNavigate();
    const [segments, setSegments] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [models, setModels] = useState([]);

    const [selection, setSelection] = useState({
        segment: "",
        manufacturer: "",
        model: "",
        quantity: ""
    });

    const [minQty, setMinQty] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load segments on mount
        welcomeService.getSegments().then(setSegments).catch(console.error);
    }, []);

    const handleSegmentChange = async (e) => {
        const segmentId = e.target.value;
        setSelection({ ...selection, segment: segmentId, manufacturer: "", model: "" });

        // Reset minQty when segment changes, as it depends on Model now
        setMinQty(null);

        setManufacturers([]);
        setModels([]);

        if (segmentId) {
            try {
                const mans = await welcomeService.getManufacturers(segmentId);
                setManufacturers(mans);
            } catch (error) {
                console.error("Failed to load manufacturers", error);
            }
        }
    };

    const handleManufacturerChange = async (e) => {
        const mfgId = e.target.value;
        setSelection({ ...selection, manufacturer: mfgId, model: "" });
        setModels([]);
        setMinQty(null); // Reset minQty

        if (mfgId) {
            try {
                const mods = await welcomeService.getModels(selection.segment, mfgId);
                setModels(mods);
            } catch (error) {
                console.error("Failed to load models", error);
            }
        }
    };

    const handleModelChange = (e) => {
        const modelId = e.target.value;
        const selectedModel = models.find(m => m.id === parseInt(modelId));

        setSelection({ ...selection, model: modelId });

        // Set minQty based on selected Model
        if (selectedModel) {
            setMinQty(selectedModel.minQty || 1); // Default to 1 if missing, but DB should have it
        } else {
            setMinQty(null);
        }
    };

    const handleQuantityChange = (e) => {
        setSelection({ ...selection, quantity: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!selection.segment) newErrors.segment = "Required";
        if (!selection.manufacturer) newErrors.manufacturer = "Required";
        if (!selection.model) newErrors.model = "Required";

        if (!selection.quantity) {
            newErrors.quantity = "Required";
        } else if (minQty !== null && parseInt(selection.quantity) < minQty) {
            newErrors.quantity = `Minimum quantity for this model is ${minQty}`;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Save selection to local storage so next pages can access model details/prices
            const fullSelection = {
                segment: segments.find(s => s.id == selection.segment),
                manufacturer: manufacturers.find(m => m.id == selection.manufacturer),
                model: models.find(m => m.id == selection.model),
                quantity: parseInt(selection.quantity)
            };

            // We need to import vehicleService if not already imported, but for now let's just use localStorage directly 
            // or better, use the service helper if I can import it. 
            // Let's rely on the service helper for consistency.
            // But wait, I need to add the import first. 
            // For this specific 'replace' block, I can't add imports at the top easily if they are not there.
            // I will use localStorage directly here to be safe, or I will do a multi-replace to add import.
            localStorage.setItem("current_order_selection", JSON.stringify(fullSelection));

            // Navigate to Configurator Page with params
            navigate(`/configurator/${selection.model}?qty=${selection.quantity}`);
        }
    };

    return (
        <div className="py-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Start New Order</h1>
                    <p className="text-slate-500">Select your base vehicle configuration.</p>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Select
                            id="segment"
                            label="Vehicle Segment"
                            placeholder="Select Segment"
                            options={segments.map(s => ({ value: s.id, label: s.name }))}
                            value={selection.segment}
                            onChange={handleSegmentChange}
                            error={errors.segment}
                        />

                        <Select
                            id="manufacturer"
                            label="Manufacturer"
                            placeholder="Select Manufacturer"
                            options={manufacturers.map(m => ({ value: m.id, label: m.name }))}
                            value={selection.manufacturer}
                            onChange={handleManufacturerChange}
                            disabled={!selection.segment}
                            error={errors.manufacturer}
                        />

                        <Select
                            id="model"
                            label="Model"
                            placeholder="Select Model"
                            options={models.map(m => ({ value: m.id, label: m.name }))}
                            value={selection.model}
                            onChange={handleModelChange}
                            disabled={!selection.manufacturer}
                            error={errors.model}
                        />

                        <div>
                            <Input
                                id="quantity"
                                type="number"
                                label={minQty ? `Quantity (Min: ${minQty})` : "Quantity"}
                                value={selection.quantity}
                                onChange={handleQuantityChange}
                                disabled={!selection.model || minQty === null}
                                error={errors.quantity}
                                min={minQty || 1}
                            />
                            {selection.model && minQty !== null && (
                                <p className="text-xs text-slate-500 mt-1">
                                    * Minimum order quantity for this model is {minQty}
                                </p>
                            )}
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" size="lg" className="gap-2">
                                Go <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default Welcome;
