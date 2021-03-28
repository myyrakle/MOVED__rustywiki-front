import { Action, combineReducers } from "redux";
import { MainAction } from "./main/actions/user_info";
import { LOGIN, LOGOUT, UPDATE_MY_INFO } from "./main/action_types";
import { mainReducer } from "./main/main.reducer";

export const rootReducer = combineReducers({
    mainReducer,
});
