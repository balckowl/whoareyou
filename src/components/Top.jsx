const Top = (props) => {
  return (
    <div>
        <button onClick={props.ToRoomMake}>部屋を作る</button>
        <button onClick={props.ToRoomJoin}>部屋を探す</button>
    </div>
  );
};

export default Top;
