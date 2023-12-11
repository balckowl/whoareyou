import { useState } from "react";

const Answer = (props) => {
  const answer = {}; //答えの人のアイコン、偽名、本名、IDが入ってる

  return (
    <div>
      <h1>
        {answer.id === props.choice ? "正解!!正解!!正解!!正解!!" : "不正解..."}
      </h1>
      <p>
        {answer.pseudo}さんの正体は{answer.real}さんでした
      </p>
      <button onClick={() => props.Back()}>戻る</button>
    </div>
  );
};

export default Answer;
