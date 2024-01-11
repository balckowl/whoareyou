import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import { db } from "../../api/firebase";
import { useNavigate } from "react-router-dom"
import "./styles/Chat.css"

const Chat = (props) => {
  const theme = "";

  const [time, setTime] = useState(90); //制限時間
  const [messages, setMessages] = useState([]); //message一つ一つは{text:"~~~",pseudo:"~~~"}
  const [text, setText] = useState(""); //textareaの値、取得用
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const rname = decodeURIComponent(pathSegments[pathSegments.length - 1]); //部屋の名前をパスの最後から取得
  const { pseudo, real } = JSON.parse(localStorage.getItem('user')); //ユーザー情報を取得
  const navigate = useNavigate();

  //サーバーからメッセージが送られてきたらsetMessagesを用いてmessagesを変更する
  useEffect(() => {
    const id = setInterval(() => {
      if (time === 0) {
        clearInterval(id);
        navigate(`/quiz/${rname}`)
      }
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(id);
  },[time, navigate]);

  //メッセージを監視し、変更があったら関数が発火し、再度データが取得される。
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, rname), orderBy('createdAt', "desc")), (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setMessages(messageList.reverse())
      console.log(messageList)
    })

    return () => unsubscribe();
  }, [])

  const addMessage = async (e) => {
    e.preventDefault()
    
    setText("");

    await addDoc(collection(db, rname), {
      diplayName: pseudo,
      text: text,
      createdAt: serverTimestamp(),
    })
  }

  return (
    <div id="chat-screen">
      <h1>{rname}</h1>
      <h1>{theme}</h1>
      <p>
        残り時間:{Math.floor(time / 60)}分{time % 60}秒
      </p>
      <div id="messages-container">
        {messages.map((message, index) => {
          //メッセージを展開
          const isMe = JSON.parse(localStorage.user).pseudo == message.diplayName
          return (
            <div className={isMe ? "user-message-outer" : "bot-message-outer"} key={index}>
              <div className={"message " + (isMe ? "user-message" : "bot-message")}>
                {message.diplayName}:{message.text}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={addMessage} id="chat-input-container">
        <input
          required
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          placeholder="Type your message..."
        />
        <button>Send</button>
      </form>
      {/*クリックしたらサーバーにメッセージを送る
         自身のIDや名前、アイコンなどはprops.selfに入ってます(ID:props.self.id,偽名:props.self.id,アイコン:props.self.image)。
      */}
    </div>
  );
};

export default Chat;
