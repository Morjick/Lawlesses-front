import { defineStore } from 'pinia'
import { tempNewsList } from '~/libs/data/temp/News'
import { projectAutors } from '~/libs/data/temp/ProjectAutors'

export interface HomeNewsInterface {
  id: number
  title: string
  body: string
  date: string
  href: string
  image: string
}

export interface SocialHrefsInterface {
  vk?: string
  telegramm?: string
  whatsapp?: string
  email?: string
  discord?: string
}

export type AutorRoleType = 'Художник' | 'Разработчик'
export type UserRoleType = 'USER' | 'ADMIN' | 'MODERATOR' | 'ROOT'

export interface AutorInterface {
  id: number
  firstname: string
  lastname: string
  patronymic: string
  username: string
  avatar: string
  slug: string
  pageHref?: string
  developerRole: AutorRoleType
  role: UserRoleType
  social: SocialHrefsInterface
}

export interface NewsPaginationInterface {
  activePage: number
  totalPage: number
  totalCount: number
  isNextPageButtonActive: boolean
  isPrevPageButtonActive: boolean
}

export interface NewsItemInterface {
  id: number
  title: string
  description: string
  body: string
  slug: string
  avatar: string
  publicDate: string
  autor: AutorInterface
  tags: string[]
  isChecked?: boolean
}

export interface NewsStoreStateInterface {
  homeNews: HomeNewsInterface[]
  autors: AutorInterface[]
  newsList: NewsItemInterface[]
  pagination: NewsPaginationInterface
}

export const useNewsStore = defineStore({
  id: 'news-store',
  state: (): NewsStoreStateInterface => {
    return {
      homeNews: [
        { id: 1, title: 'В игре скоро появятся гильдии!', body: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset.', href: 'asdakwd', image: 'asdawdawd', date: '06.04.2024 25:81' },
        { id: 1, title: 'Новыя игровая механика: ядерная бомба', body: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset.', href: 'asdakwd', image: 'asdawdawd', date: '06.04.2024 25:81' },
        { id: 1, title: 'Байден недоволен отсутствием негров в игре', body: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset.', href: 'asdakwd', image: 'asdawdawd', date: '06.04.2024 25:81' },
      ],
      autors: [],
      newsList: [],
      pagination: {
        totalPage: 20,
        activePage: 1,
        totalCount: 20,
        isPrevPageButtonActive: false,
        isNextPageButtonActive: true,
      },
    }
  },
  actions: {
    async getProfectAutors () {
      this.autors = projectAutors
    },
    async createPagination () {
      this.setPaginationActivePage(1)
    },
    setPaginationActivePage (page: number) {
      this.pagination = {
        ...this.pagination,
        activePage: page,
        isPrevPageButtonActive: page > 1 ? true : false,
        isNextPageButtonActive: this.pagination.totalPage && page < this.pagination.totalPage ? true : false,
      }
    },
    async addNewsToList () {
      const news = []

      for (let i = 0; i < 5; i++) {
        news.push(tempNewsList[0])
      }
      
      this.newsList = this.newsList.concat(news)
    },
    async getNews () {
      const data = await fetching('news/get-many')

      const news = data.body.news
      this.newsList = this.newsList.concat(news)
    }
  },
  getters: {
    getHomeNews: (state): HomeNewsInterface[] => state.homeNews,
    getAutors: (state): AutorInterface[] => state.autors,
    getPagination: (state): NewsPaginationInterface => state.pagination,
    getNewsList: (state): NewsItemInterface[] => state.newsList,
  },
})
