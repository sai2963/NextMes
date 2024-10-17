import React, { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import { Heart } from "lucide-react";

export default function Getmessages({ messages }) {
  const [likedmesgs, setLikedmesgs] = useState({});

  const handlelike = async (mesId) => {
    try {
      // Ensure mesId is a valid string
      if (typeof mesId !== "string") {
        console.error("Invalid mesId:", mesId);
        return;
      }

      const mesRef = doc(db, "messages", mesId);
      const mesSnap = await getDoc(mesRef);

      if (mesSnap.exists()) {
        const currentlikes = mesSnap.data().likes || 0;
        const isLiked = likedmesgs[mesId];
        const newLikes = isLiked ? currentlikes - 1 : currentlikes + 1;

        await updateDoc(mesRef, {
          likes: newLikes,
        });

        setLikedmesgs((prev) => ({
          ...prev,
          [mesId]: !isLiked,
        }));

        // Update likes in the messages array
        messages = messages.map((message) =>
          message.id === mesId ? { ...message, likes: newLikes } : message
        );
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          Messages
        </span>
      </h2>
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-[2px] rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <div className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl p-6 h-full">
              <h3 className="text-xl font-semibold mb-2 flex justify-between">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  {message.username}
                </span>
                <span className="px-6 pb-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handlelike(message.id);
                    }}
                    className={`flex items-center space-x-2 ${
                      likedmesgs[message.id] ? "text-red-500" : "text-gray-400"
                    } hover:text-red-500 transition-colors duration-200`}
                  >
                    <Heart
                      className={likedmesgs[message.id] ? "fill-current" : ""}
                    />
                    <span className="text-sm font-semibold">
                      {message.likes || 0} likes
                    </span>
                  </button>
                </span>
              </h3>
              <p className="text-white">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
