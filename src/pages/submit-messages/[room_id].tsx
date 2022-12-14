import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { trpc } from "../../utils/trpc";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import { getShareLink } from "../../utils/getShareLink";

const Room: React.FC = () => {
  const router = useRouter();
  const roomId = router.query.room_id as string;

  const { data: session, status } = useSession();

  const getRoomQuery = trpc.useQuery(["room.get-room", { id: roomId }], {
    onSuccess: (data) => {
      if (!data) {
        router.replace("/");
      }
    },
  });

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

  const shareUrl = getShareLink(roomId);

  return (
    <div className="w-full h-screen flex flex-col">
      <Header session={session} />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="text-3xl ">{getRoomQuery.data?.name}</div>
        <p className="p-2"></p>
        <form className="w-4/5 md:w-1/2" onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            value={message}
            className="w-full text-lg text-gray-300 bg-gray-900 border-2 border-gray-300 hover:border-pink-500 rounded focus:outline-none focus:border-pink-500  p-2"
            name="message"
            id="message"
            rows={3}
            maxLength={255}
            wrap="hard"
            placeholder="Type your message here"></textarea>
          <p className="p-2"></p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="shadow border-2 bg-gray-900 border-gray-300 hover:border-pink-500  focus:shadow-outline focus:outline-none py-2 px-4 rounded">
              Submit your message
            </button>
            <p className="p-2"></p>
            {getRoomQuery.data?.ownerId === session?.user?.id && (
              <NextLink href={`/view-messages/${roomId}`}>
                <a
                  type="button"
                  className="shadow border-2  border-gray-300 hover:border-pink-500  focus:shadow-outline focus:outline-none py-2 px-4 rounded">
                  View All Messages
                </a>
              </NextLink>
            )}
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <WhatsappShareButton className="mx-1" url={shareUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TelegramShareButton className="mx-1" url={shareUrl}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TwitterShareButton className="mx-1" url={shareUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton className="mx-1" url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        {getRoomQuery.isLoading && <Loading />}
        {createMessageMutation.isLoading && <Loading />}
        {status == "loading" && <Loading />}
      </div>
    </div>
  );
};

export default Room;
