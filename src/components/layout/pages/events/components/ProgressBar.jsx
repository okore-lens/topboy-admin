import React, { useEffect } from "react";
// import { motion } from "framer-motion/dist/framer-motion";
import useStorage from "../../../../../hooks/useStorage";
import { motion } from "framer-motion";

const ProgressBar = ({ file, setFile, folder, setOk }) => {
  const { url, progress } = useStorage(file, folder, setOk);
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
