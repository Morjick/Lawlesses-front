export interface LocalNavigationInterface {
  title: string
  url: string
  target?: boolean
}

export interface GetNavigationResultInterface {
  localNavigation: LocalNavigationInterface[]
}

export const getNavigation = (): GetNavigationResultInterface => {
  const { t } = useI18n()

  return {
    localNavigation: [
      {
        title: t('headerMenu.home'),
        url: '/',
        target: false,
      },
      {
        title: t('headerMenu.news'),
        url: '/news',
      },
      {
        title: t('headerMenu.aboutGame'),
        url: '/about-game',
      },
      {
        title: t('headerMenu.forum'),
        url: '/forum',
      },
    ]
  }
}
