import { useEffect, useState } from "react";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { useNavigate } from "react-router-dom"
import "./styles/RoomMake.css"

const RoomMake = (props) => {
  const [pseudo, setPseudo] = useState(""); //偽名
  const [real, setReal] = useState(""); //本名
  const [open, setOpen] = useState(false);
  const [rname, setRname] = useState("");
  const navigate = useNavigate()

  // スタート時すべてのユーザーが自身のApp.jsxのselfに自身のデータをセットする(props.setSelf)
  // 後でチャットするときに自分のデータが必要になるため(idや名前、アイコンなど)

  const getData = async (e) => {
    e.preventDefault();
  };

  const sendData = async (e) => {
    e.preventDefault();
    // Add a new document in collection "cities"
    //docの第二引数がcollection名、第三匹数がdocumet名
    await setDoc(doc(db, "Room", rname), {
      name: [{ real, pseudo }],
    });

    //loginlessなゲームを実装するためにlocalstorageにuserを保存
    localStorage.setItem("user", JSON.stringify({ pseudo: pseudo, real: real, isExistingRoom: rname }))
    localStorage.setItem("maker",1); //ルーム作成者なら1,参加者なら0

    navigate('/roomjoin')
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          sendData(e);
          setOpen(true);
        }}
        className="name-class"
      >
        <div className="gimei">
          <p>偽名:</p>
          <input
          type="text"
          value={pseudo}
          required
          onChange={(e) => {
            setPseudo(e.target.value);
          }}
          disabled={open}
          placeholder="偽名入力"
          className="textbox"
        />
        </div>
        <div className="honmyou">
          <p>本名:</p>
          <input
            type="text"
            value={real}
            onChange={(e) => {
              setReal(e.target.value);
            }}
            required
            disabled={open}
            placeholder="本名入力"
            className="textbox"
          />
        </div>
        <div className="room-class">
          <div className="room">
            <p>部屋名:</p>
            <input
              type="text"
              id="roomName"
              disabled={open}
              value={rname}
              required
              onChange={(e) => {
              setRname(e.target.value);
            }}
              placeholder="部屋名入力"
              className="textbox"
            />
          </div>
          <div className="button-class2">
            <button disabled={open} className="create-room">部屋を作る</button>
          </div>
        </div>
      </form>
      {/* <button onClick={()=>{}}>入室状況の更新</button> */}
    </div>
  );
};

export default RoomMake;
