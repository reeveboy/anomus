import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { trpc } from "../../utils/trpc";
import NextLink from "next/link";

const Room: React.FC = () => {
  const router = useRouter();
  const roomId = parseInt(router.query.room_id as string);

  const { data: session } = trpc.useQuery(["auth.getSession"]);

  const getRoomQuery = trpc.useQuery(["room.get-room", { id: roomId }]);

  const createMessageMutation = trpc.useMutation(["message.create-message"]);

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createMessageMutation.mutate({
      roomId,
      message,
    });

    setMessage("");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header session={session} />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="text-3xl ">{getRoomQuery.data?.name}</div>
        <p className="p-2"></p>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            value={message}
            className="text-lg text-gray-300 bg-gray-700 border-2 border-gray-300 hover:border-pink-500 rounded focus:outline-none focus:border-pink-500  p-2"
            name="message"
            id="message"
            cols={70}
            rows={4}
            maxLength={255}
            wrap="hard"
            placeholder="Type your message here"></textarea>
          <p className="p-2"></p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="shadow border-2  border-gray-300 hover:border-pink-500  focus:shadow-outline focus:outline-none py-2 px-4 rounded">
              Submit your message
            </button>
            <p className="p-2"></p>
            {/* @ts-ignore */}
            {getRoomQuery.data?.userId === session?.user.id && (
              <NextLink href={`/room/messages/${roomId}`}>
                <a
                  type="button"
                  className="shadow border-2  border-gray-300 hover:border-pink-500  focus:shadow-outline focus:outline-none py-2 px-4 rounded">
                  View All Messages
                </a>
              </NextLink>
            )}
          </div>
        </form>

        {getRoomQuery.isLoading && <Loading />}
        {createMessageMutation.isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Room;
