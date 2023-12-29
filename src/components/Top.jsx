import { Link } from "react-router-dom";

const Top = (props) => {
  return (
    <div>
      <button>
        <Link to="/roommake">部屋を作る</Link >
      </button>
      <button>
        <Link to="/roomjoin">部屋を探す</Link>
      </button>
    </div>
  );
};

export default Top;
