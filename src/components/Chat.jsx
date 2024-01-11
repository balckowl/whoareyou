import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../api/firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion"
import "./styles/Chat.css";

const Chat = () => {
  const [time, setTime] = useState(90); // 制限時間
  const [messages, setMessages] = useState([]); // メッセージのリスト
  const [text, setText] = useState(""); // テキスト入力の値
  const endOfMessagesRef = useRef(null); // メッセージリストの末尾を指すref
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split('/');
  const rname = decodeURIComponent(pathSegments[pathSegments.length - 1]); // 部屋の名前
  const { pseudo } = JSON.parse(localStorage.getItem('user')); // ユーザー情報

  // メッセージリストの最後にスクロールする機能
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 時間のカウントダウン
  useEffect(() => {
    const id = setInterval(() => {
      if (time === 0) {
        clearInterval(id);
        navigate(`/quiz/${rname}`);
      }
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [time, navigate, rname]);

  // メッセージのリアルタイム取得
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, rname), orderBy('createdAt', "desc")), (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse();
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [rname]);

  // 新しいメッセージを追加する関数
  const addMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, rname), {
      diplayName: pseudo,
      text: text,
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div id="chat-screen">
      <h1>{rname}</h1>
      <p>残り時間: {Math.floor(time / 60)}分{time % 60}秒</p>
      <div id="messages-container">
        {messages.map((message, index) => (
          <div className={JSON.parse(localStorage.user).pseudo === message.diplayName ? "user-message-outer" : "bot-message-outer"} key={index}>
            <div className={"message " + (JSON.parse(localStorage.user).pseudo === message.diplayName ? "user-message" : "bot-message")}>
              {message.diplayName}: {message.text}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} /> {/* メッセージリストの末尾を指す要素 */}
      </div>
      <form onSubmit={addMessage} id="chat-input-container">
        <input
          required
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type your message..."
        />
        <motion.button whileHover={{ scale: 1.1 }} type="submit">Send</motion.button>
      </form>
    </div>
  );
};

export default Chat;
