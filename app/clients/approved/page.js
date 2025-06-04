import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import Table from "../(components)/Table";
import Pagination from "@/components/Pagination";
import NoData from "../(components)/NoData";
import Error from "../(components)/Error";

const previousFetchData = [];
const rowPerPage = 25;
let lastVisible = null;

export default async function ApprovedPage({ searchParams }) {
  try {
    let { page = "1" } = await searchParams;
    page = Number(page);
    if (page <= 0) {
      redirect("/clients/requests?page=1");
    }

    const LastNextPage = page + 3;
    const pageData = [];
    const clientRef = collection(db, "clients");
    let lastPageNo = Math.ceil(previousFetchData.length / rowPerPage);

    if (lastPageNo === 0) {
      const q = query(
        clientRef,
        orderBy("createdAt", "desc"),
        limit(rowPerPage * LastNextPage)
      );

      try {
        const { docs } = await getDocs(q);

        if (docs.length === 0) {
          return <NoData />;
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
          redirect(`/clients/requests?page=${lastPageNo}`);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        return (
          <Error message="Failed to load approved clients. Please try again later." />
        );
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
        redirect(`/clients/requests?page=${lastPageNo}`);
      }
    } else {
      console.log("NO DATA Fetched");
    }

    pageData.push(
      ...previousFetchData.slice(
        rowPerPage * (page - 1),
        Math.min(previousFetchData.length, rowPerPage * page)
      )
    );

    if (!pageData.length) {
      return <NoData />;
    }

    return (
      <div className="container">
        <Table data={pageData} isApproved={true} />
        <Pagination
          currentPage={page}
          totalPages={lastPageNo}
          baseUrl="/clients/approved"
        />
      </div>
    );
  } catch (error) {
    console.error("Page error:", error);
    return <Error message="Something went wrong while loading approved clients." />;
  }
}
