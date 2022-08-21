import { motion } from "framer-motion";
import React from "react";
import Backdrop from "./Backdrop";

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
};

const Modal: React.FC<Props> = ({ handleClose, children }) => {
  const dropIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
