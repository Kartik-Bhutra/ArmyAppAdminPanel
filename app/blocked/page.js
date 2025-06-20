"use client";
import { db } from "@/lib/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Table from "./(components)/Table";
import Pagination from "@/components/Pagination";
import Error from "@/components/Error";
import NoData from "@/components/NoData";

export default function BlockedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageData, setPageData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPageNumber, setLastPageNumber] = useState(0);

  const rowPerPage = 25;
  const page = Number(searchParams.get("page") || "1");

  useEffect(() => {
    async function fetchData() {
      if (page <= 0) {
        router.push("/blocked?page=1");
        return;
      }

      setIsLoading(true);

      try {
        const docRef = doc(db, "blocked", "numbers");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const entries = Object.entries(data);
          const totalPages = Math.ceil(entries.length / rowPerPage);

          if (totalPages !== 0) {
            setLastPageNumber(totalPages);

            if (page > totalPages) {
              router.push(`/blocked?page=${totalPages}`);
              return;
            }

            const sliced = entries
              .slice((page - 1) * rowPerPage, page * rowPerPage)
              .map(([mobile, value]) => ({
                mobile,
                ...value,
              }));

            setPageData(sliced);
          } else {
            setPageData([]);
            setLastPageNumber(0);
          }
        } else {
          setPageData([]);
          setLastPageNumber(0);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page, router]);

  if (error) return <Error message={error} />;
  if (!pageData.length && !isLoading) return <NoData />;

  return (
    <div className="container">
      <Table data={pageData} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        totalPages={lastPageNumber}
        baseUrl="/blocked"
      />
    </div>
  );
}
