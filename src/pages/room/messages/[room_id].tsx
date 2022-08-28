import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { trpc } from "../../../utils/trpc";

const DisccusionRoom: React.FC = () => {
  const router = useRouter();
  const roomId = parseInt(router.query.room_id as string);

  const { data: room, isLoading: rl } = trpc.useQuery([
    "room.get-room",
    { id: roomId },
  ]);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });
  const { data: messages, isLoading: ml } = trpc.useQuery([
    "message.get-messages",
    { roomId },
  ]);

  if (status === "loading" || rl || ml) {
    return <Loading />;
  }

  if (
    !room ||
    // @ts-ignore
    (room.userId !== session.user.id && status === "authenticated")
  ) {
    router.push("/");
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header session={session} />
      <p className="p-4" />
      <div className="flex w-full h-full justify-center items-center rounded">
        <div className="w-[800px] p-8 rounded">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className="text-lg border-2 border-gray-400 hover:border-pink-500 mb-2 py-2 px-4 rounded">
              {msg.message}
            </div>
          ))}
        </div>
      </div>
      <p className="p-4" />
    </div>
  );
};

export default DisccusionRoom;
