export function signupRedirectState(location) {
  return {
    from: {
      pathname: location.pathname,
      search: location.search || '',
    },
    enroll: true,
  }
}

export function pathFromAuthState(location) {
  const from = location?.state?.from
  if (from?.pathname) return `${from.pathname}${from.search || ''}`
  return '/'
}
