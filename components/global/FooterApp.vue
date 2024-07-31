<template>
  <footer class="footer">
    <div class="footer__social">
      <div class="header__logo">Lowlesses</div>
      <div class="footer__social__icons">
        <div class="footer__icon">
          <a href="/">
            <img src="~/assets/images/menu/telegram.png" alt="">
          </a>
        </div>
        <div class="footer__icon">
          <a href="/">
            <img src="~/assets/images/menu/mail.png" alt="">
          </a>
        </div>
        <div class="footer__icon">
          <a href="/">
            <img src="~/assets/images/menu/discord.png" alt="">
          </a>
        </div>
        <div class="footer__icon">
          <a href="/">
            <img src="~/assets/images/menu/vk.png" alt="">
          </a>
        </div>
      </div>
    </div>
    <div class="footer__links">
      <nav class="footer__navigation">
        <nuxt-link to="/docs">ИП Рогатов И Копытов</nuxt-link>
        <nuxt-link to="/docs">8 (800) 555-35-35</nuxt-link>
        <nuxt-link to="/docs">Images: Designed by Freepik</nuxt-link>
      </nav>
      <div class="footer__menu">
        <nav class="footer__navigation">
          <nuxt-link to="/docs">Форум</nuxt-link>
          <nuxt-link to="/docs">Информация об игре</nuxt-link>
          <nuxt-link to="/docs">Новости проекта</nuxt-link>
          <nuxt-link to="/docs">Главная</nuxt-link>
        </nav>
        <nav class="footer__navigation">
          <nuxt-link to="/docs">Лицензионное соглашение</nuxt-link>
          <nuxt-link to="/docs">Правила общения</nuxt-link>
          <nuxt-link to="/docs">Политика конфиденциальности</nuxt-link>
          <nuxt-link to="/docs">Политика возврата</nuxt-link>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  height: var(--footer-height);
  background: var(--alternative-color);
  padding: 20px;
  margin-top: 50px;

  @media (max-width: 500px) {
    height: auto;

    flex-direction: column;

    padding: 10px;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  &__social {
    display: inline-block;

    &__icons {
      display: flex;

      margin-top: 35px;

      @media (max-width: 500px) {
        display: none;
      }

      a {
        display: block;
        width: 50px;

        margin-right: 30px;

        img {
          width: 100%;
        }
      }
    }
  }

  &__links {
    width: 100%;

    display: flex;
    justify-content: space-between;
  }

  &__navigation {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-left: 50px;

    @media (max-width: 500px) {
      margin-left: 0;
      margin-top: 10px;
    }

    a {
      font-size: 15px;
      font-weight: 400;
      color: var(--text-primary-color);

      margin-bottom: 16px;

      @media (max-width: 500px) {
        font-size: 8px;

        margin-bottom: 5px;
        margin-right: 10px;
      }
    }
  }

  &__menu {
    display: flex;

    .footer__navigation {
      a {
        @media (max-width: 500px) {
          text-align: right;
        }
      }
    }
  }
}
</style>
