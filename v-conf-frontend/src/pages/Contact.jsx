/**
 * Purpose: Contact Us Page.
 * Displays contact information and an inquiry form.
 */
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Send } from "lucide-react";
import Button from "../components/ui/Button";
import { useI18n } from "../context/I18nContext";

const Contact = () => {
    const { i18n } = useI18n();
    const t = i18n.contact || {};

    return (
        <div className="flex-1 flex items-center justify-center p-4 min-h-[75vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[480px]"
            >
                {/* Left Panel - Contact Info */}
                <div className="md:w-2/5 bg-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
                    {/* decorative circles */}
                    <div className="absolute top-[-50px] left-[-50px] w-40 h-40 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 rounded-full bg-purple-500/20 blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">{t.title || "Contact Us"}</h2>
                        <p className="text-slate-400 text-sm mb-6">{t.subtitle || "We'd love to hear from you!"}</p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                                <div>
                                    <p className="font-medium">{t.addressLabel || "Address"}</p>
                                    <p className="text-slate-400 text-sm">
                                        {t.addressValue ? t.addressValue.split('\n').map((line, i) => (
                                            <span key={i}>{line}<br /></span>
                                        )) : <>Vidya Nidhi School<br />Juhu Mumbai</>}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-blue-400" />
                                <div>
                                    <p className="font-medium">{t.emailLabel || "Email"}</p>
                                    <p className="text-slate-400 text-sm">vehicleConf06@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-blue-400" />
                                <div>
                                    <p className="font-medium">{t.phoneLabel || "Phone"}</p>
                                    <p className="text-slate-400 text-sm">+91 9270682272</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-8">
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                <button key={idx} className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors">
                                    <Icon className="w-5 h-5 text-white" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="md:w-3/5 p-8 md:p-10 bg-white dark:bg-slate-950 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.formTitle || "Get in Touch"}</h2>
                        <p className="text-slate-500 mb-6">{t.formSubtitle || "Feel free to drop us a line below!"}</p>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder={t.namePlaceholder || "Your Name"}
                                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <input
                                    type="email"
                                    placeholder={t.emailPlaceholder || "Your Email"}
                                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <textarea
                                    rows={4}
                                    placeholder={t.messagePlaceholder || "Type your message here..."}
                                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                            </div>

                            <Button variant="primary" size="lg" className="w-40 rounded-full shadow-lg shadow-blue-500/30">
                                {t.sendButton || "SEND"}
                            </Button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
