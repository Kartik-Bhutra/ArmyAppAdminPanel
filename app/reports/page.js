"use client";
import { db } from "@/lib/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import Table from "./(components)/Table";
import Pagination from "@/components/Pagination";
import Error from "@/components/Error";
import NoData from "@/components/NoData";

export default function ReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const [pageData, setPageData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPageNumber, setLastPageNumber] = useState(0);

  const rowPerPage = 25;

  useEffect(() => {
    async function fetchData() {
      if (page <= 0) {
        router.push("/reports?page=1");
        return;
      }

      setIsLoading(true);

      try {
        const countRef = doc(db, "reports", "metadata");
        const countSnap = await getDoc(countRef);

        if (countSnap.exists()) {
          const countData = countSnap.data();
          const totalCount = countData.reports;
          const totalPages = Math.ceil(totalCount / rowPerPage);
          if (totalPages !== 0) {
            setLastPageNumber(totalPages);

            if (page > totalPages) {
              router.push(`/reports?page=${totalPages}`);
              return;
            }
            const reportsRef = collection(db, "reports");
            const q = query(reportsRef, limit(page * rowPerPage));
            const snapshot = await getDocs(q);

            const slicedDocs = snapshot.docs.slice(
              (page - 1) * rowPerPage,
              page * rowPerPage
            );

            const formatted = slicedDocs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
              };
            });

            setPageData(formatted);
          } else {
            setLastPageNumber(0);
            setPageData([]);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page, router]);

  if (error) {
    return <Error message="Failed to load reports. Please try again later." />;
  }

  if (!pageData.length && !isLoading) {
    return <NoData />;
  }

  return (
    <div className="container">
      <Table data={pageData} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        totalPages={lastPageNumber}
        baseUrl="/reports"
      />
    </div>
  );
}
