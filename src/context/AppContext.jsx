import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { languages } from '../data/siteData'
import { getTranslation, translateText } from '../data/translations'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('ezycertify-lang') || 'en-US'
  })

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ezycertify-user')
    return saved ? JSON.parse(saved) : null
  })

  const langConfig = useMemo(
    () => languages.find((l) => l.code === language) || languages[0],
    [language]
  )

  const t = useMemo(() => getTranslation(language), [language])

  const tr = useCallback((text) => translateText(text, language), [language])

  const setLanguage = useCallback((code) => {
    setLanguageState(code)
    localStorage.setItem('ezycertify-lang', code)
  }, [])

  const signIn = useCallback((email, password) => {
    const mockUser = { email, name: email.split('@')[0] }
    setUser(mockUser)
    localStorage.setItem('ezycertify-user', JSON.stringify(mockUser))
    return true
  }, [])

  const signUp = useCallback((name, email, password) => {
    const mockUser = { email, name }
    setUser(mockUser)
    localStorage.setItem('ezycertify-user', JSON.stringify(mockUser))
    return true
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    localStorage.removeItem('ezycertify-user')
  }, [])

  const value = {
    language,
    setLanguage,
    currency: langConfig.currency,
    currencySymbol: langConfig.symbol,
    locale: langConfig.locale,
    languages,
    t,
    tr,
    user,
    signIn,
    signUp,
    signOut,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
