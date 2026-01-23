import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Printer, CheckCircle, ArrowLeft } from "lucide-react";

const Invoice = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Try getting final configured order first, else default selection
        const final = localStorage.getItem("final_order");
        if (final) {
            setOrder(JSON.parse(final));
        } else {
            const initial = JSON.parse(localStorage.getItem("current_order_selection"));
            if (initial) {
                // Determine price if coming directly from default config (no add-ons)
                setOrder({
                    ...initial,
                    configuration: {},
                    totalPricePerUnit: initial.model.price
                });
            } else {
                navigate("/welcome");
            }
        }
    }, [navigate]);

    if (!order) return null;

    const baseTotal = order.totalPricePerUnit * order.quantity;
    const taxes = baseTotal * 0.18; // 18% GST Assumption
    const grandTotal = baseTotal + taxes;

    return (
        <div className="py-10 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <Button variant="ghost" onClick={() => navigate("/welcome")} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" /> Print Invoice
                </Button>
            </div>

            <Card className="p-10 bg-white dark:bg-slate-950 printable">
                <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">INVOICE</h1>
                        <p className="text-slate-500">Order #VCONF-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-blue-600">V-CONF Corp</h2>
                        <p className="text-sm text-slate-500">123 Auto Plaza, Tech City</p>
                        <p className="text-sm text-slate-500">support@vconf.com</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Billed To</h3>
                        {localStorage.getItem("user") ? (
                            <p className="font-medium text-slate-900 dark:text-slate-100">{JSON.parse(localStorage.getItem("user")).companyName || "Valued Customer"}</p>
                        ) : (
                            <p className="font-medium text-slate-900 dark:text-slate-100">Guest Company</p>
                        )}
                        <p className="text-slate-500">Client ID: {Math.floor(Math.random() * 1000)}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Order Date</h3>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="relative overflow-x-auto mb-8">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="pb-4 font-semibold text-slate-900 dark:text-white">Item description</th>
                                <th className="pb-4 font-semibold text-slate-900 dark:text-white text-right">Unit Price</th>
                                <th className="pb-4 font-semibold text-slate-900 dark:text-white text-right">Qty</th>
                                <th className="pb-4 font-semibold text-slate-900 dark:text-white text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="py-4">
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        {order.manufacturer.name} {order.model.name} ({order.segment.name})
                                    </p>
                                    <div className="text-xs text-slate-500 mt-1">
                                        Base: ₹ {order.model.price.toLocaleString()}
                                        {Object.keys(order.configuration).length > 0 && " + Custom Configuration"}
                                    </div>
                                </td>
                                <td className="py-4 text-right">₹ {order.totalPricePerUnit.toLocaleString()}</td>
                                <td className="py-4 text-right">{order.quantity}</td>
                                <td className="py-4 text-right font-medium">₹ {(order.totalPricePerUnit * order.quantity).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end">
                    <div className="w-full max-w-xs space-y-3">
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Subtotal</span>
                            <span>₹ {baseTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Tax (18% GST)</span>
                            <span>₹ {taxes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-slate-900 dark:text-white text-lg pt-3 border-t border-slate-200 dark:border-slate-800">
                            <span>Total Due</span>
                            <span>₹ {grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" className="w-full md:w-auto" onClick={() => alert("Order Sent to Backend!")}>
                        <CheckCircle className="mr-2 h-5 w-5" /> Confirm Final Order
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Invoice;
