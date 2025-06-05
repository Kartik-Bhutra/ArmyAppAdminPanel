import TableBody from "./TableBody";
import Loader from "@/components/Loader";

export default function Table({ data, isApproved = false, isLoading = false }) {
  return (
    <div className="relative overflow-x-auto shadow-md border border-gray-200">
      <table className="w-full text-sm">
        <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
          <tr className="text-center">
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 whitespace-nowrap sm:table-cell"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-4 py-3 whitespace-nowrap md:table-cell"
            >
              UUID
            </th>
            <th
              scope="col"
              className="px-4 py-3 whitespace-nowrap sm:table-cell"
            >
              Time
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan="5" className="p-0">
                <Loader />
              </td>
            </tr>
          </tbody>
        ) : (
          <TableBody data={data} isApproved={isApproved} />
        )}
      </table>
    </div>
  );
}
