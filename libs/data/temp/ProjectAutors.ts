import type { AutorInterface } from "~/stores/news.store";

export const projectAutors: AutorInterface[] = [
  {
    id: 1,
    firstname: 'Матвей',
    lastname: 'Храмов',
    patronymic: 'Иванович',
    username: 'Morjick',
    avatar: 'https://sun136-1.userapi.com/impg/nPUlc6HU8Nn7s5QX4rqy77puTX-AzLlD80ph5Q/hUWbwW75x3o.jpg?size=853x1280&quality=95&sign=3878de4aa533343d9cd264762dde9a00&type=album',
    social: {
      vk: 'asdawdawd',
      telegramm: 'asdadwadwd'
    },
    developerRole: 'Разработчик',
    role: 'ADMIN',
    slug: 'matvey-khramov',
    pageHref: '',
  },
  {
    id: 2,
    firstname: 'Ольга',
    lastname: 'Храмова',
    patronymic: 'Вячеславна',
    username: 'Denie',
    avatar: 'https://sun9-67.userapi.com/impg/9o5SCd66TG7nCeSFrCzd9pa8LVNL8VwfOf2u_Q/7kPk73vuogU.jpg?size=853x1280&quality=95&sign=575aad68da59b8324affbaf9388ad671&type=album',
    social: {
      telegramm: 'asdadwadwd',
      email: 'asdawdaw',
      discord: 'asdmambdhkawbdx'
    },
    developerRole: 'Художник',
    role: 'USER',
    slug: 'olag-khramova',
    pageHref: '',
  },
]