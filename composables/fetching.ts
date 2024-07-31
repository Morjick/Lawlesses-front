export interface FetchingCathchingErrorInterface {
  message: string
  error: string
  status: number
}

// eslint-disable-next-line
export const fetching: any = async (path: any, options?: any) => {
  try {
    if (!options) options = {}
    const config = useRuntimeConfig()
    const authStore = useAuthStore()

    const baseURL = config.public.baseURL
    const data = await $fetch(path, {
      baseURL,
      ...options,
      headers: {
        Authorization: authStore.getUserToken
      }
    })

    if ((!data.status || data.status >= 300) && options.fatal) {
      throw showError({ statusCode: data.status || 501, message: data.message || 'Необработанная ошибка сервера', fatal: options.fatal || false })
    }

    return data
  } catch(error) {
    const authStore = useAuthStore()

    if (path == 'user/check-token') {     
      authStore.logout()
      return
    }

    if (error instanceof Error) {
      const message: FetchingCathchingErrorInterface = Object(error.message)
      
      if (!options.method || options.method === "GET") {
        throw showError({ statusCode: message.status })
      }
    }

    if (!options.method || options.method === "GET") {
      createError({ statusCode: 404 })
    }

    Promise.reject(error)
      .catch((err) => {
        authStore.createAuthError(err.data)
      })
  }
}
