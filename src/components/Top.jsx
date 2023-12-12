import { useState } from "react";

const Top = (props) => {
  const [Rooms, setRooms] = useState([]);
  const [pseudo, setPseudo] = useState(""); //偽名
  const [real, setReal] = useState(""); //本名
  const [open, setOpen] = useState(false);
  const [rname, setRname] = useState("");

  // スタート時すべてのユーザーが自身のApp.jsxのselfに自身のデータをセットする(props.setSelf)
  // 後でチャットするときに自分のデータが必要になるため(idや名前、アイコンなど)

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
        disabled={open}
      />
      <span>本名:</span>
      <input
        type="text"
        id="real"
        value={real}
        onChange={(e) => {
          setReal(e.target.value);
        }}
        disabled={open}
      />
      <button
        onClick={() => {
          setOpen(true);
          //部屋名や自分のデータと一緒にサーバーに送信
        }}
      >
        create
      </button>
      {/**部屋の作成 */}
        <span>部屋名:</span>
        <input
          type="text"
          id="roomName"
          disabled={open}
          value={rname}
          onChange={(e) => {
            setRname(e.target.value);
          }}
        />
      <button disabled={!open} onClick={()=>{
        setOpen(false);
        
        //部屋を閉じる処理
      }}>部屋を閉じる</button>
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
        {" "}
        {/**部屋にいる人たち */}
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
