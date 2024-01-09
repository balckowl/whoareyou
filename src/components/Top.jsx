import { Link } from "react-router-dom";
import "./styles/Top.css";

const Top = (props) => {
  return (
    <div className="button-class">
        <Link to="/roommake"><button>部屋を作る</button></Link >
        <Link to="/roomjoin">
          <button onClick={()=>{
            localStorage.setItem("maker",0);//ルーム作成者なら1,参加者なら0
          }}>部屋を探す
          </button>
        </Link>
    </div>
  );
};

export default Top;
