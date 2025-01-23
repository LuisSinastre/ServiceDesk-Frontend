// src/pages/treatment/FormField.tsx
import React from 'react';

interface FormFieldProps {
  label: string;
  value: any;
}

const FormField: React.FC<FormFieldProps> = ({ label, value }) => {
  return (
    <p>
      <strong>{label}:</strong> {value || "N/A"}
    </p>
  );
};

export default FormField;
