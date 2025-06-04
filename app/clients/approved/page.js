"use client";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Table from "../(components)/Table";
import Pagination from "@/components/Pagination";
import NoData from "../(components)/NoData";
import Error from "../(components)/Error";

const previousFetchData = [];
const rowPerPage = 25;
let lastVisible = null;

export default function ApprovedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const [pageData, setPageData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (page <= 0) {
          router.push("/clients/requests?page=1");
          return;
        }

        const LastNextPage = page + 3;
        const clientRef = collection(db, "clients");
        let lastPageNo = Math.ceil(previousFetchData.length / rowPerPage);
        if (lastPageNo === 0) {
          const q = query(
            clientRef,
            orderBy("createdAt", "desc"),
            limit(rowPerPage * LastNextPage)
          );

          const { docs } = await getDocs(q);

          if (docs.length === 0) {
            setPageData([]);
            return;
          }

          docs.forEach((doc) => {
            const data = doc.data();
            previousFetchData.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate().toISOString() || null,
            });
          });
          lastVisible = docs[docs.length - 1];
          lastPageNo = Math.ceil(previousFetchData.length / rowPerPage);

          if (lastPageNo < page) {
            router.push(`/clients/requests?page=${lastPageNo}`);
            return;
          }
        } else if (lastPageNo < LastNextPage) {
          const q = query(
            clientRef,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(rowPerPage * LastNextPage - previousFetchData.length)
          );
          const { docs } = await getDocs(q);
          if (docs.length > 0) {
            docs.forEach((doc) => {
              const data = doc.data();
              previousFetchData.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate().toISOString() || null,
              });
            });
            lastVisible = docs[docs.length - 1];
            lastPageNo = Math.ceil(previousFetchData.length / rowPerPage);
          }

          if (lastPageNo < page) {
            router.push(`/clients/requests?page=${lastPageNo}`);
            return;
          }
        }

        const currentPageData = previousFetchData.slice(
          rowPerPage * (page - 1),
          Math.min(previousFetchData.length, rowPerPage * page)
        );

        setPageData(currentPageData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page, router]);

  if (error) {
    return (
      <Error message="Failed to load approved clients. Please try again later." />
    );
  }

  if (!pageData.length && !isLoading) {
    return <NoData />;
  }

  const lastPageNo = Math.ceil(previousFetchData.length / rowPerPage);

  return (
    <div className="container">
      <Table data={pageData} isApproved={true} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        totalPages={lastPageNo}
        baseUrl="/clients/approved"
      />
    </div>
  );
}
