const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  min,
  max,
  step,
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
         type={type}
         name={name}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         required={required}
         min={min}
         max={max}
         step={step}
         {...rest}
         className={`w-full px-4 py-2 bg-white text-gray-900 border rounded-lg focus:outline-none transition ${
           error
             ? 'border-red-500 focus:border-red-600'
             : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
         }`}
       />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
