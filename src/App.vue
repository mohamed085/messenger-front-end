<template>
  <div id="app">
    <nav class="nav">
      <div class="nav__logo">
        <img class="nav__logo__img" src="../src/assets/img/logo.png">
        <h2>Messenger</h2>
      </div>
      <div class="nav__nav-items">
        <ul>
          <li class="nav__nav-items__nav-item"><router-link to="/" class="nav__nav-items__nav-item__link">Home</router-link></li>
          <li class="nav__nav-items__nav-item"><router-link to="/chats" class="nav__nav-items__nav-item__link">Chats</router-link></li>
          <li class="nav__nav-items__nav-item"><router-link to="/friends" class="nav__nav-items__nav-item__link">Friends</router-link></li>
          <li class="nav__nav-items__nav-item"><router-link to="/discover-new-friends" class="nav__nav-items__nav-item__link">Discover new friends</router-link></li>
          <li class="nav__nav-items__nav-item"><router-link to="/auth" class="nav__nav-items__nav-item__link">Login</router-link></li>
        </ul>
      </div>
      <div class="nav__user-info"></div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

.nav {
  padding: 2px 30px !important;
  display: flex;

  &__logo {
    width: 20%;
    display: flex;
    align-items: center;
    color: #0d6efd;
    font-family: 'Oswald', sans-serif;

    &__img {
      width: 60px;
      height: 60px;
    }
  }


  &__nav-items {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;

    & ul {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }

    &__nav-item {
      list-style: none;
      margin: 0 8px;


      &__link {
        text-decoration: none;
        padding: 0 5px 10px;
        color: #777;

        &:hover,
        &.active,
        &.router-link-active {
          color: #0d6efd;
          font-weight: 600;
        }

        &.active,
        &.router-link-active {
          border-bottom: 2px solid #0d6efd;
        }
      }
    }
  }


  &__user-info {
    width: 20%;
    background-color: blue;
  }
}

.error {
  width: 100%;
  background-color: #ffc9c9;
  border: 1px solid red;
  margin: 20px 0 30px;
  padding: 15px 20px;

  &__message {
    color: red;
  }
}
</style>
