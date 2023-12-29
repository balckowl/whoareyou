import { arrayUnion, collection, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import { useNavigate } from "react-router-dom"

const ARoom = ({ rname, num, members }) => {

  const [pseudo, setPseudo] = useState(""); //偽名
  const [real, setReal] = useState(""); //本名
  const navigate = useNavigate();

  //参加者を追加する
  const addPerson = async (rname, e) => {
    e.preventDefault()

    console.log(pseudo, real)
    const RoomRef = doc(db, "Room", rname);

    //参加者をnameの配列に追加
    await updateDoc(RoomRef, {
      name: arrayUnion({ pseudo: pseudo, real: real })
    });

    //loginlessなゲームを実装するためにlocalstorageにuserを保存
    localStorage.setItem("user", JSON.stringify({ pseudo: pseudo, real: real, isExistingRoom: rname }))
  }

  //参加者の人数を監視して、5人になったらページをredirect
  //パスをrnameにして遷移先のページで取得し、部屋を識別する
  const redirectToChat = async() => {
    if (num == 2) {
      const { isExistingRoom } = await JSON.parse(localStorage.getItem('user'));
      console.log(isExistingRoom)

      if (isExistingRoom == rname) {
        navigate(`/chat/${rname}`)
      } else {
        return
      }
    }
  }

  useEffect(() => {
    redirectToChat()
  }, [num])


  return (
    <div>
      <h1>{rname}</h1>  {/*部屋の名前*/}
      <p>{num}/5</p> {/* 部屋にいる人数*/}
      {/*部屋にいる人たち */}
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member.real}さん</li>
        ))}
      </ul>
      <form onSubmit={(e) => addPerson(rname, e)}>
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
        <button>入室</button>
      </form>
    </div>
  );
};

const RoomJoin = (props) => {
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
    <div>
      <h1>部屋一覧</h1>
      {/* <button onClick={()=>{
        //現在作られてる部屋の更新
      }}>再読み込み</button> */}
      {Rooms != null ?
        <>
          {Rooms.map((room, index) => {
            // return <ARoom ToChat={props.ToChat} pseudo={pseudo} real={real} key={index} {...room} />;
            return (
              <div key={index}>
                {/* {room.name.length < 2 && */}
                  <ARoom rname={room.id} num={room.name.length} members={room.name} index={index} />
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
