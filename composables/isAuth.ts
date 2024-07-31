export const isAuth = () => {
  const authStore = useAuthStore()

  if (!authStore.getIsAuth) return navigateTo('/auth')
}
