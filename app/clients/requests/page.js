import Table from "../(components)/Table";
import BackButton from "../(components)/BackButton";

export default function RequestsPage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Client Requests</h1>
          <BackButton />
        </div>
        <Table showActions={true} />
      </div>
    </div>
  );
}
