import { useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: { [K in keyof T]?: (value: T[K]) => string | null }
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name as string]: '' }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name as string]: true }));
    validate(name);
  };

  const validate = (field?: keyof T): boolean => {
    if (!validationRules) return true;

    const newErrors: FormErrors = {};
    const fieldsToValidate = field ? [field] : Object.keys(validationRules);

    fieldsToValidate.forEach(fieldName => {
      const rule = validationRules[fieldName as keyof T];
      if (rule) {
        const error = rule(values[fieldName as keyof T]);
        if (error) {
          newErrors[fieldName as string] = error;
        }
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
};