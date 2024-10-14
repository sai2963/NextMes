import React from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import { redirect } from 'next/navigation';
export default function NewMessage() {
  async function writemessage(formData) {
    "use server";
    const username = formData.get("username");
    const message = formData.get("message");
    const mesData = {
      username,
      message,
      createdAt: new Date(),
    };
    const docRef = await addDoc(collection(db, "messages"), mesData);
    redirect('/messages')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Send a Message</h2>
        <form action={writemessage} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-purple-100 mb-2">Your Good Name</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              className="w-full px-3 py-2 bg-white bg-opacity-50 rounded-md text-purple-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-opacity-100 transition duration-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-purple-100 mb-2">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows={5} 
              className="w-full px-3 py-2 bg-white bg-opacity-50 rounded-md text-purple-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-opacity-100 transition duration-200"
              placeholder="Type your message here"
            />
          </div>
          <div>
            <button 
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}