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
        id="email"
        type="email"
        name="email"
        maxlength="60"
        minlength="5"
        placeholder="Type your email"
        required
        :pattern="emailRegex"
        :is-valid="isEmailValid"
        :class="$style.input"
        :errors="getEmailErrors"
      >
        Email:
      </InputField>

      <InputField
        v-model="password"
        id="password"
        :type="passwordInputType"
        name="password"
        maxlength="16"
        minlength="6"
        placeholder="Type your password"
        required
        :pattern="passwordRegex"
        :is-valid="isPasswordValid"
        :class="[$style.input, $style['password-input']]"
        :errors="getPasswordErrors"
      >
        <template #default>
          Password:
        </template>

        <template #additional>
          <BaseButton
            :class="$style['show-password-btn']"
            aria-label="toggle-password"
            @click="togglePasswordInputType"
          />
        </template>
      </InputField>

      <BaseButton
        type="submit"
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

type passwordType = 'text' | 'password';

const email = ref('');
const password = ref('');
const passwordInputType = ref<passwordType>('password');

const isLoading = ref(false);

const authenticationForm = ref<HTMLFormElement | null>(null);

const emailRegex = /^\S+@\S+\.\S+$/;
const isEmailValid = computed(() => email.value.trim().match(emailRegex) !== null);
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const isPasswordValid = computed(() => password.value.trim().match(passwordRegex) !== null);
const isFormValid = computed(() => {
  const areFieldsValid = isPasswordValid.value && isEmailValid.value;

  return areFieldsValid && !isLoading.value;
});

const emailErrors = {
  'Invalid email': isEmailValid.value,
};
const passwordErrors = {
  'Invalid password': isPasswordValid.value,
};
const getErrors = (errors = {}) => {
  return Object.entries(errors)
    .reduce((messages: string[], [errorMessage, condition]) => {
      if (!condition) {
        messages.push(errorMessage);
      }

      return messages;
    }, []);
};
const getEmailErrors = computed(() => getErrors(emailErrors));
const getPasswordErrors = computed(() => getErrors(passwordErrors));

const togglePasswordInputType = () => {
  const newInputType = passwordInputType.value === 'password' ? 'text' : 'password';

  passwordInputType.value = newInputType;
};

const resetFormFields = () => {
  email.value = '';
  password.value = '';
};
const submitForm = async (event: Event) => {
  event.preventDefault();

  if (isFormValid.value) {
    const formData = new FormData(authenticationForm.value as HTMLFormElement);

    await authenticate(formData).then(() => resetFormFields());

    alert('Successfully authenticated!');
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
  padding: 5px 40px 5px 5px;
}

.show-password-btn {
  background: no-repeat center/20px 20px url('@/assets/icons/eye.svg');
  position: absolute;

  bottom: 11px;
  height: 30px;
  right: 10px;
  width: 30px;
}

.submit-btn {
  background-color: var(--success-color);
  color: var(--text-color);
  margin: 15px 0 0;
  width: 100%;
}
</style>
