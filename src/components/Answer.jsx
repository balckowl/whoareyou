import { useState } from "react";

const Answer = (props) => {
  // const answer = {}; //答えの人のアイコン(answer.image)、偽名(answer.pseudo)、本名(answer.real)、ID(answer.id)が入ってる

  return (
    <div>
      <h1>
        {props.correct ? "正解!!正解!!正解!!正解!!" : "不正解..."}
      </h1>
      <img src={props.answer.image} alt={props.answer.real} />
      <p>
        {props.answer.pseudo}さんの正体は{props.answer.real}さんでした
      </p>
      {/* <button onClick={() => props.Back()}>戻る</button> */}
    </div>
  );
};

export default Answer;
