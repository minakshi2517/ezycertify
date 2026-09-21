import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { languages, courses as staticCourses, setLiveExchangeRates } from '../data/siteData'
import { getTranslation, translateText } from '../data/translations'
import { api, persistAuthToken } from '../lib/api'
import { mergeCourseCatalog } from '../lib/courseCatalog'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('ezycertify-lang') || 'en-US'
  })

  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [catalogCourses, setCatalogCourses] = useState(staticCourses)
  const [fxTick, setFxTick] = useState(0)

  const langConfig = useMemo(
    () => languages.find((l) => l.code === language) || languages[0],
    [language]
  )

  const t = useMemo(() => getTranslation(language), [language])
  const tr = useCallback((text) => translateText(text, language), [language])

  const triggerGoogleTranslate = useCallback((code) => {
    let targetLang = code
    if (code === 'en-US' || code === 'en-GB' || code === 'en-IN') {
      targetLang = 'en'
    } else if (code.includes('-') && !['zh-CN', 'zh-TW', 'pt-BR'].includes(code)) {
      targetLang = code.split('-')[0]
    }

    const hostname = window.location.hostname
    document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${hostname}`
    document.cookie = `googtrans=/en/${targetLang}; path=/;`

    const selectElem = document.querySelector('.goog-te-combo')
    if (selectElem) {
      selectElem.value = targetLang
      selectElem.dispatchEvent(new Event('change'))
    }
  }, [])

  const setLanguage = useCallback((code) => {
    setLanguageState(code)
    localStorage.setItem('ezycertify-lang', code)
    triggerGoogleTranslate(code)
  }, [triggerGoogleTranslate])

  // Sync Google Translate on mount/reload if saved language exists
  useEffect(() => {
    const saved = localStorage.getItem('ezycertify-lang')
    if (saved && saved !== 'en-US') {
      const timer = setTimeout(() => {
        triggerGoogleTranslate(saved)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [triggerGoogleTranslate])

  // Check current session from backend via HTTP-only cookie
  const refreshUser = useCallback(async () => {
    try {
      const res = await api.auth.me()
      if (res.success && res.user) {
        setUser(res.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoadingAuth(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const refreshCatalog = useCallback(() => {
    api.courses
      .getAll()
      .then((res) => {
        if (Array.isArray(res?.courses)) {
          setCatalogCourses(mergeCourseCatalog(staticCourses, res.courses))
        }
      })
      .catch(() => {
        setCatalogCourses(staticCourses)
      })
  }, [])

  useEffect(() => {
    refreshCatalog()
  }, [refreshCatalog])

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        if (data?.rates) {
          setLiveExchangeRates(data.rates)
          setFxTick((n) => n + 1)
        }
      })
      .catch(() => {})
  }, [])

  const signOut = useCallback(async () => {
    try {
      await api.auth.logout()
    } catch (err) {
      console.error('Sign out error:', err)
    } finally {
      persistAuthToken(null)
      setUser(null)
      window.location.href = '/'
    }
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
    setUser,
    loadingAuth,
    refreshUser,
    signOut,
    catalogCourses,
    refreshCatalog,
    fxTick,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
