<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters long)</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ submitModeButtonCaption }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    }
  },
  computed: {
    submitButtonCaption () {
      if (this.mode === 'login') {
        return 'Login'
      } else {
        return 'Signup'
      }
    },
    submitModeButtonCaption () {
      if (this.mode === 'login') {
        return 'Signup'
      } else {
        return 'Login'
      }  
    },
  },
  methods: {
    async submitForm () {
      this.formIsValid = true
      if (
        !this.email.length || 
        !this.email.includes('@') || 
        !this.email.includes('.') || 
        this.password.length < 6
      ) {
        this.formIsValid = false
        return
      }

      this.isLoading = true

      const actionPayload = { email: this.email, password: this.password }
      const action = this.mode // 'login' or 'signup'

      try {   
        await this.$store.dispatch(action, actionPayload)
        const redirectURL = `/${this.$route.query.redirect || 'coaches'}`
        this.$router.replace(redirectURL)
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, please try later!'
      }

      this.isLoading = false
    },
    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    },
    handleError () {
      this.error = null
    }
  }
}
</script>

<style>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>