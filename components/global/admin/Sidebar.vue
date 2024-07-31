<template>
  <div
    class="sidebar"
    :class="{
      active: isSidebarOpen,
    }"
  >
    <div class="sidebar__inner">
      <div class="sidebar__title">Admin Dashboard</div>

      <div class="sidebar__navigation">
        <div
          v-for="item in navigation"
          :key="item.title"
          :class="{
            open: item.isOpen,
            active: item.isActive,
          }"
          class="sidebar__item"
        >
          <div
            class="sidebar__head"
            @click="onItemClick(item)"
          >
            <div class="sidebar__icon">
              <nuxt-icon
                v-if="item.icon"
                :name="item.icon"
              />
            </div>
            <div class="sidebar__item__title">{{ item.title }}</div>
            <div
              v-if="item.isHaveChild"
              class="sidebar__more-icon"
            >-</div>
          </div>
          <div class="sidebar__body">
            <div
              v-for="child in item.childs"
              :key="child.title"
              :class="{
                active: child.isActive
              }"
              class="sidebar__child"
              @click="onItemClick(child, item)"
            >{{ child.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export type AdminPageIconType = 'user' | 'cart' | 'statistik'

export interface AdminPageInterface {
  title: string
  href?: string
  isHaveChild: boolean
  childs?: AdminPageInterface[]
  icon?: AdminPageIconType
  isOpen?: boolean
  isActive?: boolean
}

const router = useRouter()

const navigation: Ref<AdminPageInterface[]> = ref([
  {
    title: 'Статистика',
    isHaveChild: true,
    icon: 'statistik',
    childs: [
      {
        title: 'Жалобы',
        href: '/statistic/reports',
        isHaveChild: false,
      },
      {
        title: 'Ошибки',
        href: '/statistic/errors',
        isHaveChild: false,
      },
      {
        title: 'Аналитика',
        href: '/statistic/analitic',
        isHaveChild: false,
      },
      {
        title: 'eCommerce',
        href: '/statistic/ecommerce',
        isHaveChild: false,
      },
      {
        title: 'Классы',
        href: '/statistic/classes',
        isHaveChild: false,
      },
    ],
  },
  {
    title: 'Продукты',
    isHaveChild: true,
    icon: 'cart',
    childs: [
      {
        title: 'Новости',
        href: '/products/news',
        isHaveChild: false,
      },
      {
        title: 'Темы для форума',
        href: '/products/themes',
        isHaveChild: false,
      },
      {
        title: 'Статьи',
        href: '/products/articles',
        isHaveChild: false,
      },
    ]
  },
  {
    title: 'Пользователи',
    isHaveChild: true,
    icon: 'user',
    childs: [
      {
        title: 'Администраторы',
        href: '/users/admin',
        isHaveChild: false,
      },
      {
        title: 'Игроки',
        href: '/users/admin',
        isHaveChild: false,
      },
    ],
  }
])
const isSidebarOpen = ref(true)

const onItemClick = (item: AdminPageInterface, parrent?: AdminPageInterface) => {
  if (item.childs?.length) {
    if (item.isActive) return

    navigation.value = navigation.value.map(el => {
      el.isActive = false
      if (item.title !== el.title) {
        el.isOpen = false
      } else {
        el.isOpen = true
      }

      return el
    })
  }

  else if (parrent) {
    navigation.value = navigation.value.map((parrentElement) => {
      parrentElement.childs = parrentElement.childs?.map(el => {
        return { ...el, isActive: item.title === el.title ? true : false }
      })

      return {
        ...parrentElement,
        isActive: parrentElement.title === parrent.title ? true : false
      }
    })
  }

  if (item.href) {
    router.push(`/admin${item.href}`)
  }
}
</script>

<style lang="scss">
$sidebarItemHeadHight: 62px;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  max-width: 30px;
  width: 100%;
  height: 100vh;

  box-shadow: var(--admin-secondary-shadow);
  transition: all .4s;
  flex-shrink: 0;

  &.active {
    max-width: 300px;
    padding: 10px;
  }

  &__title {
    margin: 30px 0;

    font-size: 28px;
    font-weight: 800;
    text-align: center;
  }

  &__item {
    max-height: $sidebarItemHeadHight;
    height: 100%;

    margin-bottom: 20px;

    transition: all .8s;
    overflow: hidden;

    &.open {
      max-height: 1200px;
    }

    &.active {
      border-left: 5px solid var(--admin-primary-color);

      path {
        color: var(--admin-primary-color);
      }
    }

    &__title {
      font-size: 22px;
    }
  }

  &__head {
    display: flex;
    align-items: center;

    height: $sidebarItemHeadHight;

    border-radius: 5px;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: var(--admin-background-light-color);
    }
  }

  &__icon {
    margin-right: 20px;

    span, svg, path {
      font-size: 28px;
    }
  }

  &__more-icon {
    margin-left: auto;
    font-size: 36px;
  }

  &__child {
    padding: 10px;
    margin: 0 0 10px 30px;
    border-radius: 5px;

    transition: all .4s;
    cursor: pointer;

    &:hover {
      background: var(--admin-background-light-color);
    }

    &.active {
      border-left: 5px solid var(--admin-primary-color);
    }
  }
}
</style>
