"use client";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/Propertycardskeleton";
import useFetchBookMarks from "@/hooks/useFetchBookMarks";

const SavedPropertiesPage = () => {
  const { loading, properties } = useFetchBookMarks();
  const skcluton = [1, 2, 3, 4];

  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skcluton.map((property) => (
              <PropertyCardSkeleton key={property} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl ml-2 mb-4 font-semibold">Saved Properties:</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>no saved properties</p>
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

export default SavedPropertiesPage;
