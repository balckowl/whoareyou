import { useState } from "react";

const Top = () => {
  const [Rooms,setRooms] = useState([]);
  return (
    <div>
      <button>create</button>
      {Rooms.map((room,index)=>{
        return <ARoom key={index} {...room} />;
      })}
    </div>
  );
};

const ARoom = (props) => {
  return (
    <div>
      <h1>{props.name}</h1> {/* 部屋の名前 */}
      <p>{props.num}/5</p> {/* 部屋にいる人数 */}
      <ul>
        {props.members.map((member,index) => {
            return <li key={index}>{member}</li>;
        })}
      </ul>
      {props.isHost ? <button>START</button> : null}{" "}
      {/* ホストならスタートボタンを表示 */}
    </div>
  );
};

export default Top;
