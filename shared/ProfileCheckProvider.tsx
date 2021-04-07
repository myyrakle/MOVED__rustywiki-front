import * as React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../hooks/useAccess';
import useApi from '../hooks/useApi';

const ProfileCheckProvider: React.FunctionComponent<any> = (props) => {
  const [, setUser] = useRecoilState(userState);
  const api = useApi();

  React.useEffect(() => {
    api.user.getMyInfo().then((data) => {
      setUser({
        auth: !!data,
        email: data?.email,
        nickname: data?.nickname,
      });
    });
  }, []);
  return props.children;
};

export default ProfileCheckProvider;
