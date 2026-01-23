import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Upload, FileSpreadsheet, X, Check } from "lucide-react";
import { cn } from "../utils/cn";

const ExcelUpload = () => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (uploadedFile) => {
        const validTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];

        // Check extension as fallback
        const validExtensions = [".xls", ".xlsx"];
        const extension = uploadedFile.name.substring(uploadedFile.name.lastIndexOf('.')).toLowerCase();

        if (validTypes.includes(uploadedFile.type) || validExtensions.includes(extension)) {
            setFile(uploadedFile);
            setUploadStatus("idle");
        } else {
            alert("Please upload a valid Excel file (.xls or .xlsx)");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploadStatus("uploading");

        // Simulate API call
        setTimeout(() => {
            // Random success/fail for demo
            if (Math.random() > 0.1) {
                setUploadStatus("success");
            } else {
                setUploadStatus("error");
            }
        }, 2000);
    };

    return (
        <div className="py-10 max-w-2xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Bulk Configuration Upload</h1>
                <p className="text-slate-500">Upload vehicle defaults via Excel sheet.</p>
            </div>

            <Card className="p-8">
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "border-2 border-dashed rounded-xl p-10 text-center transition-all",
                        isDragging
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-slate-300 dark:border-slate-700 hover:border-blue-400"
                    )}
                >
                    <input
                        type="file"
                        id="excel-upload"
                        className="hidden"
                        accept=".xls,.xlsx"
                        onChange={handleChange}
                    />

                    {!file ? (
                        <label htmlFor="excel-upload" className="cursor-pointer flex flex-col items-center">
                            <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-4">
                                <Upload className="h-8 w-8" />
                            </div>
                            <p className="font-medium text-lg mb-1">Click or drag file to upload</p>
                            <p className="text-sm text-slate-400">Supported formats: .xls, .xlsx</p>
                        </label>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <FileSpreadsheet className="h-8 w-8" />
                            </div>
                            <p className="font-medium text-lg mb-1">{file.name}</p>
                            <p className="text-sm text-slate-400 mb-4">{(file.size / 1024).toFixed(2)} KB</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
                                onClick={() => { setFile(null); setUploadStatus("idle"); }}
                            >
                                <X className="h-4 w-4 mr-1" /> Remove File
                            </Button>
                        </div>
                    )}
                </div>

                {uploadStatus === "uploading" && (
                    <div className="mt-6">
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2 }}
                                className="h-full bg-blue-600"
                            />
                        </div>
                        <p className="text-center text-sm text-slate-500 mt-2">Uploading...</p>
                    </div>
                )}

                {uploadStatus === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-3"
                    >
                        <Check className="h-5 w-5" />
                        <div>
                            <p className="font-semibold">Upload Successful</p>
                            <p className="text-sm opacity-80">24 vehicle configurations imported.</p>
                        </div>
                    </motion.div>
                )}

                {uploadStatus === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-3"
                    >
                        <X className="h-5 w-5" />
                        <div>
                            <p className="font-semibold">Upload Failed</p>
                            <p className="text-sm opacity-80">Server error. Please try again later.</p>
                        </div>
                    </motion.div>
                )}

                <div className="mt-8 flex justify-end">
                    <Button
                        disabled={!file || uploadStatus === "uploading" || uploadStatus === "success"}
                        onClick={handleUpload}
                    >
                        Upload Configuration
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ExcelUpload;
