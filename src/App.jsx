import { useState } from "react";

import Top from "./Top.jsx";
import Chat from "./Chat.jsx";
import Quiz from "./Quiz.jsx";
import Answer from "./Answer.jsx";
import "./App.css";

const App = () => {
  const [page,setPage] = useState(0);
  const [self,setSelf] = useState({});
  const [choice,setChoice] = useState("");
  return (
    <div>
      {(()=>{
        switch (page) {
          case 0:
            return <Top setSelf={setSelf}/>
          case 1:
            return <Chat self={self} ToQuiz={()=>{setPage(2)}} />
          case 2:
            return <Quiz self={self} setChoice={setChoice}/>
          case 3:
            return <Answer Back={()=>{setPage(0);}} choice={choice} />
          default:
            break;
        }
      })()}
    </div>
  );
};

export default App;
