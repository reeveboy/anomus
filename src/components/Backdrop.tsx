import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Backdrop: React.FC<Props> = ({ children, onClick }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-[#000000e1] flex justify-center items-center overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}>
      {children}
    </motion.div>
  );
};

export default Backdrop;
