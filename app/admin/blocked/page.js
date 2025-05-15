"use client";

import Pagination from "@/components/Pagination";
import { useActionState, useEffect, useState } from "react";
import codes from "./CountryCodes.json";
// DEMO Data Inport
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import SeqInput from "@/components/SeqInput";
import Input from "@/components/Input";

export default function BlockedPage() {
  const total_pages = 1;
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([
    { seqId: 5, sequence: "+91 2455XXXXXX", remark: "Number from India" },
  ]);
  const [openm1, setOpenm1] = useState(false);
  const [openm2, setOpenm2] = useState(false);
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
        open={openm1}
        setOpen={setOpenm1}
        title="Create Sequence"
      >
        <div>
          <Select
            value={code}
            setValue={setCode}
            label="Select Country"
            options={codes.map((i) => {
              return { label: i.name + " " + i.dial_code, value: i.dial_code };
            })}
          />
          <SeqInput value={seq} setValue={setSeq} />
          <Input label="Enter remark" value={remark} setValue={setRemark} />
        </div>
      </Modal>
      {/* Delete Modal */}
      <Modal
        onConfirm={onDelete}
        open={openm2}
        setOpen={setOpenm2}
        title="Delete Sequence"
      >
        Are you sure you want to delete the sequence? It cannot be undone.
      </Modal>
      <main className="p-6">
        <div className="bg-white bordered shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Blocked Sequence (Page {currentPage + 1} of {total_pages})
            </h2>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => setOpenm1(true)}
            >
              New Sequence
            </button>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-white-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr.No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sequence
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remark
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, key) => {
                  return (
                    <tr
                      key={key}
                      className="odd:bg-gray even:bg-gray-50 border-b border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 font-semibold"
                      >
                        {key + 1}
                      </th>
                      <td className="px-6 py-4">{item.sequence}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {item.remark}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setDeleteId(item.seqId);
                            setOpenm2(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {data.length == 0 && (
                  <tr className="odd:bg-gray even:bg-gray-50 border-b border-gray-200">
                    <td
                      className="px-6 py-4 display-flex items-center justify-center"
                      colSpan={4}
                    >
                      <Loader />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={total_pages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      </main>
    </>
  );
}
