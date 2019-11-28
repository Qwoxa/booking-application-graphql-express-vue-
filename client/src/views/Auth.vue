<template>
  <form class="auth-form">
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="input.email" />
    </div>

    <div class="form-control">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="input.password" />
    </div>

    <div class="form-error">
      <p>{{ error }}</p>
    </div>

    <div class="form-actions">
      <button
        class="btn"
        type="submit"
        @click.prevent="getCurrentAction"
      >{{ mode === 'signin' ? 'Login' : 'Submit' }}</button>
      <button
        class="btn"
        type="button"
        @click="switchMode"
      >Switch to {{ mode === 'signin' ? 'Sign Up' : 'Sign In' }}</button>
    </div>
  </form>
</template>

<script>
import { LOGIN, CREATE_USER } from '../graphql/queries';

export default {
  data() {
    return {
      input: {
        email: '',
        password: '',
      },
      error: null,
      mode: 'signin',
    };
  },
  methods: {
    signup: async function() {
      const isInvalid =
        this.input.email.trim().length === 0 ||
        this.input.password.trim().length === 0;

      if (isInvalid) {
        alert('Invalid email or password!');
        return;
      }

      try {
        await this.$apollo.mutate({
          mutation: CREATE_USER,
          variables: {
            userInput: this.input,
          },
        });

        this.input.email = '';
        this.input.password = '';
        this.error = null;
      } catch (error) {
        this.error = error.networkError.result
          ? error.networkError.result.errors[0].message
          : 'Network Error';
      }
    },
    signin: async function() {
      try {
        const response = await this.$apollo.query({
          query: LOGIN,
          variables: {
            ...this.input,
          },
        });

        this.error = null;
        localStorage.setItem('token', response.data.login.token);

        // reload to refresh local state
        location.reload();
      } catch (error) {
        this.error = error.networkError.result
          ? error.networkError.result.errors[0].message
          : 'Network Error';
      }
    },
    switchMode() {
      this.mode = this.mode === 'signup' ? 'signin' : 'signup';
    },
  },
  computed: {
    getCurrentAction() {
      if (this.mode === 'signin') {
        return this.signin;
      }

      return this.signup;
    },
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.auth-form
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
</style>
