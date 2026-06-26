import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { socket } from "../../../socket/socket";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/enquery/all`
      );

      setMessages(data.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchMessages();
  if (localStorage.getItem("Messages") === "Messages") {
  localStorage.removeItem("Messages");
}

  const handleNewEnquiry = async (data) => {
    console.log("New enquiry/contact:", data);

    if (data?.type === "Messages") {

      await fetchMessages();
    }

  };

  socket.on("newEnquiry", handleNewEnquiry);

  return () => {
    socket.off("newEnquiry", handleNewEnquiry);
  };
}, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-medium">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Messages ({messages.length})
        </h1>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          No messages found
        </div>
      ) : (
        <div className="grid gap-5">
          {messages.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    item.type === "contact"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.type}
                </span>

                <span className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-3">
                {item.name && (
                  <div>
                    <span className="font-semibold">Name:</span> {item.name}
                  </div>
                )}

                {item.phone && (
                  <div>
                    <span className="font-semibold">Phone:</span> {item.phone}
                  </div>
                )}

                {item.email && (
                  <div>
                    <span className="font-semibold">Email:</span> {item.email}
                  </div>
                )}

                {item.role && (
                  <div>
                    <span className="font-semibold">Role:</span> {item.role}
                  </div>
                )}

                {item.subject && (
                  <div>
                    <span className="font-semibold">Subject:</span>{" "}
                    {item.subject}
                  </div>
                )}

                {item.lookingFor && (
                  <div>
                    <span className="font-semibold">Looking For:</span>{" "}
                    {item.lookingFor}
                  </div>
                )}

                {item.location && (
                  <div>
                    <span className="font-semibold">Location:</span>{" "}
                    {item.location}
                  </div>
                )}

                {item.budget && (
                  <div>
                    <span className="font-semibold">Budget:</span>{" "}
                    {item.budget}
                  </div>
                )}
              </div>

              {item.message && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">Message</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {item.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;