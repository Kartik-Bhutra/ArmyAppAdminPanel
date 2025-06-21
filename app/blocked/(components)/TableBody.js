function formatTimestamp(value) {
  if (!value) return "N/A";

  let date;

  if (value.toDate) {
    date = value.toDate();
  } else {
    date = new Date(value);
  }

  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TableBody({ data, setOpenDelete, setDeleteId }) {
  return (
    <tbody>
      {data.map((item) => (
        <tr
          key={item.mobile}
          className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
        >
          <td className="px-6 py-4 font-semibold text-gray-900 text-center">
            {formatTimestamp(item.createdAt)}
          </td>
          <td className="px-6 py-4 text-center">{item.mobile}</td>
          <td className="px-6 py-4 text-gray-400 text-xs text-center">{item.remark}</td>
          <td className="px-6 py-4 text-center">
            <button
              className="text-red-500 hover:underline"
              onClick={() => {
                setDeleteId(item.mobile);
                setOpenDelete(true);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
