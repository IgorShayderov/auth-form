<template>
  <div :class="$style['form-wrapper']">
    <h1 :class="$style.title">Authentification form</h1>

    <form :class="$style.form" action="">
      <label for="email" :class="$style.label">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          :class="$style.input" />
      </label>

      <label for="password" :class="$style.label">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          :class="$style.input" />
      </label>

      <button type="submit">Sign in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<style lang="scss" module>
.form-wrapper {
  background-color: var(--sub-background-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  margin: auto;
  padding: 15px;
  width: 350px;
}

.title {
  margin: 0 0 15px;
}

.form {

}

.label {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 10px;
}

.input {
  box-sizing: border-box;
  font-size: 1rem;
  height: 32px;
  width: 100%;
}

.submit-btn {
  background-color: var(--success-color);
  border: none;
  border-radius: 5px;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 600;
  margin: 10px 0 0;
  padding: 5px 10px;
  width: 100%;
}

.submit-btn_disabled {
  opacity: 0.6;
}
</style>
