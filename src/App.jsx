import { useState } from "react";

import Top from "./components/Top.jsx";
import RoomMake from "./components/RoomMake.jsx";
import RoomJoin from "./components/RoomJoin.jsx";
import Chat from "./components/Chat.jsx";
import Quiz from "./components/Quiz.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [page, setPage] = useState(0);
  const [self, setSelf] = useState({});
  const [choice, setChoice] = useState("");
  const [joined, setJoined] = useState(false);
  return (
    // <div>
    //   {(()=>{
    //     switch (page) {
    //       case 0:
    //         return <Top ToRoomJoin={()=>{setPage(4)}} ToRoomMake={()=>{setPage(5)}}/>
    //       case 1:
    //         return <Chat self={self} ToQuiz={()=>{setPage(2)}} />
    //       case 2:
    //         return <Quiz self={self} setChoice={setChoice} ToAnswer={()=>{setPage(3)}} />
    //       case 3:
    //         return <Answer Back={()=>{setPage(0);}} choice={choice} />
    //       case 4:
    //         return <RoomJoin setSelf={setSelf} ToChat={()=>{setPage(1)}}/>
    //       case 5:
    //         return <RoomMake setSelf={setSelf} ToChat={()=>{setPage(1)}}/>
    //       default:
    //         break;
    //     }
    //   })()}
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/roommake" element={<RoomMake />} />
        <Route path="/roomjoin" element={<RoomJoin joined={joined} setJoined={setJoined}/>} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/quiz/:id" element={<Quiz setJoined={setJoined}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
