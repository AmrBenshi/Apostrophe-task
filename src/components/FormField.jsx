function FormField({ id, label, error, children }) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-xs font-medium text-slate-200"
      >
        {label} <span className="text-red-400" aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
