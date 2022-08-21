import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-3xl ">Want to have an Annoymous Disccusion?</div>
      <p className="p-2"></p>
      <div className="flex justify-between">
        <button className="shadow bg-emerald-500 hover:bg-emerald-600 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
          Create a room
        </button>
        <p className="p-2"></p>
        <button className="shadow bg-sky-500 hover:bg-sky-600 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
          Join a room
        </button>
      </div>
    </div>
  );
};

export default Home;
