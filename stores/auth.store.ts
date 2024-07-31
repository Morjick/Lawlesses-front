import { defineStore } from 'pinia'
import type { UserRoleType, AutorRoleType } from './news.store'

export interface AuthStoreStateInterface {
  isAuth: boolean
  userToken: string
  user: UserInterface | null
  otherUsers: OtherUsersItemInterface[]
  authError: AuthErrorInterface | null
}

export interface AuthErrorInterface {
  status: number
  message: string
  error: string | string[]
}

export interface LoginDataInterface {
  username: string
  password: string
}

export interface OtherUsersItemInterface extends UserInterface {
  token: string
}

export interface UserInterface {
  id: number
  firstname: string
  lastname: string
  patronomic: string
  avatar: null | string
  developerRoleRU: AutorRoleType | null
  endVIPDate: null
  friendsListId: null
  invitedHash: string | null
  isOnline: boolean
  isReferalGiftReceived: boolean
  isVIPStatus: boolean
  kills: number
  deaths: number
  money: number
  role: UserRoleType
  slug: string | null
  telegram: string | null
  updatedAt: string
  userHash: string | null
  username: string
  vk: string | null
  whatsapp: string | null
  discord: string | null
  email: string | null
  createdAt: string
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): AuthStoreStateInterface => {
    return {
      isAuth: false,
      userToken: '',
      user: null,
      otherUsers: [],
      authError: null
    }
  },
  actions: {
    async login (data: LoginDataInterface) {
      try {
        const router = useRouter()

        const response = await fetching('user/login', {
          method: 'POST',
          body: {...data}
        })

        if (this.user && this.isAuth) {
          this.otherUsers = [...this.otherUsers, { ...this.user, token: this.userToken }]
        }

        if (response.status === 200) {
          this.user = response.body.user
          this.userToken = response.body.token
          this.isAuth = true

          if (this.user?.role !== 'USER') {
            router.push('/admin')
            return
          }

          router.push('/')
          this.clearAuthError()
        } else {
          this.authError = response
        }
      } catch (e) {
        console.log(e)
      }
    },
    async checkToken () {
      if (!this.isAuth || !this.userToken?.length) return

      const response = await fetching('user/check-token', {
        method: 'POST',
        body: {
          token: this.userToken
        }
      })

      if (response.status === 200) {
        this.isAuth = true
        this.user = response.body.user
      } else {
        this.logout()
      }
    },
    logout () {
      this.isAuth = false
      this.user = null
      this.userToken = ''

      const router = useRouter()
      router.push('auth')
    },
    changeUser (userId: number) {
      const user = this.otherUsers.find((el) => el.id === userId)
      if (!user) return

      if (this.user && this.isAuth) {
        this.otherUsers = [...this.otherUsers.filter(el => el.id !== user.id), { ...this.user, token: this.userToken }]
      }

      this.user = { ...user }
      this.userToken = user.token
    },
    createAuthError (error: AuthErrorInterface) {
      this.authError = error
    },
    clearAuthError () {
      this.authError = null
    },
  },
  getters: {
    getIsAuth (state: AuthStoreStateInterface): boolean {
      return Boolean(state.isAuth)
    },
    getUserToken (state: AuthStoreStateInterface): string {
      return state.userToken
    },
    getUser (state: AuthStoreStateInterface) {
      return state.user
    },
    getRole (state: AuthStoreStateInterface): UserRoleType {
      return state.user?.role || 'USER'
    },
    getOtherUsers (state: AuthStoreStateInterface): OtherUsersItemInterface[] {
      return state.otherUsers
    },
    getErrors (state: AuthStoreStateInterface): AuthErrorInterface | null {
      return state.authError
    }
  },
  persist: {
    storage: persistedState.localStorage,
  }
})
