import React, { useReducer } from "react";
import io from "socket.io-client";

export const CTX = React.createContext();
const initialState = {
  general: [
    { from: "aron", msg: "hello" },
    { from: "rom", msg: "hello" },
    { from: "luke", msg: "hello" }
  ],
  social: [
    { from: "sam", msg: "hello" },
    { from: "john", msg: "hello" },
    { from: "tom", msg: "hello" }
  ]
};
function reducer(state, { type, payload }) {
  switch (type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [payload.topic]: [
          ...state[payload.topic],
          { from: payload.from, msg: payload.msg }
        ]
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export function Store(props) {
  const [allChats, dispatch] = useReducer(reducer, initialState);
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  return (
    <CTX.Provider value={{ allChats, sendChatAction }}>
      {props.children}
    </CTX.Provider>
  );
}
