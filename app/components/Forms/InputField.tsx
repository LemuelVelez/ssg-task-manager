import React from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type: string;
  value: string; // Added value prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange prop
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-5 w-full font-medium">
      <label htmlFor={label.toLowerCase()} className="text-sm text-black mb-2">
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        placeholder={placeholder}
        value={value} // Bind the value prop
        onChange={onChange} // Bind the onChange prop
        className="py-2.5 px-2.5 w-full text-xs rounded-xl border border-solid border-zinc-300 text-zinc-300"
      />
    </div>
  );
};

export default InputField;
