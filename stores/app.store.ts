import { defineStore } from 'pinia'

export type LanguageListType = 'en-EN' | 'ru-RU'

export interface AppStoreStateInterface {
  layout: LayoutNameType
  language: LanguageListType
  colorTheme: ColorThemeType
}

export type LayoutNameType = 'default' | 'auth'
export type ColorThemeType = 'light' | 'dark'

export const useAppStore = defineStore('app-store', {
  state: (): AppStoreStateInterface => {
    return {
      layout: 'default',
      language: 'ru-RU',
      colorTheme: 'dark',
    }
  },
  actions: {
    setLayout (layoutName: LayoutNameType) {
      this.layout = layoutName
    },
    setLanguage (language: LanguageListType) {
      this.language = language
    },
    setColorTheme (theme: ColorThemeType) {
      this.colorTheme = theme
    },
  },
  getters: {
    getLayout (state: AppStoreStateInterface): LayoutNameType {
      return state.layout
    },
    getLanguage (state: AppStoreStateInterface): LanguageListType {
      return state.language
    },
    getColorTheme (state: AppStoreStateInterface): ColorThemeType {
      return state.colorTheme
    },
  },
  persist: {
    storage: persistedState.localStorage,
  }
})
