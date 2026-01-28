import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Printer, CheckCircle, ArrowLeft } from "lucide-react";
import { invoiceService } from "../services/invoiceService";

const Invoice = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Try getting final configured order first, else default selection
        const final = localStorage.getItem("final_order");
        if (final) {
            setOrder(JSON.parse(final));
        } else {
            const initial = localStorage.getItem("current_order_selection");
            if (initial) {
                const parsed = JSON.parse(initial);
                // Determine price if coming directly from default config (no add-ons)
                setOrder({
                    ...parsed,
                    configuration: {},
                    addOnsTotal: 0,
                    totalPricePerUnit: parsed.basePrice // Use basePrice stored in DefaultConfig
                });
            } else {
                navigate("/welcome");
            }
        }
    }, [navigate]);

    useEffect(() => {
        if (showSuccess && countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else if (showSuccess && countdown === 0) {
            // Clean up and redirect
            localStorage.removeItem("current_order_selection");
            localStorage.removeItem("final_order");
            navigate("/");
        }
    }, [showSuccess, countdown, navigate]);

    const handleConfirmOrder = async () => {
        setIsSubmitting(true);
        try {
            // Prepare DTO
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user ? user.id : 1; // Fallback ID if no auth
            const customerDetail = user ? `${user.companyName || user.username}` : "Guest Customer";

            const invoiceDto = {
                userId: userId,
                modelId: order.model.id,
                qty: order.quantity,
                customerDetail: customerDetail
            };

            await invoiceService.confirmOrder(invoiceDto);
            setShowSuccess(true);
        } catch (error) {
            console.error(error);
            alert("Failed to confirm order. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (!order) return null;

    const baseTotal = order.totalPricePerUnit * order.quantity;
    const taxes = baseTotal * 0.18; // 18% GST Assumption
    const grandTotal = baseTotal + taxes;

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen relative">

            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-slate-200 dark:border-slate-800"
                        >
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Order Successful!</h2>
                            <p className="text-slate-500 mb-8">
                                Your vehicle configuration has been successfully submitted to our production team.<br />
                                An invoice has been sent to your registered email.
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
                                <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Estimated Delivery</p>
                                <p className="font-semibold text-slate-800 dark:text-white">4-6 Weeks</p>
                            </div>
                            <p className="text-sm text-slate-400">
                                Redirecting to home in <span className="text-blue-500 font-bold">{countdown}</span> seconds...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`max-w-4xl mx-auto px-4 transition-all duration-500 ${showSuccess ? 'blur-sm scale-95 opacity-50' : ''}`}>
                <div className="flex justify-between items-center mb-8">
                    <Button variant="ghost" onClick={() => navigate("/configure/" + order.model.id)} className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
                        <ArrowLeft className="h-4 w-4" /> Back to Configuration
                    </Button>

                </div>

                <Card className="p-0 overflow-hidden bg-white dark:bg-slate-900 shadow-xl printable">
                    {/* Invoice Header */}
                    <div className="p-10 bg-slate-900 text-white relative overflow-hidden">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
                                <p className="text-slate-400">#INV-{Math.floor(100000 + Math.random() * 900000)}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl font-bold tracking-tight">V-CONF <span className="text-blue-400">Automotive</span></h2>
                                <p className="text-sm text-slate-400 mt-1">Premium Vehicle Solutions</p>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    </div>

                    <div className="p-10">
                        {/* Bill To / Date */}
                        <div className="grid md:grid-cols-2 gap-10 mb-12">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Billed To</h3>
                                <div className="text-slate-800 dark:text-slate-200">
                                    {localStorage.getItem("user") ? (
                                        <>
                                            <p className="font-bold text-lg mb-1">{JSON.parse(localStorage.getItem("user")).companyName}</p>
                                            <p className="text-slate-500">Authorized Dealer</p>
                                            <p className="text-slate-500">{JSON.parse(localStorage.getItem("user")).email}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-bold text-lg mb-1">Guest Customer</p>
                                            <p className="text-slate-500">Retail Purchase</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="text-right md:text-right">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Order Details</h3>
                                <div className="space-y-1">
                                    <div className="flex justify-between md:justify-end gap-4">
                                        <span className="text-slate-500">Date Issued:</span>
                                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between md:justify-end gap-4">
                                        <span className="text-slate-500">Valid Until:</span>
                                        <span className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 mb-10">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="py-4 px-6 font-semibold text-slate-900 dark:text-white">Item Details</th>
                                        <th className="py-4 px-6 font-semibold text-slate-900 dark:text-white text-right">Unit Price</th>
                                        <th className="py-4 px-6 font-semibold text-slate-900 dark:text-white text-right">Qty</th>
                                        <th className="py-4 px-6 font-semibold text-slate-900 dark:text-white text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr>
                                        <td className="py-5 px-6">
                                            <p className="font-bold text-slate-900 dark:text-white text-lg">
                                                {order.manufacturer.name} {order.model.name}
                                            </p>
                                            <p className="text-slate-500 mb-2">{order.segment.name} Segment</p>

                                            {/* Show configured addons summary */}
                                            {order.configuration && Object.keys(order.configuration).length > 0 && (
                                                <div className="mt-3 pl-3 border-l-2 border-blue-200 dark:border-blue-800">
                                                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Custom Add-ons Included:</p>
                                                    <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-xs">
                                                        {Object.values(order.configuration).flatMap(cat => Object.values(cat)).map((item, i) => (
                                                            <li key={i}>+ {item.label}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-5 px-6 text-right align-top">₹ {order.totalPricePerUnit.toLocaleString()}</td>
                                        <td className="py-5 px-6 text-right align-top">{order.quantity}</td>
                                        <td className="py-5 px-6 text-right align-top font-bold text-slate-900 dark:text-white">
                                            ₹ {(order.totalPricePerUnit * order.quantity).toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-full max-w-sm">
                                <div className="space-y-4 py-4 border-b border-slate-200 dark:border-slate-800">
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Subtotal</span>
                                        <span>₹ {baseTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Estimated Tax (18%)</span>
                                        <span>₹ {taxes.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <span className="font-bold text-xl text-slate-900 dark:text-white">Total Due</span>
                                    <span className="font-bold text-3xl text-blue-600">₹ {grandTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-right">
                            <Button
                                size="lg"
                                className="w-full md:w-auto px-8 h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30"
                                onClick={handleConfirmOrder}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                        Processing Order...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        Confirm & Submit Order
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Invoice;
