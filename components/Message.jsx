"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message }) => {
  const dateOption = new Date(message?.createdAt).toLocaleDateString("US", {
    second: "numeric",
    hour: "2-digit",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const [isRead, setIsRead] = useState(message.read);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCounte) =>
          read ? prevCounte - 1 : prevCounte + 1,
        );
        toast.success(read ? "Marked As R ead" : "Marked as New");
      }
    } catch (error) {
      console.log(error);
      toast.error("somethin went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    setDelLoading(true);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.status === 200) {
        toast.success("Property Deleted");
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
      } else if (
        res.status.toString().includes("4") ||
        res.status.toString().includes("5")
      ) {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDelLoading(false);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div
      className={`relative ${delLoading ? "animate-pulse bg-gray-100" : "bg-white"} transition-all duration-150  p-4 rounded-md shadow-md border border-gray-200 `}
    >
      {!isRead && (
        <div
          className="absolute top-2 right-2
       bg-yellow-500 text-white px-2 py-1 rounded-md"
        >
          new
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message?.property?.name}
      </h2>
      <p className="text-gray-700">{message?.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href="mailto:recipient@example.com" className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href="tel:123-456-7890" className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {dateOption}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${!loading && isRead ? "bg-green-300 text-white" : !loading && !isRead ? "bg-blue-500 text-white" : "bg-gray-300 text-white animate-pulse"} py-1 px-3 rounded-md`}
      >
        {loading ? "loading ..." : isRead ? " Mark IS Read" : " Mark As Read"}
      </button>
      <button
        onClick={() => handleDeleteClick(message._id)}
        className={`mt-4  text-white py-1 px-3 ${delLoading ? "bg-gray-300 animate-pulse  " : "bg-red-500"} transition-all duration-150 rounded-md`}
      >
        {delLoading ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};

export default Message;
