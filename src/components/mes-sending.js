'use client'
import { useFormStatus } from "react-dom";
export default function MesSend() {
  const status = useFormStatus();
  if (status.pending) {
    return (
      <p className="w-full bg-purple-600 text-white text-center font-bold py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200">
        Sending ...
      </p>
    );
  }
  return (
    <>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200"
      >
        Send Message
      </button>
    </>
  );
}
