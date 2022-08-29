import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { trpc } from "../../utils/trpc";

const DisccusionRoom: React.FC = () => {
  const router = useRouter();
  const roomId = parseInt(router.query.room_id as string);

  const getRoomQuery = trpc.useQuery(["room.get-room", { id: roomId }], {
    onSuccess: (data) => {
      if (!data) {
        router.push("/");
      }
    },
  });
  const { data: room } = getRoomQuery;

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    // @ts-ignore
    if (room?.userId != session?.user.id) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header session={session} />
      <p className="p-4" />
      <div className="flex w-full h-full justify-center items-center rounded overflow-y-auto">
        <div className="w-[800px] p-8 rounded">
          {room?.Message?.map((msg, index) => (
            <div
              key={index}
              className="text-lg border-2 border-gray-400 hover:border-pink-500 mb-2 py-2 px-4 rounded">
              {msg.message}
            </div>
          ))}
        </div>
      </div>
      <p className="p-4" />

      {getRoomQuery.isLoading && <Loading />}
      {status === "loading" && <Loading />}
    </div>
  );
};

export default DisccusionRoom;
