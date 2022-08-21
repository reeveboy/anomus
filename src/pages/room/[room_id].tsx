import React from "react";

const room: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      <div className="text-3xl ">Topic Discussion Room</div>
      <p className="p-2"></p>
      <textarea
        className="text-lg text-gray-300 bg-gray-800 border-gray-500 hover:border-indigo-300 border rounded-lg focus:outline focus:outline-indigo-300  p-2"
        name="message"
        id="message"
        cols={70}
        rows={4}
        maxLength={256}
        wrap="hard"
        placeholder="Type your message here"></textarea>
      <p className="p-2"></p>
      <button className="shadow border border-gray-500 hover:border-pink-200 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
        Submit your message
      </button>
      <button className="absolute bottom-1 right-1 shadow border border-gray-500 hover:border-amber-200 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
        View all messages
      </button>
    </div>
  );
};

export default room;
