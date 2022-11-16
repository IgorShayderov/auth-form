<template>
  <div :class="$style['form-wrapper']">
    <h1 :class="$style.title">
      Authentification form
    </h1>

    <form
      ref="authenticationForm"
      @submit="submitForm"
    >
      <InputField
        v-model="email"
        type="email"
        name="email"
        :is-valid="isEmailValid"
        :class="$style.input"
      >
        Email:
      </InputField>

      <InputField
        v-model="password"
        type="password"
        name="password"
        :is-valid="isPasswordValid"
        :class="$style['password-input']"
      >
        <div>
          Password:

          <BaseButton :class="$style['show-password-btn']" />
        </div>
      </InputField>

      <BaseButton
        type="submit"
        :disabled="!isFormValid"
        :is-valid="isFormValid"
        :class="$style['submit-btn']"
      >
        Sign in
      </BaseButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

import InputField from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

import authenticate from '@/api';

const email = ref('');
const password = ref('');

const isLoading = ref(false);

const authenticationForm = ref<HTMLFormElement | null>(null);

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const isPasswordValid = computed(() => password.value.trim().match(passwordRegex) !== null);
const emailRegex = /^\S+@\S+\.\S+$/;
const isEmailValid = computed(() => email.value.trim().match(emailRegex) !== null);
const isFormValid = computed(() => {
  const areFieldsValid = isPasswordValid.value && isEmailValid.value;

  return areFieldsValid && !isLoading.value;
});

const resetFormFields = () => {
  email.value = '';
  password.value = '';
};
const submitForm = async (event: Event) => {
  event.preventDefault();

  if (isFormValid.value) {
    const formData = new FormData(authenticationForm.value as HTMLFormElement);

    await authenticate(formData).then(() => resetFormFields());

    // TODO show message of success
  }
};
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
  font-size: 1.8rem;
}
.input {
  margin: 0 0 10px;
}

.password-input {
  @extend .input;
  position: relative;
}

.show-password-btn {
  background: no-repeat center url('@/assets/eye.svg');
  height: 10px;
  position: absolute;
  width: 10px;
}

.submit-btn {
  background-color: var(--success-color);
  color: var(--text-color);
  margin: 15px 0 0;
  width: 100%;
}
</style>
