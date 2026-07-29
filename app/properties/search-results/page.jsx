"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/Propertycardskeleton";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`,
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
        // prevent any page crash
        setProperties([]);
        toast.error("something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);
  const skcluton = [1, 2];

  if (loading) {
    return (
      <>
        <section className="bg-blue-700 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6  lg:px-8">
            <PropertySearchForm />
          </div>
        </section>
        <section className="px-4 py-6">
          <Link
            href={"/properties"}
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" />
            Back to properties
          </Link>
          <h1 className="text-2xl ml-2 mb-4 ">Saved Properties:</h1>
          <div className="container-xl lg:container m-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skcluton.map((property) => (
                <PropertyCardSkeleton key={property} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6  lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <Link
          href={"/properties"}
          className="flex items-center text-blue-500 hover:underline mb-3"
        >
          <FaArrowAltCircleLeft className="mr-2 mb-1" />
          Back to properties
        </Link>
        <h1 className="text-2xl ml-2 mb-4 ">Saved Properties:</h1>
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>no search search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default SearchResultsPage;
