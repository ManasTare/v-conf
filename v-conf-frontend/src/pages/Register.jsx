import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Card from "../components/ui/Card";
import { registrationService } from "../services/registrationService";
import { CheckCircle } from "lucide-react";

/**
 * Mapped to Backend Entity: User (camelCase)
 */
const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "", // Client-side only
        companyName: "",
        email: "",
        add1: "",
        add2: "",
        city: "",
        state: "",
        pin: "",
        authName: "",
        authTel: "",
        designation: "",
        cell: "",
        tel: "",
        fax: "",
        holdingType: "",
        companyStNo: "",
        companyVatNo: "",
        taxPan: "",
        registrationNo: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: null });
        }
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = [
            "username", "password", "companyName", "email",
            "add1", "city", "state", "pin",
            "authName", "authTel", "designation", "holdingType",
            "companyStNo", "companyVatNo"
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) newErrors[field] = "This field is required";
        });

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        // Numeric validation
        if (formData.pin && !/^\d+$/.test(formData.pin)) newErrors.pin = "Numbers only";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            // Create payload matching strict Entity columns (exclude confirmPassword)
            const { confirmPassword, ...payload } = formData;
            // Default role if not set by backend
            payload.role = "USER";

            await registrationService.save(payload);
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            // In a real scenario, we should show the error message from backend
            // But if it fails, we keep showing the form with error
            setIsSuccess(false); // Do not show success screen on error
            alert("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <Card className="text-center p-12 max-w-lg">
                        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Registration Successful!</h2>
                        <p className="text-slate-500 mb-8">
                            Account created for <strong>{formData.username}</strong> ({formData.companyName}). <br />
                            You can now sign in with your password.
                        </p>
                        <Button onClick={() => window.location.href = '/login'}>Proceed to Sign In</Button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h2>
                    <p className="text-slate-500 mt-2">Register your company to access the Vehicle Configurator.</p>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Account Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Account Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input id="username" label="Username *" value={formData.username} onChange={handleChange} error={errors.username} />
                                <div className="hidden md:block"></div>
                                <Input id="password" type="password" label="Password *" value={formData.password} onChange={handleChange} error={errors.password} />
                                <Input id="confirmPassword" type="password" label="Confirm Password *" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                            </div>
                        </div>

                        {/* 2. Company Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Company Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input id="companyName" label="Company Name *" value={formData.companyName} onChange={handleChange} error={errors.companyName} />
                                <Input id="email" type="email" label="Company Email *" value={formData.email} onChange={handleChange} error={errors.email} />
                                <Input id="registrationNo" label="Registration No." value={formData.registrationNo} onChange={handleChange} />

                                <Select
                                    id="holdingType"
                                    label="Holding Type *"
                                    value={formData.holdingType}
                                    onChange={handleChange}
                                    error={errors.holdingType}
                                    options={[
                                        { value: "Public Limited", label: "Public Limited" },
                                        { value: "Private Limited", label: "Private Limited" },
                                        { value: "Partnership", label: "Partnership" },
                                        { value: "Proprietorship", label: "Proprietorship" },
                                        { value: "MNC", label: "MNC" }
                                    ]}
                                />
                            </div>
                        </div>

                        {/* 3. Address */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Address</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input id="add1" label="Address Line 1 *" value={formData.add1} onChange={handleChange} error={errors.add1} />
                                <Input id="add2" label="Address Line 2" value={formData.add2} onChange={handleChange} />
                                <Input id="city" label="City *" value={formData.city} onChange={handleChange} error={errors.city} />
                                <div className="grid grid-cols-2 gap-6">
                                    <Input id="state" label="State *" value={formData.state} onChange={handleChange} error={errors.state} />
                                    <Input id="pin" label="Pin Code *" value={formData.pin} onChange={handleChange} error={errors.pin} />
                                </div>
                            </div>
                        </div>

                        {/* 4. Contact / Authorized Person */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Contact Person & Phones</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input id="authName" label="Authorized Person Name *" value={formData.authName} onChange={handleChange} error={errors.authName} />
                                <Input id="designation" label="Designation *" value={formData.designation} onChange={handleChange} error={errors.designation} />

                                <Input id="authTel" label="Auth Person Tel *" value={formData.authTel} onChange={handleChange} error={errors.authTel} />
                                <Input id="cell" label="Cell/Mobile" value={formData.cell} onChange={handleChange} />
                                <Input id="tel" label="Telephone (Office)" value={formData.tel} onChange={handleChange} />
                                <Input id="fax" label="Fax" value={formData.fax} onChange={handleChange} />
                            </div>
                        </div>

                        {/* 5. Tax / Regulatory */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Tax & Legal</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Input id="companyStNo" label="Company ST No. *" value={formData.companyStNo} onChange={handleChange} error={errors.companyStNo} />
                                <Input id="companyVatNo" label="VAT Reg No.*" value={formData.companyVatNo} onChange={handleChange} error={errors.companyVatNo} />
                                <Input id="taxPan" label="PAN No." value={formData.taxPan} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <Button type="button" variant="outline" onClick={() => window.location.reload()}>
                                Reset
                            </Button>
                            <Button type="submit" isLoading={isLoading}>
                                Complete Registration
                            </Button>
                        </div>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default Register;
