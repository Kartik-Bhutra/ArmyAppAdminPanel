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
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Table from "../(components)/Table";
import Pagination from "@/components/Pagination";
import Error from "@/components/Error";
import NoData from "@/components/NoData";
export default function ApprovedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const [pageData, setPageData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const rowPerPage = 25;
  useEffect(() => {
    async function fetchPageData() {
      if (page <= 0) {
        router.push("/clients/approved?page=1");
        return;
      }
      setIsLoading(true);
      try {
        const countRef = doc(db, "clients", "metadata");
        const docSnap = await getDoc(countRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const approvedCount = data.authenticated;
          const totalPages = Math.ceil(approvedCount / rowPerPage);
          if (totalPages !== 0) {
            setLastPageNumber(totalPages);
            if (page > totalPages) {
              router.push(`/clients/approved?page=${totalPages}`);
              return;
            }
            const clientRef = collection(db, "clients");
            const q = query(
              clientRef,
              where("authenticated", "==", true),
              orderBy("createdAt", "desc"),
              limit(page * rowPerPage)
            );
            const snapshot = await getDocs(q);
            const docs = snapshot.docs.slice(
              (page - 1) * rowPerPage,
              page * rowPerPage
            );
            const formattedDocs = docs.map((doc) => {
              const d = doc.data();
              return {
                id: doc.id,
                ...d,
                createdAt: d.createdAt?.toDate().toISOString() || null,
              };
            });
            setPageData(formattedDocs);
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
    fetchPageData();
  }, [page, router]);
  if (error) {
    return (
      <Error message="Failed to load approved clients. Please try again later." />
    );
  }
  if (!pageData.length && !isLoading) {
    return <NoData />;
  }
  return (
    <div className="container">
      <Table data={pageData} isApproved={true} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        totalPages={lastPageNumber}
        baseUrl="/clients/approved"
      />
    </div>
  );
}
