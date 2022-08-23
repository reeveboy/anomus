import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000e1] flex justify-center items-center">
      <img src="/loading.svg" />
    </div>
  );
};

export default Loading;
