import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import { signIn } from "next-auth/react";

const Home: React.FC = () => {
  const router = useRouter();
  const createRoomMutation = trpc.useMutation(["room.create-room"], {
    onSuccess: (data) => {
      router.push(`/room/${data.id}`);
    },
  });

  const { data: session } = trpc.useQuery(["auth.getSession"]);

  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "roomName") {
      setRoomName(value);
    } else if (name === "roomDescription") {
      setRoomDescription(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoomMutation.mutate({
      name: roomName,
      description: roomDescription,
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => {
    if (!session) {
      signIn();
    }
    setShow(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header session={session} />
      <div className="w-screen h-full flex flex-col justify-center items-center">
        <div className="text-3xl ">Want to have an Annoymous Disccusion?</div>
        <p className="p-2"></p>
        <button
          onClick={handleOpen}
          className="shadow border-2 border-pink-300 hover:border-pink-500 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
          Create a room
        </button>

        <AnimatePresence
          initial={false}
          onExitComplete={() => null}
          exitBeforeEnter={true}>
          {show && (
            <Modal handleClose={handleClose}>
              <div className="w-[500px] bg-gray-100 text-gray-800 p-8 rounded">
                <div className="text-2xl font-bold">Lets Create Your Room!</div>
                <p className="p-2"></p>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-1"
                      htmlFor="room-topic">
                      Room Name *
                    </label>
                    <input
                      value={roomName}
                      onChange={handleChange}
                      className="text-gray-800 bg-gray-100 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-500 hover:border-pink-500 "
                      type="text"
                      id="roomName"
                      name="roomName"
                      placeholder="Room Name"
                      required
                      minLength={3}
                    />
                  </div>
                  <p className="p-2"></p>
                  <div>
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-1"
                      htmlFor="roomDescription">
                      Room Description
                    </label>
                    <textarea
                      value={roomDescription}
                      onChange={handleChange}
                      className="text-gray-800 bg-gray-100 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-500 hover:border-pink-500"
                      id="roomDescription"
                      name="roomDescription"
                      placeholder="Room Description"
                      cols={70}
                      rows={4}
                      maxLength={255}
                    />
                  </div>
                  <p className="p-2"></p>
                  <div className="flex justify-center">
                    <button className="border-2 border-gray-800 hover:border-pink-500 focus:shadow-outline py-2 px-4 rounded">
                      Lets go!
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {createRoomMutation.isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Home;
