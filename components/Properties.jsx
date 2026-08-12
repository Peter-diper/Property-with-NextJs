"use client";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Properties = () => {
  const [loading, setLoaindg] = useState(true);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`,
        );
        if (!res.ok) {
          throw new Error("we could not fetch properies");
        }
        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      } finally {
        setLoaindg(false);
      }
    };

    fetchProperties();
  }, []);

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
      </div>
    </section>
  );
};

export default Properties;
