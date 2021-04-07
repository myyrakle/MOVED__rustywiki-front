import { atom, selector, useRecoilValue } from 'recoil';

export type AuthType = {
  auth: boolean;
  nickname?: string;
  email?: string;
};

export const userState = atom<AuthType>({
  key: 'userState',
  default: {
    auth: false,
    nickname: undefined,
    email: undefined,
  },
});

const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => get(userState),
});

export default function useAccess(): { user: AuthType } {
  const user = useRecoilValue(userSelector);

  return {
    user,
  };
}
