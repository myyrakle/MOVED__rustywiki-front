import * as redux from "redux";
import mainReducer from "./main.reducer";

const store = redux.createStore(mainReducer);

export default store;
