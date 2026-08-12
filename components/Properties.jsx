"use client";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const Properties = () => {
  const [loading, setLoaindg] = useState(false);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoaindg(true);
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`,
        );
        if (!res.ok) {
          throw new Error("we could not fetch properies");
        }
        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      } finally {
        setLoaindg(false);
      }
    };

    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="">no properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
