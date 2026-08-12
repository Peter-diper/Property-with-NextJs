"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

const UnreadMessageCount = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) {
      // prevent sending request
      return;
    }
    const fetchMessageCount = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.status === 200) {
          const { count } = await res.json();
          setUnreadCount(count);
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessageCount();
  }, [session]);

  return (
    unreadCount !== 0 && (
      <span
        className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 ${loading ? "bg-gray-300 animate-pulse" : "bg-red-600"} transition-colors duration-150 rounded-full`}
      >
        {loading ? "0" : unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
