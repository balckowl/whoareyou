import { useState } from "react";

const Top = (props) => {
  const [Rooms, setRooms] = useState([]);
  const [pseudo, setPseudo] = useState(""); //偽名
  const [real, setReal] = useState(""); //本名

  // スタート時App.jsxのnameに値をセットする(props.setName)

  return (
    <div>
      <span>偽名:</span>
      <input
        type="text"
        id="pseudo"
        value={pseudo}
        onChange={(e) => {
          setPseudo(e.target.value);
        }}
      />
      <span>本名:</span>
      <input
        type="text"
        id="real"
        value={real}
        onChange={(e) => {
          setReal(e.target.value);
        }}
      />
      <button>create</button>
      {Rooms.map((room, index) => {
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
        {props.members.map((member, index) => {
          return <li key={index}>{member}</li>;
        })}
      </ul>
      {props.isHost ? <button>START</button> : null}{" "}
      {/* ホストならスタートボタンを表示 */}
    </div>
  );
};

export default Top;
