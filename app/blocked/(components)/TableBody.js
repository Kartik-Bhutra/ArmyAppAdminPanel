export default function TableBody({ data, setOpenDelete, setDeleteId }) {
  return (
    <tbody>
      {data.map((item, index) => (
        <tr
          key={item.id || index}
          className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
        >
          <td className="px-6 py-4 font-semibold text-gray-900">{index + 1}</td>
          <td className="px-6 py-4">{item.id}</td>
          <td className="px-6 py-4 text-gray-400 text-xs">{item.id}</td>
          <td className="px-6 py-4">
            <button
              className="text-red-500 hover:underline"
              onClick={() => {
                setDeleteId(item.id);
                setOpenDelete(true);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      {data.length === 0 && (
        <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td colSpan="4" className="px-6 py-4 text-center">
            No sequences available.
          </td>
        </tr>
      )}
    </tbody>
  );
}
