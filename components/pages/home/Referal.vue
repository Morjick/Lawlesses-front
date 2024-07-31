<template>
  <section class="referal">
    <div class="referal__image"/>
    <div class="referal__body">
      <h1>{{ $t('playWithYourFriends') }}</h1>

      <p>{{ $t('forVisitYouerFriendsNeed') }}</p>

      <p>{{ $t('payForYourFriends') }}</p>

      <div class="referal__buttons">
        <ui-button
          :text="$t('toReferalFriend')"
          mode="danger"
          font-size="40px"
        />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.referal {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 75px;

  @media (max-width: 500px) {
    flex-direction: column;
  }

  &__image {
    width: 50%;
    min-height: 666px;

    background-image: url("@/assets/images/referal.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
    flex-shrink: 0;

    @media (max-width: 500px) {
      width: 100%;
      min-height: 150px;
    }
  }

  &__body {
    // max-width: 820px;
    max-width: calc(50% - 20px);
    min-height: 666px;

    background: var(--alternative-color);
    border-radius: 10px;
    padding: 20px;
    margin-left: 20px;
    flex-shrink: 0;

    @media (max-width: 500px) {
      min-width: 100%;
      min-height: 150px;

      margin-left: 0;
      padding: 5px;
      margin-top: 10px;
    }

    p {
      font-size: 20px;
      font-weight: 700;
      margin: 20px 0;

      @media (max-width: 500px) {
        font-size: 16px;
      }
    }
  }

  &__buttons {
    display: flex;
    justify-content: end;

    margin-top: 50px;

    @media (max-width: 500px) {
      margin-top: 10px;
      justify-content: center;
    }

    .ui-button {
      @media (max-width: 500px) {
        font-size: 16px;
      }
    }
  }
}
</style>
