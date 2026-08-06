"use client";
import { useState, useEffect } from "react";
import Message from "@/components/Message";
import MessageSkeleton from "./MessageSkeleton";

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

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md  m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {loading &&
              [1, 2].map((loading) => <MessageSkeleton key={loading} />)}

            {!loading && messages.length === 0 && (
              <p className="text-center">You have no messages</p>
            )}

            {messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
