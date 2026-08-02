"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        if (res.status === 200) {
          const dataMessages = await res.json();
          setMessages(dataMessages);
        }
      } catch (error) {
        console.log("Error fetching messages");
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []); 


  return <div>Messages</div>;
};

export default Messages;
