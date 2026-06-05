import { useState } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords don't match.";
  }

  return errors;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function useRegistrationForm(onSuccess) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear the error as the user types after a field has been touched
    if (touched[name]) {
      const updated = { ...values, [name]: value };
      const newErrors = validateForm(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(values);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.fromEntries(
      Object.keys(initialValues).map((k) => [k, true])
    );
    setTouched(allTouched);

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 600);
  };

  const fieldError = (name) => (touched[name] ? errors[name] : undefined);

  return { values, handleChange, handleBlur, handleSubmit, isSubmitting, fieldError };
}
