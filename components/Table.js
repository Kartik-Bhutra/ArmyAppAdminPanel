export default function Table({ fields, data }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-white-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {fields.map((item, key) => (
              <th scope="col" key={key} className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, key) => {
            return (
              <tr>
                {fields.map((item, key) => (
                  <td className="px-6 py-4">{row[item]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
