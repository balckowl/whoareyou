import { useState } from "react";

import Top from "./Top.jsx";
import Chat from "./Chat.jsx";
import "./App.css";

const App = () => {
  const [page,setPage] = useState(1);
  const [name,setName] = useState("KOJI");
  return (
    <div>
      {(()=>{
        switch (page) {
          case 0:
            return <Top setName={(nm)=>{setName(nm);}}/>
          case 1:
            return <Chat name={name}/>
          default:
            break;
        }
      })()}
    </div>
  );
};

export default App;
