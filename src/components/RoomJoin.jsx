import { useState } from "react";

const ARoom = (props) => {
  const sendData = async (e) => {
    e.preventDefault();
    if (props.pseudo != "" && props.real != "") {
      //入室処理

      props.ToChat();
      //props.setSelf();
    }
  };

  return (
    <div>
      <h1>{props.rname}</h1> {/* 部屋の名前 */}
      <p>{props.num}/5</p> {/* 部屋にいる人数 */}
      <button onClick={sendData}>入室</button>
      <ul>
        {" "}
        {/**部屋にいる人たち */}
        {props.members.map((member, index) => {
          return <li key={index}>{member}</li>;
        })}
      </ul>
    </div>
  );
};

const RoomJoin = (props) => {
  const [pseudo, setPseudo] = useState(""); //偽名
  const [real, setReal] = useState(""); //本名
  const [Rooms, setRooms] = useState([]); //ルーム一覧

  return (
    <div>
      <span>偽名:</span>
      <input
        type="text"
        value={pseudo}
        onChange={(e) => {
          setPseudo(e.target.value);
        }}
      />
      <span>本名:</span>
      <input
        type="text"
        value={real}
        onChange={(e) => {
          setReal(e.target.value);
        }}
      />

      <h1>部屋一覧</h1>
      {/* <button onClick={()=>{
        //現在作られてる部屋の更新
      }}>再読み込み</button> */}
      {Rooms.map((room, index) => {
        return <ARoom ToChat={props.ToChat} pseudo={pseudo} real={real} key={index} {...room} />;
      })}
    </div>
  );
};

export default RoomJoin;
