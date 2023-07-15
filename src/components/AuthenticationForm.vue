<template>
  <div :class="$style['form-wrapper']">
    <h1 :class="$style.title">
      Auth
    </h1>

    <form
      ref="authenticationForm"
      @submit="submitForm"
    >
      <InputField
        v-model="email"
        id="email"
        autocomplete="email"
        type="email"
        name="email"
        maxlength="60"
        minlength="5"
        placeholder="Type your email"
        required
        :pattern="emailRegex.toString().replaceAll('/', '')"
        :is-valid="isEmailValid"
        :class="$style.input"
        :errors="getEmailErrors"
      >
        Email:
      </InputField>

      <InputField
        v-model="password"
        id="password"
        autocomplete="current-password"
        :type="passwordInputType"
        name="password"
        maxlength="16"
        minlength="6"
        placeholder="Type your password"
        required
        :is-valid="isPasswordValid"
        :class="[$style.input, $style['password-input']]"
        :errors="getPasswordErrors"
      >
        <template #default>
          Password:
        </template>

        <template #additional>
          <BaseButton
            :class="togglePasswordBtnClasses"
            aria-label="toggle-password"
            @click.stop="togglePasswordInputType"
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
import { ref, reactive, computed, useCssModule } from 'vue';

import InputField from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

import authenticate from '@/api/index';

type passwordType = 'text' | 'password';

const email = ref('');
const password = ref('');
const passwordInputType = ref<passwordType>('password');

const state = reactive<{
  formStatus: 'pending' | 'loading';
}>({
  formStatus: 'pending'
});

const authenticationForm = ref<HTMLFormElement | null>(null);

const emailRegex = /^\S+@\S+\.\S+$/;
const isEmailValid = computed(() => email.value.trim().match(emailRegex) !== null);
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const isPasswordValid = computed(() => password.value.trim().match(passwordRegex) !== null);
const isFormValid = computed(() => {
  const areFieldsValid = isPasswordValid.value && isEmailValid.value;

  return areFieldsValid && state.formStatus !== 'loading';
});

const emailErrors = {
  'Invalid email': isEmailValid.value,
};
const passwordErrors = {
  'Password length should be from 6 to 16 symbols with at least one special symbol(!@#$%^&*)': isPasswordValid.value,
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

const submitForm = async (event: Event) => {
  event.preventDefault();

  if (isFormValid.value) {
    // TODO set loading
    state.formStatus = 'loading';
    const formData = new FormData(authenticationForm.value as HTMLFormElement);

    try {
      await authenticate(formData);
      // TODO заменить алерт на тост
      alert('Successfully authenticated!');
    } catch {
      // TODO обработать ошибку неверного логина и пароля отдельно от ошибки сети
      alert('Authentication was unsuccessful. Try again.');
    } finally {
      state.formStatus = 'pending';
    }
  }
};

const $style = useCssModule();

const togglePasswordBtnClasses = computed(() => {
  const isPasswordVisible = passwordInputType.value === 'text';

  return [$style['show-password-btn'], isPasswordVisible && $style['show-password-btn_password-visible']];
});
</script>

<style lang="scss" module>
  $small-screen-size: 576px;

.form-wrapper {
  background-color: var(--sub-background-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  padding: 15px;
  margin-top: 150px;

  @media screen and (min-width: $small-screen-size) {
    width: 350px;
  }
}

.title {
  margin: 0 0 15px;
  font-size: 1.8rem;
}
.input {
  margin: 10px 0;

  &:focus {
    outline-color: var(--highlight-color);
  }
}

.password-input {
  padding: 5px 40px 5px 10px;
}

.show-password-btn {
  background: no-repeat center/20px 20px url('@/assets/icons/eye.svg');
  position: absolute;

  bottom: 11px;
  height: 30px;
  right: 10px;
  width: 30px;
}

.show-password-btn_password-visible {
  background: no-repeat center/24px 24px url('@/assets/icons/eye-crossed.svg');
}

.submit-btn {
  background-color: var(--success-color);
  color: var(--text-color);
  margin: 15px 0 0;
  width: 100%;
}
</style>
