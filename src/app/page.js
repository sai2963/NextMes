'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/clientApp';
function formatDate(timestamp) {
    if (!timestamp || !timestamp.toDate) {
      return 'Invalid date';
    }
    const date = timestamp.toDate();
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, "messages");
        const q = query(messagesRef, orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const messagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              NextMes
            </span>
          </h1>
          <p className="text-2xl text-purple-100">
            Connect, Share, Inspire
          </p>
        </header>

        <main className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Share Your Thoughts
            </h2>
            <p className="text-xl text-purple-200">
              Join our vibrant community and express yourself in a safe,
              engaging environment.
            </p>
            <div className="space-x-4">
              <Link href="/messages/new" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full hover:from-cyan-600 hover:to-blue-600 transition duration-300">
                Post a Message
              </Link>
              <Link href="/messages" className="inline-block bg-white bg-opacity-20 text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-30 transition duration-300">
                View Messages
              </Link>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Featured Messages
            </h3>
            {loading ? (
              <p className="text-white">Loading messages...</p>
            ) : messages.length > 0 ? (
              <ul className="space-y-4">
                {messages.map((msg) => (
                  <li key={msg.id} className="bg-white bg-opacity-20 rounded-lg p-4">
                    <p className="text-white">{`"${msg.message}"`}</p>
                    <p className="text-sm text-purple-200 mt-2"> {msg.username}</p>
                    <p className="text-xs text-purple-300">{formatDate(msg.createdAt)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No messages found.</p>
            )}
          </div>
        </main>

        <footer className="mt-16 text-center text-purple-200">
          <p>&copy; 2024 NextMes. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}