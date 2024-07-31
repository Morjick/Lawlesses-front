import { useAuthStore } from "~/stores/auth.store"

export type FetchMethodsType = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export interface UseFetchParamInterface {
  headers: any
  methods: FetchMethodsType
}

export const useFetch = async (url: string, body: any, param: UseFetchParamInterface) => {
  const { userToken } = useAuthStore()

  if (userToken) param.headers['auth-token'] = userToken

  const response = await $fetch(url,
    {
      body,
      ...param
    },
  )
  
  return response
}
