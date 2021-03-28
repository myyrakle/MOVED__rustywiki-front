import * as redux from "redux";

export function actionUpdateMyInfo(email: string, nickname: string) {
    return { type: "UPDATE_MY_INFO" as const, email, nickname };
}

export function actionLogin(user_type: string) {
    return { type: "LOGIN" as const, user_type };
}

export function actionLogout() {
    return { type: "LOGOUT" as const };
}

export type MainAction =
    | ReturnType<typeof actionLogin>
    | ReturnType<typeof actionLogout>
    | ReturnType<typeof actionUpdateMyInfo>;
