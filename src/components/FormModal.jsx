import { useEffect, useRef } from "react";
import { useRegistrationForm } from "../hooks/useRegistrationForm";
import FormField from "./FormField";

const inputBase =
  "w-full rounded-lg border bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400";

const inputError = "border-red-500/80 ring-1 ring-red-500/60";
const inputNormal = "border-slate-700";

function inputClass(hasError) {
  return `${inputBase} ${hasError ? inputError : inputNormal}`;
}

function FormModal({ onClose, onSuccess }) {
  const { values, handleChange, handleBlur, handleSubmit, isSubmitting, fieldError } =
    useRegistrationForm(onSuccess);

  const firstInputRef = useRef(null);

  // Focus the first input when modal opens
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-2xl px-5 py-5 sm:px-6 sm:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-sm font-semibold text-slate-200">
            Create an account
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-300 transition hover:bg-slate-800 hover:text-slate-50"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
          <FormField id="name" label="Name" error={fieldError("name")}>
            <input
              ref={firstInputRef}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby={fieldError("name") ? "name-error" : undefined}
              aria-invalid={!!fieldError("name")}
              className={inputClass(fieldError("name"))}
            />
          </FormField>

          <FormField id="email" label="Email" error={fieldError("email")}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby={fieldError("email") ? "email-error" : undefined}
              aria-invalid={!!fieldError("email")}
              className={inputClass(fieldError("email"))}
            />
          </FormField>

          <FormField id="password" label="Password" error={fieldError("password")}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby={fieldError("password") ? "password-error" : undefined}
              aria-invalid={!!fieldError("password")}
              className={inputClass(fieldError("password"))}
            />
          </FormField>

          <FormField id="confirmPassword" label="Confirm Password" error={fieldError("confirmPassword")}>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby={fieldError("confirmPassword") ? "confirmPassword-error" : undefined}
              aria-invalid={!!fieldError("confirmPassword")}
              className={inputClass(fieldError("confirmPassword"))}
            />
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-medium text-slate-50 shadow-lg shadow-indigo-900/60 ring-1 ring-indigo-400/70 transition hover:bg-indigo-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Submitting…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
