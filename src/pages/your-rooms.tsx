import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";
import NextLink from "next/link";
import Loading from "../components/Loading";

const YourRooms: React.FC = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace("/");
    },
  });

  const getUserRooms = trpc.useQuery(["room.get-user-rooms"]);
  const { data: rooms } = getUserRooms;

  return (
    <div className="w-full h-screen flex flex-col">
      <Header session={session} />
      <p className="p-4"></p>
      <div className="flex flex-col w-3/4 mx-auto">
        <div className="text-3xl">Your Rooms</div>
        <p className="p-2"></p>
        <div className="w-full">
          {rooms?.map((room, idx) => (
            <div
              key={idx}
              className="w-full flex justify-between border-2 border-gray-400 hover:border-pink-500 py-2 px-4 rounded mb-4 text-lg">
              <div>{room.name}</div>
              <div className="flex">
                <div>{room._count.Message}</div>
                <p className="px-8"></p>
                <NextLink href={`/submit-messages/${room.id}`}>
                  <a>Submit!</a>
                </NextLink>
                <p className="px-4"></p>
                <NextLink href={`/view-messages/${room.id}`}>
                  <a>View!</a>
                </NextLink>
              </div>
            </div>
          ))}
          {rooms?.length == 0 ? (
            <div className="text-center">No rooms yet!</div>
          ) : (
            ""
          )}
        </div>
      </div>

      {getUserRooms.isLoading && <Loading />}
    </div>
  );
};

export default YourRooms;
