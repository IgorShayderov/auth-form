<template>
  <AuthenticationForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthenticationForm from './components/AuthenticationForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    AuthenticationForm,
  },
});
</script>

<style lang="scss">
html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;

  --background-color: #041325;
  --sub-background-color: #232e3a;
  --border-color: #d6dbfc;
  --text-color: #ffffff;
  --success-color: #3d982c;
  --alert-color: #f20b0b;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  height: 100%;
  text-align: center;
}
</style>
