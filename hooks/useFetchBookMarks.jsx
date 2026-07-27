"use client";
import { useEffect, useState } from "react";

const useFetchBookMarks = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch Saved Properties");
        }
      } catch (error) {
        console.log(error || "Failed to load data");
        toast.error("Failed to fetch Saved Properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);
  return { loading, properties };
};

export default useFetchBookMarks;
