import { useState, useCallback } from 'react';

interface FormErrors {
  [key: string]: string;
}

export function useForm<T extends { [key: string]: any }>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  return {
    values,
    errors,
    touched,
    handleChange,
    setFieldError,
    reset
  };
} 