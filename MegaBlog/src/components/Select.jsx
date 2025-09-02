import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  const Id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={Id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        {...props}
        id={Id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
      >
        {options?.map((option, index) => {
          if (typeof option === "string") {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
});

export default Select;