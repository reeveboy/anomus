import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { trpc } from "../../utils/trpc";

const DisccusionRoom: React.FC = () => {
  const router = useRouter();
  const roomId = router.query.room_id as string;

  const getRoomQuery = trpc.useQuery(
    ["room.get-owner-room-messages", { roomId }],
    {
      onSuccess: (data) => {
        if (!data) {
          router.replace("/");
        }
      },
    }
  );
  const { data: room } = getRoomQuery;

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace("/");
    },
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <Header session={session} />
      <p className="p-4" />
      <div className="flex flex-col w-3/4 mx-auto">
        <div className="text-3xl">{room?.name} - Discussion</div>
        <p className="p-2"></p>
        <div className="w-full rounded">
          {room?.Message?.map((msg, index) => (
            <div
              key={index}
              className="text-lg border-2 border-gray-400 hover:border-pink-500 mb-4 py-2 px-4 rounded">
              {msg.message}
            </div>
          ))}
          {room?.Message?.length == 0 ? (
            <div className="text-center">No messages yet!</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="p-4" />

      {getRoomQuery.isLoading && <Loading />}
      {status === "loading" && <Loading />}
    </div>
  );
};

export default DisccusionRoom;
