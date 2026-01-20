vue

<template>
  <div v-if="isAuthenticated">
    <button @click="logout">Log Out</button>
  </div>
  <div v-else>
    <button class = "login-button" @click="login">Log In</button>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

const login = () => {
  loginWithRedirect();
};

// const logout = () => {
//   logout({
//     logoutParams: {
//       returnTo: window.location.origin
//     }
//   });
// };
</script>

<style>
  .login-button {
    font-size: 1.5em;
    width: 700px;
  }
</style>