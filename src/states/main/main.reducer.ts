import { Action } from "redux";
import { MainAction } from "./actions/user_info";
import { LOGIN, LOGOUT, UPDATE_MY_INFO } from "./action_types";

const defaultState = {
    myinfo: {
        authorized: false,
        user_type: "",
        email: "",
        nickname: "",
    },
} as const;

export function mainReducer(state = defaultState, action: MainAction) {
    switch (action.type) {
        case LOGIN:
            return {
                myinfo: {
                    authorized: true,
                    user_type: action.user_type,
                    email: "",
                    nickname: "",
                },
            };
        case LOGOUT:
            return {
                myinfo: {
                    authorized: false,
                    user_type: "",
                    email: "",
                    nickname: "",
                },
            };
        case UPDATE_MY_INFO:
            return {
                myinfo: {
                    authorized: state.myinfo.authorized,
                    user_type: state.myinfo.user_type,
                    email: action.email,
                    nickname: action.nickname,
                },
            };
        default:
            return state;
    }
}
