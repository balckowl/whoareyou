import { useState } from "react";

const Quiz = (props) => {
  const who = {}; // 問題の人の名前(偽名)とアイコンが保存
  const members = []; //メンバーの名前(本名)とアイコンとIDのリスト

  const [selectedId, setSelectedId] = useState(members[0].id);
  const funcOnChange = (event) => {
    setSelectedId(event.target.value);
  };
  return (
    <div>
      <h1>この人は誰？</h1>
      <img src={who.image} alt={who.name} />
      <p>{who.name}</p>
      <div>
        {members.map((member, index) => {
          return (
            <div key={index}>
              <input
                checked={member.id === selectedId}
                onChange={funcOnChange}
                type="radio"
                name="quiz"
                id={"quiz" + String(index)}
                value={member.id}
              />
              <label htmlFor={"quiz" + String(index)}>{member.name}</label>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          props.setChoice(selectedId);

          //以降回答の送信の処理
        }}
      >
        投票
      </button>
    </div>
  );
};

export default Quiz;
