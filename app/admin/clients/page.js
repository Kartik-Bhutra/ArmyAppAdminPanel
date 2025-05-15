"use client"

import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";

// DEMO Data Inport 
import clients from "./clients-demo-data.json";
import Loader from "@/components/Loader";

export default function ClientsPage() {
    const total_pages = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [data,setData] = useState([]);
    useEffect(()=>{
        setData([])
        // For fetching delay
        // remove this during connceting it with firebase
        setTimeout(()=>{setData(clients.slice(currentPage*50,(currentPage+1)*50));},[1000])
    },[currentPage])
    const onConfirm  = (user_id) => {};
    const onCancel = (user_id) => {};
  return (
    <>
      <main className="p-6">
        <div className="bg-white bordered shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Clients (Page {currentPage+1} of {total_pages})</h2>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-white-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USER ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                    data.map((item,key)=>{
                        return (<tr key={key} className="odd:bg-gray even:bg-gray-50 border-b border-gray-200">
                            <th
                              scope="row"
                              className="px-6 py-4 text-gray-900 font-semibold"
                            >
                              {item.name}
                            </th>
                            <td className="px-6 py-4">{item.phone_no}</td>
                            <td className="px-6 py-4">{item.id}</td>
                            <td className="px-6 py-4">
                              <button className="mr-2 text-green-500 cursor-pointer" onClick={()=>onConfirm(item.id)}>Approve</button>
                              <button className="text-red-500 cursor-pointer" onClick={()=>onCancel(item.id)}>Decline</button>
                            </td>
                          </tr>)
                    })
                }
                {data.length==0 && <tr className="odd:bg-gray even:bg-gray-50 border-b border-gray-200"><td className="px-6 py-4 display-flex items-center justify-center" colSpan={4}><Loader/></td></tr>}
              </tbody>
            </table>
          </div>
          <Pagination totalPages={total_pages} page={currentPage} setPage={setCurrentPage}/>
        </div>
      </main>
    </>
  );
}
