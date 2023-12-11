import { useState } from "react";

const Chat = props => {
  const theme = "";

  const [time, setTime] = useState(120); //制限時間
  const [messages, setMessages] = useState([]); //message一つ一つは{text:"~~~",name:"~~~"}
  const [text, setText] = useState(""); //textareaの値、取得用

  //サーバーからメッセージが送られてきたらsetMessagesを用いてmessagesを変更する

  return (
    <div>
      <h1>{theme}</h1>
      <p>
        残り時間:{Math.floor(time / 60)}分{time % 60}秒
      </p>
      <ul id="messages">
        {messages.map((message, index) => {  //メッセージを展開
          return <li key={index}>{message.name}:{message.text}</li>;
        })}
      </ul>
      <textarea
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button>SUBMIT</button>
      {/*クリックしたらサーバーにメッセージを送る
         自身のIDや名前、アイコンなどはprops.selfに入ってます(ID:props.self.id,偽名:props.self.id,アイコン:props.self.image)。
      */}
    </div>
  );
};

export default Chat;
