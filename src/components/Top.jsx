import { Link } from "react-router-dom";
import "./styles/Top.css";
import { useEffect } from "react";
import { motion } from "framer-motion"

const Top = (props) => {

  return (
    <div className="button-class">
      <Link to="/roommake"><motion.button whileHover={{ scale: 1.1 }}>部屋を作る</motion.button></Link >
      <Link to="/roomjoin">
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => {
          localStorage.setItem("maker", 0);//ルーム作成者なら1,参加者なら0
        }}>部屋を探す
        </motion.button>
      </Link>
    </div>
  );
};

export default Top;
