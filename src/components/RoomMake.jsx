import { useEffect, useState } from "react";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { useNavigate } from "react-router-dom"

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

    navigate('/roomjoin')
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          sendData(e);
          setOpen(true);
        }}
      >
        <span>偽名:</span>
        <input
          type="text"
          value={pseudo}
          required
          onChange={(e) => {
            setPseudo(e.target.value);
          }}
          disabled={open}
        />
        <span>本名:</span>
        <input
          type="text"
          value={real}
          onChange={(e) => {
            setReal(e.target.value);
          }}
          required
          disabled={open}
        />
        <br />
        <br />
        <span>部屋名:</span>
        <input
          type="text"
          id="roomName"
          disabled={open}
          value={rname}
          required
          onChange={(e) => {
            setRname(e.target.value);
          }}
        />
        <button disabled={open}>部屋を作る</button>
        {/**部屋の作成 */}
      </form>
      <button
        disabled={!open}
        onClick={() => {
          setOpen(false);

          //部屋を閉じる処理
        }}
      >
        部屋を閉じる
      </button>
      {/* <button onClick={()=>{}}>入室状況の更新</button> */}
    </div>
  );
};

export default RoomMake;
