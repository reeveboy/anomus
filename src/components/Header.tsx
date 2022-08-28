import { signIn, signOut } from "next-auth/react";
import React from "react";

type Props = {
  session?: any;
};

const Header: React.FC<Props> = ({ session }) => {
  return (
    <div className="h-[60px] flex justify-between items-center bg-gray-900 px-4 sticky top-0 left-0">
      <div className="tracking-tight text-2xl font-black">Anomus</div>
      {session ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
};

export default Header;
