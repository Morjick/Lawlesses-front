export default function () {
  const authStore = useAuthStore()

  if (authStore.user?.role === 'USER') {
    throw showError({ statusCode: 301, message: 'Недостаточно прав' })
  }
}
