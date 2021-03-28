import { LOGIN, LOGOUT, UPDATE_MY_INFO } from "../action_types";

export function actionUpdateMyInfo(email: string, nickname: string) {
    return { type: UPDATE_MY_INFO, email, nickname };
}

export function actionLogin(user_type: string) {
    return { type: LOGIN, user_type };
}

export function actionLogout() {
    return { type: LOGOUT };
}

export type MainAction =
    | ReturnType<typeof actionLogin>
    | ReturnType<typeof actionLogout>
    | ReturnType<typeof actionUpdateMyInfo>;
