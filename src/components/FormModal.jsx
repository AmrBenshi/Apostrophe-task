import { useState } from "react";

function FormModal({ onClose, onSuccess }) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const validate = (vals) => {
        const newErrors = {};
        if (!vals.name.trim()) newErrors.name = "Name is required.";
        if (!vals.email.trim()) newErrors.email = "Email is required.";
        if (!vals.password.trim()) newErrors.password = "Password is required.";
        if (!vals.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password.";
        }
        if (vals.email && !emailRegex.test(vals.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (
            vals.password &&
            vals.confirmPassword &&
            vals.password !== vals.confirmPassword
        ) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
        });
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);

            setTimeout(() => {
                setIsSubmitting(false);
                onSuccess();
            }, 500);
        }
    };
    const showError = (field) => touched[field] && errors[field];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-2xl px-5 py-5 sm:px-6 sm:py-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-300 transition hover:bg-slate-800 hover:text-slate-50"
                    >
                        ✕
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-4 space-y-3.5"
                >
                    <div className="space-y-1">
                        <label
                            htmlFor="name"
                            className="flex items-center gap-1 text-xs font-medium text-slate-200"
                        >
                            Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Amr Benshi"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full rounded-lg border bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 ${showError("name")
                                ? "border-red-500/80 ring-1 ring-red-500/60"
                                : "border-slate-700"
                                }`}
                        />
                        {showError("name") && (
                            <p className="text-xs text-red-400">{errors.name}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="flex items-center gap-1 text-xs font-medium text-slate-200"
                        >
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="amr02@gmail.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full rounded-lg border bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 ${showError("email")
                                ? "border-red-500/80 ring-1 ring-red-500/60"
                                : "border-slate-700"
                                }`}
                        />
                        {showError("email") && (
                            <p className="text-xs text-red-400">{errors.email}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="flex items-center gap-1 text-xs font-medium text-slate-200"
                        >
                            Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full rounded-lg border bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 ${showError("password")
                                ? "border-red-500/80 ring-1 ring-red-500/60"
                                : "border-slate-700"
                                }`}
                        />
                        {showError("password") && (
                            <p className="text-xs text-red-400">{errors.password}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="confirmPassword"
                            className="flex items-center gap-1 text-xs font-medium text-slate-200"
                        >
                            Confirm Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full rounded-lg border bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 ${showError("confirmPassword")
                                ? "border-red-500/80 ring-1 ring-red-500/60"
                                : "border-slate-700"
                                }`}
                        />
                        {showError("confirmPassword") && (
                            <p className="text-xs text-red-400">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-medium text-slate-50 shadow-lg shadow-indigo-900/60 ring-1 ring-indigo-400/70 transition hover:bg-indigo-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormModal;
