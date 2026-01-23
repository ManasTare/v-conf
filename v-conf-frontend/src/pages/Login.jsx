import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { authService } from "../services/authService";
import { Lock } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Removed persistent lock check
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError(null);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isLocked) return;

        if (!formData.username || !formData.password) {
            setError("Please enter both Username and Password.");
            return;
        }

        setIsLoading(true);
        try {
            await authService.login(formData.username, formData.password);

            setFailedAttempts(0);
            navigate("/welcome");

        } catch (err) {
            const newAttempts = failedAttempts + 1;
            setFailedAttempts(newAttempts);

            if (newAttempts >= 3) {
                setIsLocked(true);
                // Lock for 30 seconds, no localStorage so refresh clears it
                const lockDuration = 30000;
                setError(`Account locked due to too many failed attempts. Try again in 30 seconds.`);

                setTimeout(() => {
                    setIsLocked(false);
                    setFailedAttempts(0);
                    setError(null);
                }, lockDuration);
            } else {
                setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSSO = () => {
        // Placeholder for Google SSO redirection
        // In a real app, this would redirect to backend /auth/google endpoint
        window.location.href = "/auth/google";
    };

    const handleTwitterSSO = () => {
        // Placeholder for Twitter SSO redirection
        window.location.href = "/auth/twitter";
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md"
            >
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
                        <p className="text-slate-500 text-sm mt-2">Sign into V-CONF</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            id="username"
                            label="Username"
                            placeholder="Enter your Username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={isLocked || isLoading}
                        />

                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLocked || isLoading}
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2"
                            >
                                {isLocked && <Lock className="h-4 w-4" />}
                                {error}
                            </motion.div>
                        )}

                        <div className="flex justify-end">
                            <Link to="#" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                            disabled={isLocked}
                        >
                            {isLocked ? "Account Locked" : "Sign In"}
                        </Button>
                    </form>

                    {/* SSO Section */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-2 text-slate-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleGoogleSSO}
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleTwitterSSO}
                            >
                                <svg className="h-5 w-5 mr-2 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                Twitter
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline font-medium">
                            Create Account
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
