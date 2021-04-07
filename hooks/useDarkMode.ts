import { useCallback, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { STORAGE_KEY } from '../libs/const/storageKey';

type ModeType = 'light' | 'dark' | '';
const darkModeState = atom<ModeType>({
  default: '',
  key: STORAGE_KEY.DARK_MODE,
});
const mountedState = atom({ default: false, key: 'appMounted' });

export function useDarkMode(): {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
} {
  const [mounted, setMounted] = useRecoilState(mountedState);
  const [mode, setMode] = useRecoilState(darkModeState);

  const setPreferMode = useCallback((theme: ModeType) => {
    if (theme) {
      setMode(theme);
    }
    return localStorage.setItem(STORAGE_KEY.DARK_MODE, theme);
  }, []);
  const getPreferMode = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY.DARK_MODE) as ModeType;
  }, []);

  useEffect(() => {
    setMounted(true);
    if (!mounted) {
      return;
    }
    const prefer = getPreferMode();

    const isDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (mounted && !prefer) {
      setMode(isDark ? 'dark' : 'light');
    }
    if (mounted && prefer) {
      setMode(prefer);
    }
  }, [mounted]);

  return {
    mode,
    setMode: setPreferMode,
  };
}
