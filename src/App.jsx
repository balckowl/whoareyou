import { useState } from "react";

import Top from "./Top.jsx";
import Chat from "./Chat.jsx";
import Quiz from "./Quiz.jsx";
import "./App.css";

const App = () => {
  const [page,setPage] = useState(0);
  const [name,setName] = useState("");
  return (
    <div>
      {(()=>{
        switch (page) {
          case 0:
            return <Top setName={(nm)=>{setName(nm);}}/>
          case 1:
            return <Chat name={name}/>
          case 2:
            return <Quiz name={name}/>
          default:
            break;
        }
      })()}
    </div>
  );
};

export default App;
