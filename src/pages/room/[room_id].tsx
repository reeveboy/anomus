import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

const room: React.FC = () => {
  const router = useRouter();

  const { data } = trpc.useQuery([
    "get-room",
    { id: parseInt(router.query.room_id as string) },
  ]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      <div className="text-3xl ">{data?.name}</div>
      <p className="p-2"></p>
      <textarea
        className="text-lg text-gray-300 bg-gray-700 border-2 border-gray-300 hover:border-pink-500 rounded focus:outline-none focus:border-pink-500  p-2"
        name="message"
        id="message"
        cols={70}
        rows={4}
        maxLength={256}
        wrap="hard"
        placeholder="Type your message here"></textarea>
      <p className="p-2"></p>
      <div className="flex">
        <button className="shadow border-2  border-gray-300 hover:border-pink-500  focus:shadow-outline focus:outline-none py-2 px-4 rounded">
          Submit your message
        </button>
        <p className="p-2"></p>
        <button className="shadow border-2  border-gray-300 hover:border-pink-500  focus:shadow-outline focus:outline-none py-2 px-4 rounded">
          View all messages
        </button>
      </div>
    </div>
  );
};

export default room;
