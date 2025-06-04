import BackButton from "../(components)/BackButton";

export default function ApprovedLayout({ children }) {
  return (
    <div className="p-2 max-w-[1400px] mx-auto">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Approved Clients</h1>
          <BackButton />
        </div>
        {children}
      </div>
    </div>
  );
}
