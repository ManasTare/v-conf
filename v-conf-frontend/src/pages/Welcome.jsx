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

    const [minQty, setMinQty] = useState(1);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load segments on mount
        welcomeService.getSegments().then(setSegments).catch(console.error);
    }, []);

    const handleSegmentChange = async (e) => {
        const segmentId = e.target.value;
        const selectedSegment = segments.find(s => s.id === parseInt(segmentId));

        setSelection({ ...selection, segment: segmentId, manufacturer: "", model: "" });
        // Assuming the segment object has min_qty. If backend DTO is different, check response.
        // SegmentDTO: id, name, min_qty? Check DTO in previous steps if needed.
        // If DTO doesn't have min_qty, we might need a default.
        setMinQty(selectedSegment ? selectedSegment.minQty || 1 : 1); // minQty camelCase
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
        setSelection({ ...selection, model: e.target.value });
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
        } else if (parseInt(selection.quantity) < minQty) {
            newErrors.quantity = `Minimum quantity for this segment is ${minQty}`;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
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
                                label={`Quantity (Min: ${minQty})`}
                                value={selection.quantity}
                                onChange={handleQuantityChange}
                                disabled={!selection.segment}
                                error={errors.quantity}
                                min={minQty}
                            />
                            {selection.segment && (
                                <p className="text-xs text-slate-500 mt-1">
                                    * Minimum order quantity for this segment is {minQty}
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
