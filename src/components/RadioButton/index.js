import React, { useState } from "react";

const RadioButton = ({ options, justify, initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue ?? null);

  const handleChange = (value) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={`flex align-items-center justify-content-${justify}`}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`radio-button ${value === option.value ? "selected" : ""}`}
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
