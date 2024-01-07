import { Link } from "react-router-dom";

const Top = (props) => {
  return (
    <div>
      <button>
        <Link to="/roommake">部屋を作る</Link >
      </button>
      <button onClick={()=>{
        localStorage.setItem("maker",0);//ルーム作成者なら1,参加者なら0
      }}>
        <Link to="/roomjoin">部屋を探す</Link>
      </button>
    </div>
  );
};

export default Top;
