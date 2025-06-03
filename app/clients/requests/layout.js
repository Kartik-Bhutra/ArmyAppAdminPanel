import BackButton from "../(components)/BackButton";

export default function RequestLayout({ children }) {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Approved Clients</h1>
          <BackButton />
        </div>
        {children}
      </div>
    </div>
  );
}
