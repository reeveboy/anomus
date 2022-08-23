import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { trpc } from "../../utils/trpc";

const Room: React.FC = () => {
  const router = useRouter();
  const roomId = parseInt(router.query.room_id as string);

  const getRoomQuery = trpc.useQuery(["room.get-room", { id: roomId }]);

  const createMessageMutation = trpc.useMutation(["message.create-message"]);
  const getMessagesQuery = trpc.useQuery(["message.get-messages", { roomId }]);
  const { data: messages } = getMessagesQuery;
  console.log(messages);

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
  const handleOpen = () => {
    getRoomQuery.refetch();
    setShow(true);
  };

  return (
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
          {messages?.length != 0 ? (
            <button
              onClick={handleOpen}
              type="button"
              className="shadow border-2  border-gray-300 hover:border-pink-500  focus:shadow-outline focus:outline-none py-2 px-4 rounded">
              View all messages
            </button>
          ) : (
            ""
          )}
        </div>
      </form>

      <AnimatePresence
        initial={false}
        onExitComplete={() => null}
        exitBeforeEnter={true}>
        {show && (
          <Modal handleClose={handleClose}>
            <div className="w-[800px] bg-gray-100 text-gray-800 p-8 rounded">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className="text-lg border-2 border-gray-600 hover:border-pink-500 mb-2 py-2 px-4 rounded">
                  {msg.message}
                </div>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {getRoomQuery.isLoading && <Loading />}
      {createMessageMutation.isLoading && <Loading />}
      {getMessagesQuery.isLoading && <Loading />}
    </div>
  );
};

export default Room;
