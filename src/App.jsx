import { useState } from "react";
import FormModal from "./components/FormModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpenModal = () => {
    if (formSubmitted) return;
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_transparent_55%),radial-gradient(circle_at_bottom,_#4f46e5,_#020617_60%)] text-slate-100">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/80 backdrop-blur-xl shadow-2xl px-6 py-6 sm:px-7 sm:py-7">
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-sky-500/40 blur-3xl" />
          <div className="absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-pink-500/30 blur-3xl" />
        </div>
        <div className="relative space-y-6 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {formSubmitted ? "Form Submitted" : "Welcome to the Form App"}
          </h1>
          <p className="mt-1 text-sm text-slate-300/80 text-st">
            {formSubmitted
              ? "You have successfully submitted the form."
              : "Click the button below to open the form modal."
            }
          </p>
          <button
            type="button"
            onClick={handleOpenModal}

            className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium shadow-lg shadow-indigo-900/60 ring-1 ring-indigo-400/70 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${formSubmitted
              ? ""
              : "bg-gradient-to-tr from-indigo-500 via-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400"
              }`}
          >
            {formSubmitted
              ? "Thank you for filling out the form"
              : "Open Form"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <FormModal onClose={handleCloseModal} onSuccess={handleFormSuccess} />
      )}
    </div>
  );
}

export default App;
