/**
 * Purpose: Password Reset Page.
 * Allows users to reset their password via email.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { authService } from "../services/authService";
import { ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError(null);
    };

    const validateForm = () => {
        if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
            setError("All fields are required.");
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        if (formData.newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await authService.forgotPassword(formData.email, formData.newPassword);
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            // Extract error message from backend if available
            const msg = err.response?.data || err.message || "Failed to reset password. Please try again.";
            setError(typeof msg === 'string' ? msg : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <Card className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Password Reset Successful</h2>
                        <p className="text-slate-500 mb-6">
                            Your password has been updated. Redirecting you to login...
                        </p>
                        <Button
                            className="w-full"
                            onClick={() => navigate("/login")}
                        >
                            Return to Login
                        </Button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md"
            >
                <Card className="p-8">
                    <div className="mb-6">
                        <Link to="/login" className="flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back to Login
                        </Link>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reset Password</h2>
                        <p className="text-slate-500 text-sm mt-2">Enter your email and new password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="Enter your registered email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />

                        <Input
                            id="newPassword"
                            type="password"
                            label="New Password"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={isLoading}
                        />

                        <Input
                            id="confirmPassword"
                            type="password"
                            label="Confirm New Password"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isLoading}
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Reset Password
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
