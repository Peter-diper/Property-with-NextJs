"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import ErrorBlock from "@/components/ErrorBlock";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        return setError({ message: "Failed to load id" });
      }

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log(error);
        setError({ message: error });
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not Found
      </h1>
    );
  }

  if (error) {
    return (
      <ErrorBlock message={error.message} title={"some thing bad happend !"} />
    );
  }

  return (
    <>
      {loading && <Spinner />}

      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />

          {/* back button */}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Properties
              </Link>
            </div>
          </section>

          {/* property info */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-[70%_29%] w-full gap-6 transition-all">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  {/* book mark */}
                  <BookmarkButton property={property} />

                  {/* share button */}
                  <ShareButtons property={property} />

                  {/* contact */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
