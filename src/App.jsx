import { useState } from "react";

import Top from "./Top.jsx";
import "./App.css";

const App = () => {
  const [page,setPage] = useState(0);
  return (
    <div>
      {(()=>{
        switch (page) {
          case 0:
            return <Top/>
          default:
            break;
        }
      })()}
    </div>
  );
};

export default App;
