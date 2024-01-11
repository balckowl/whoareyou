import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import { useParams } from "react-router-dom"
import Answer from "./Answer.jsx";
import './styles/Quiz.css'

const Quiz = ({setJoined}) => {

  const [who, setWho] = useState({}); // 問題の人の名前(偽名)とアイコンが保存
  const [members, setMembers] = useState([]); //メンバーの名前(本名)(members[i].real)とアイコンとID (members[i].id)のリスト
  const [page, setPage] = useState(0);
  const [correct, setCorrect] = useState(1);
  const { id } = useParams();
  const rname = id

  // const [selectedId, setSelectedId] = useState(members[0].id);//membersにデータ入ってないのでエラーを吐きます
  // const funcOnChange = (event) => {
  //   setSelectedId(event.target.value);
  // };

  const getRoomMembers = async () => {
    const docRef = doc(db, "Room", rname);
    const docSnap = await getDoc(docRef);

    setMembers(docSnap.data().name.filter(n =>n.pseudo!==JSON.parse(localStorage.user).pseudo));

    //memberの中からランダムに問題を出題
    //自分自身を除く処理、お願いします。
    // const randomIndex = Math.floor(Math.random() * members.length);

    // setWho(members[randomIndex])
  }

  useEffect(()=>{
    const randomIndex = Math.floor(Math.random() * members.length);

    setWho(members[randomIndex])
  },[members])

  //正解かを判定する関数
  const handleJudge = (e) => {
    localStorage.setItem("maker",0); //ルーム作成者用のフラグを元に戻す
    setJoined(false); //ルーム参加中かどうかのフラグを元に戻す
    localStorage.removeItem('user');
    localStorage.removeItem('maker');//localstorageをクリアにする

    if(e.target.textContent == who.real){

      //コンポーネントを切り替える処理お願いします。
      //後の処理はあんでもいいです。
      setCorrect(true);
      setPage(1);
    }else{
      setCorrect(false);
      setPage(1);    
    }
  }

  useEffect(() => {
    getRoomMembers()
  }, [])

  return (
    <div>
      {page==0 ? <>{
        who ? (
          <>
            <h1>この人は誰？</h1>
            <p>{who.pseudo}</p>

            <h2>選択肢</h2>
            <ul className="choice-list">
              {members.map((member, index) => (
                <li onClick={handleJudge} key={index}>{member.real}</li>
              ))}
            </ul>
          </>
        ) :
          (
            <>
              <p>Loading...</p>
            </>
          )
      }</> : <Answer correct={correct} answer={who} />}
    </div >
  );
};

export default Quiz;
