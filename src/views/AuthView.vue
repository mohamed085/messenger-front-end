<template>
  <div class="template">
    <main class="auth">
      <div class="auth__header">
        <div @click="displayRegister" :class="display_register ? 'active-auth' : ''">Register</div>
        <div @click="displayLogin" :class="display_login ? 'active-auth' : ''">Login</div>
      </div>

      <div class="auth__content">
        <div v-if="display_register">
          <div class="auth__content__logo">
            <img class="nav__logo__img" src="../assets/img/logo.png">
            <span>Create new account</span>
          </div>

          <div v-if="register_error" class="error text-center">
            <span class="error__message">{{ register_error }}</span>
          </div>

          <div class="text-center" v-if="is_loading">
            <b-spinner style="width: 60px; height: 60px;" variant="primary" label="Spinning"></b-spinner>
          </div>

          <b-form v-else class="form" @submit.prevent="register">
            <b-form-group
                class="d-flex mb-4"
                label-cols="3"
                content-cols="9"
                label="Enter your name"
                label-for="input-horizontal"
            >
              <b-form-input required v-model="register_data.name"></b-form-input>
            </b-form-group>

            <b-form-group
                class="d-flex mb-4"
                label-cols="3"
                content-cols="9"
                label="Enter your email"
                label-for="input-horizontal"
            >
              <b-form-input type="email" required v-model="register_data.email"></b-form-input>
            </b-form-group>

            <b-form-group
                class="d-flex mb-4"
                label-cols="3"
                content-cols="9"
                label="Enter your password"
                label-for="input-horizontal"
            >
              <b-form-input type="password" required v-model="register_data.password"></b-form-input>
            </b-form-group>

            <b-form-group
                class="d-flex mb-4"
                label-cols="3"
                content-cols="9"
                label="Add your avatar"
                label-for="input-horizontal"
            >
              <div v-if="register_data.avatar_file">
                <button type="reset" class="btn-remove-image-header d-flex">
                  <p>Image uploaded</p>
                  <i @click="removerImage" class="far fa-times"></i>
                </button>
                <div class="img">
                  <img class="img__file" :src="register_data.avatar">
                </div>

              </div>
              <div v-else>
                <input type="file" accept="image/" class="hidden" ref="mainImage" @change="changeImage">
                <button type="reset" @click="browseImage" class="btn-image-header d-flex">
                  <i class="far fa-image"></i>
                  <p>Choose image</p>
                </button>
              </div>
            </b-form-group>

            <div class="d-flex justify-content-center">
              <b-button type="submit" class="btn w-25" variant="primary">Register</b-button>
            </div>
          </b-form>

        </div>

        <div v-else-if="display_login">
          <div class="auth__content__logo">
            <img class="nav__logo__img" src="../assets/img/logo.png">
            <span>Login</span>
          </div>

          <div class="text-center" v-if="is_loading">
            <b-spinner style="width: 60px; height: 60px;" variant="primary" label="Spinning"></b-spinner>
          </div>

          <b-form v-else class="form" @submit.prevent="login">
            <b-form-group
                class="d-flex mb-4"
                label-cols="3"
                content-cols="9"
                label="Enter your email"
                label-for="input-horizontal"
            >
              <b-form-input type="email" required v-model="login_data.email"></b-form-input>
            </b-form-group>

            <b-form-group
                class="d-flex mb-4"
                label-cols="3"
                content-cols="9"
                label="Enter your password"
                label-for="input-horizontal"
            >
              <b-form-input type="password" required v-model="login_data.password"></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-center">
              <b-button type="submit" class="btn w-25" variant="primary">Login</b-button>
            </div>
          </b-form>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AuthView",
  data() {
    return {
      is_loading: false,
      display_register: true,
      display_login: false,
      register_error: '',
      login_error: '',
      register_data: {
        name: '',
        email: '',
        password: '',
        avatar_file: '',
        avatar: '',
      },
      login_data: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    displayLogin() {
      this.display_login = true;
      this.display_register = false;
    },
    displayRegister() {
      this.display_login = false;
      this.display_register = true;
    },
    changeImage(e) {
      this.register_data.avatar_file = e.target.files[0];
      this.$emit('input', this.register_data.avatar_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.register_data.avatar_file);
      reader.onload = e => {
        this.register_data.avatar = e.target.result;
      }
    },
    browseImage() {
      this.$refs.mainImage.click();
    },
    removerImage() {
      this.register_data.avatar_file = '';
      this.register_data.avatar = '';
    },
    async register() {
      this.is_loading = true;

      let formdata = new FormData();
      formdata.append("name", this.register_data.name);
      formdata.append("email", this.register_data.email);
      formdata.append("password", this.register_data.password);
      if (this.register_data.avatar_file) {
        formdata.append("avatar_file", this.register_data.avatar_file);
      }

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      const response  = await fetch("http://localhost:8080/register", requestOptions)
      const responseData = await response.json();

      if (!response.ok) {
        this.register_error = responseData.message
      } else  {
        this.displayLogin();
      }

      this.is_loading = false;

    },
    login() {
      console.log(this.login_data)
    }
  }
}
</script>

<style scoped lang="scss">
.template {
  display: flex;
  justify-content: center;
}

.hidden {
  display: none;
}

.auth {
  width: 70%;
  margin: 80px 0 40px;
  border: 1px solid #0d6efd;

  &__header {
    display: flex;

    & div {
      width: 50%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      color: #0d6efd;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
      cursor: pointer;
    }
  }

  &__content {
    padding: 3% 7%;

    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #0d6efd;
      font-family: 'Oswald', sans-serif;
      font-size: 34px;
      margin-bottom: 28px;
    }
  }
}

.active-auth {
  background-color: #0d6efd;
  color: #fff !important;

  &::selection {
    background-color: #fff;
    color: #0d6efd !important;
  }
}


.btn-image-header {
  border: 1px solid #c1c1c1;
  padding: 5px 10px;
  color: #0d6efd !important;
  width: 160px;
  margin: 10px;
  cursor: pointer;
}
.btn-image-header i {
  margin: auto 0;
  font-size: 120%;
}
.btn-image-header p {
  margin: auto 5px;
}
.btn-remove-image-header {
  border: 1px solid #c1c1c1;
  padding: 5px 10px;
  width: 200px;
  margin: 10px;
}
.btn-remove-image-header p {
  margin: auto 5px;
}
.btn-remove-image-header .fa-image {
  margin: auto 0;
  font-size: 120%;
  color: #0d6efd !important;
}
.btn-remove-image-header .fa-times {
  margin: auto 5px auto auto;
}
.btn-remove-image-header .fa-times:hover {
  color: #0d6efd !important;
}

.img__file {
  max-width: 100%;
  max-height: 500px;
}
</style>