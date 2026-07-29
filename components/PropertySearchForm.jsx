"use client";

import { useState } from "react";
import GroupSelector from "./GroupSelector";
import { useRouter } from "next/navigation";

const selectValues = [
  "All",
  "Apartment",
  "Studio",
  "Condo",
  "House",
  "Cabin Or Cottage",
  "Loft",
  "Room",
  "Other",
];
// end of values

const PropertySearchForm = () => {
  const [location, setLocation] = useState("");
  const [proeprtyType, setPropertyType] = useState("All");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (location === "" && proeprtyType === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&propertyType=${proeprtyType}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Key Words or Location"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <GroupSelector
          id="property-typ"
          values={selectValues}
          selectValue={proeprtyType}
          onHandle={(e) => setPropertyType(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
