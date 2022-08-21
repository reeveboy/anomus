import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-3xl ">Want to have an Annoymous Disccusion?</div>
      <p className="p-2"></p>
      <div className="flex justify-between">
        <button className="shadow border border-gray-500 hover:border-emerald-200 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
          Create a room
        </button>
        <p className="p-2"></p>
        <button className="shadow  border border-gray-500 hover:border-sky-200 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
          Join a room
        </button>
      </div>
    </div>
  );
};

export default Home;
