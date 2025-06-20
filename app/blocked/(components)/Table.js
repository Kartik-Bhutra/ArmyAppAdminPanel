import TableBody from "./TableBody";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import codes from "@/constants/CountryCodes.json";
import Loader from "@/components/Loader";
import Select from "@/components/Select";
import Input from "@/components/Input";
import SeqInput from "@/components/SeqInput";
import { useState } from "react";

export default function Table({ data = [], isLoading = false }) {
  const totalPages = 1;
  const [currentPage, setCurrentPage] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [code, setCode] = useState("+92");
  const [seq, setSeq] = useState("");
  const [remark, setRemark] = useState("");

  const onCreate = () => {};
  const onDelete = () => {};

  return (
    <>
      {/* Create Modal */}
      <Modal
        onConfirm={onCreate}
        open={openCreate}
        setOpen={setOpenCreate}
        title="Create Sequence"
      >
        <div>
          <Select
            value={code}
            setValue={setCode}
            label="Select Country"
            options={codes.map((i) => ({
              label: `${i.name} ${i.dial_code}`,
              value: i.dial_code,
            }))}
          />
          <SeqInput value={seq} setValue={setSeq} />
          <Input label="Enter remark" value={remark} setValue={setRemark} />
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        onConfirm={onDelete}
        open={openDelete}
        setOpen={setOpenDelete}
        title="Delete Sequence"
      >
        Are you sure you want to delete the sequence? It cannot be undone.
      </Modal>

      <div className="bg-white rounded-lg shadow-sm mx-auto max-w-[100vw]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Blocked Sequences</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => setOpenCreate(true)}
          >
            New Sequence
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Sr.No.</th>
                <th scope="col" className="px-6 py-3">Sequence</th>
                <th scope="col" className="px-6 py-3">Remark</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="4" className="p-0">
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : (
              <TableBody
                data={data}
                setOpenDelete={setOpenDelete}
                setDeleteId={setDeleteId}
              />
            )}
          </table>
        </div>
      </div>
    </>
  );
}
