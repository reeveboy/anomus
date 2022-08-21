import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Modal from "../components/Modal";
import { trpc } from "../utils/trpc";

const Home: React.FC = () => {
  const { data } = trpc.useQuery(["hello", { text: "world" }]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-3xl ">Want to have an Annoymous Disccusion?</div>
      <p className="p-2"></p>
      <button
        onClick={handleOpen}
        className="shadow border-2 border-pink-400 hover:border-pink-500 focus:shadow-outline focus:outline-none py-2 px-4 rounded">
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
              <form>
                <div>
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-1"
                    htmlFor="room-topic">
                    Room Topic
                  </label>
                  <input
                    className="text-gray-800 bg-gray-100 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                    type="text"
                    id="room-topic"
                    placeholder="Book Title"
                  />
                </div>
                <p className="p-2"></p>
                <div>
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-1"
                    htmlFor="room-topic">
                    Room Description
                  </label>
                  <textarea
                    className="text-gray-800 bg-gray-100 appearance-none border-2 border-gray-600 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                    id="room-topic"
                    placeholder="Book Title"
                    cols={70}
                    rows={4}
                    maxLength={191}
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
    </div>
  );
};

export default Home;
