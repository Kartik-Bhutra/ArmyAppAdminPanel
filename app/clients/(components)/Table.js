import TableBody from "./TableBody";

export default function Table({ data, isApproved = false }) {
  return (
    <div className="relative overflow-x-auto shadow-md border border-gray-200">
      <table className="w-full text-sm">
        <thead className="text-gray-700 bg-gray-50 border-b">
          <tr>
            <th scope="col" className="px-4 py-3 text-center">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-center sm:table-cell">
              Phone
            </th>
            <th scope="col" className="px-4 py-3 text-center md:table-cell">
              UUID
            </th>
            <th scope="col" className="px-4 py-3 text-center sm:table-cell">
              Time
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <TableBody data={data} isApproved={isApproved} />
      </table>
    </div>
  );
}
