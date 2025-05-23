export default function LoginInput({
  text,
  type = "text",
  name,
  value,
  onChange,
  required,
}) {
  return (
    <div className="mb-6">
      <p className="text-gray-700 mb-2 font-medium">{text}</p>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder={`Enter your ${text.toLowerCase()}`}
        />
      </div>
    </div>
  );
}
