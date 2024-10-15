import React from 'react';

export default function Getmessages({ messages }) {
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
                <h3 className="text-xl font-semibold mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    {message.username}
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