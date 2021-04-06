import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { storageKey } from '../libs/const/storageKey'

type ModeType = 'light' | 'dark' | ''
const darkModeState = atom<ModeType>({
  default: '',
  key: storageKey.darkMode,
})
const mountedState = atom({ default: false, key: 'appMounted' })

export function useDarkMode(): {
  mode: ModeType
  setMode: (mode: ModeType) => void
} {
  const [mounted, setMounted] = useRecoilState(mountedState)
  const [mode, setMode] = useRecoilState(darkModeState)

  const setPreferMode = useCallback((theme: ModeType) => {
    if (theme) {
      setMode(theme)
    }
    return localStorage.setItem(storageKey.darkMode, theme)
  }, [])
  const getPreferMode = useCallback(() => {
    return localStorage.getItem(storageKey.darkMode) as ModeType
  }, [])

  useEffect(() => {
    setMounted(true)
    if (!mounted) {
      return
    }
    const prefer = getPreferMode()

    const isDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    if (mounted && !prefer) {
      setMode(isDark ? 'dark' : 'light')
    }
    if (mounted && prefer) {
      setMode(prefer)
    }
  }, [mounted])

  return {
    mode,
    setMode: setPreferMode,
  }
}
