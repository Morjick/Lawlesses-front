import { enLocalesList } from "./en.locales";
import { ruLocalesList } from "./ru.locales";

export default defineI18nConfig(() => ({
  messages: {
    'ru-RU': ruLocalesList,
    'en-EN': enLocalesList,
  }
}))
