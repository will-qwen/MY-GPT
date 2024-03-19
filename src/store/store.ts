import { legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
let messages = [
  {
    role: "assistant",
    content: "有什么可以帮你的吗",
  },
];

function reducers(state = messages, action: any): any {
  console.log(action,'state  ')
  switch (action.type) {
    case "ADD":
      return action.data;
    default:
      return state;
  }
}

const store = legacy_createStore(reducers, applyMiddleware(thunk));
export default store;
