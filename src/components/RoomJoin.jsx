import { arrayUnion, collection, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import "./styles/RoomJoin.css"

const ARoom = ({ rname, num, members, joined, setJoined }) => {

  const [pseudo, setPseudo] = useState(""); //偽名
  const [real, setReal] = useState(""); //本名
  const navigate = useNavigate();

  //参加者を追加する
  const addPerson = async (rname, e) => {
    //loginlessなゲームを実装するためにlocalstorageにuserを保存
    localStorage.setItem("user", JSON.stringify({ pseudo: pseudo, real: real, isExistingRoom: rname }))

    e.preventDefault()

    console.log(pseudo, real)
    const RoomRef = doc(db, "Room", rname);

    //参加者をnameの配列に追加
    await updateDoc(RoomRef, {
      name: arrayUnion({ pseudo: pseudo, real: real })
    });


    setJoined(true)
  }

  //参加者の人数を監視して、5人になったらページをredirect
  //パスをrnameにして遷移先のページで取得し、部屋を識別する
  const redirectToChat = async () => {
    if (num == 4) {
      try {
        const { isExistingRoom } = await JSON.parse(localStorage.getItem('user'));
        console.log(isExistingRoom)
        if (isExistingRoom == rname) {
          navigate(`/chat/${rname}`)
        } else {
          return
        }
      }
      catch {
        console.log("ローカルストレージに値が反映されていない")
        // console.log(localStorage.getItem("user"))
        // setTimeout(() => {
        //   console.log(localStorage.getItem("user"))
        //   if(localStorage.getItem("user") != null){
        //     redirectToChat()
        //   }
        // }, 1000);
      }
    }
  }

  useEffect(() => {
    redirectToChat()
  }, [num])


  return (
    <div className="ARoom">
      <h1>ルーム名:{rname}</h1>  {/*部屋の名前*/}
      <p>{num}/5</p> {/* 部屋にいる人数*/}
      {/*部屋にいる人たち */}
      <table className="name-list">
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.real}さん</td>
            </tr>
          ))}
          {(() => {
            let dst = [];
            for (let i = 0; i < 5 - members.length; i++) {
              dst.push(
                <tr key={i}>
                  <td>&emsp;</td>
                </tr>
              );
            }
            return dst;
          })()}
        </tbody>
      </table>
      <form onSubmit={(e) => addPerson(rname, e)} className="name-class join-name-class">
        <div className="join-input gimei">
          <span>偽名:</span>
          <input
            required
            type="text"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
            className="textbox"
            placeholder="偽名入力"
          />
        </div><br />
        <div className="join-input honmyou">
          <span>本名:</span>
          <input
            required
            type="text"
            value={real}
            onChange={(e) => {
              setReal(e.target.value);
            }}
            className="textbox"
            placeholder="本名入力"
          />
        </div><br />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="join-input create-room join-room"
          disabled={joined || Boolean(Number(localStorage.getItem("maker")))}
        >
          入室
        </motion.button>{" "}
        {/**入出後か、ルーム作成者ならdisabled */}
      </form>
    </div>
  );
};

const RoomJoin = ({ joined, setJoined }) => {
  const [Rooms, setRooms] = useState([]); //ルーム一覧

  useEffect(() => {

    //データベースを監視し、追加roomがあったらこの処理を再度発火し、データを取得する
    const unsubscribe = onSnapshot(query(collection(db, 'Room')), (snapshot) => {
      const roomList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setRooms(roomList)
      console.log(roomList)
    })


    return () => unsubscribe();

  }, [])

  return (
    <div className="join-box">
      <h1>部屋一覧</h1>
      {/* <button onClick={()=>{
        //現在作られてる部屋の更新
      }}>再読み込み</button> */}
      {Rooms != null ?
        <>
          {Rooms.map((room, index) => {
            return (
              <div key={index}>
                {/* {room.name.length < 2 && */}
                <ARoom joined={joined} setJoined={setJoined} rname={room.id} num={room.name.length} members={room.name} index={index} />
                {/* } */}
              </div>
            )
          })}
        </> :
        <>
          <p>部屋がまだありません。</p>
        </>
      }
    </div>
  );
};

export default RoomJoin;
