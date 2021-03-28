import * as redux from "redux";
import { rootReducer } from "./root.reducer";

const store = redux.createStore(rootReducer);

export default store;
