export interface RouterPageInterface {
  page?: string
  url: string
  name: string
  isAuth?: boolean
}

export const getRoutes: RouterPageInterface[] = [
  {
    name: 'Home',
    url: '/',
  },
]
