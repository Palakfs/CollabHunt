import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, placeholder, value, onChange, isTextArea = false }) => {
  return (
    <div className="mb-2 mt-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      {isTextArea ? (
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormField;
