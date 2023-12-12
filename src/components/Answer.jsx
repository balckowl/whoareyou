import { useState } from "react";

const Answer = (props) => {
  const answer = {}; //答えの人のアイコン(answer.image)、偽名(answer.pseudo)、本名(answer.real)、ID(answer.id)が入ってる

  return (
    <div>
      <h1>
        {answer.id === props.choice ? "正解!!正解!!正解!!正解!!" : "不正解..."}
      </h1>
      <img src={answer.image} alt={answer.real} />
      <p>
        {answer.pseudo}さんの正体は{answer.real}さんでした
      </p>
      <button onClick={() => props.Back()}>戻る</button>
    </div>
  );
};

export default Answer;
