const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-lg text-gray-200 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full py-2 px-4"
      />
    </div>
  );
};

export default InputField;
