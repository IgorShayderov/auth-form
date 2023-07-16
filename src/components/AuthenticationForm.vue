<template>
  <div :class="$style['form-wrapper']">
    <h1 :class="$style.title">
      {{ t('authForm.title') }}
    </h1>

    <form
      ref="authenticationForm"
      @submit="submitForm"
    >
      <p
        v-show="state.error"
        :class="$style['auth-error']"
      >
        {{ getErrorText }}
      </p>

      <InputField
        v-model="email"
        id="email"
        autocomplete="email"
        type="email"
        name="email"
        :maxlength="MAX_EMAIL_LENGTH"
        :minlength="MIN_EMAIL_LENGTH"
        :placeholder="t('authForm.inputs.email.placeholder')"
        required
        :is-valid="isEmailValid"
        :class="$style.input"
        @focus="reset"
      >
        {{ t('authForm.inputs.email.label') }}:
      </InputField>

      <InputField
        v-model="password"
        id="password"
        autocomplete="current-password"
        :type="passwordInputType"
        name="password"
        :maxlength="MAX_PASSWORD_LENGTH"
        :minlength="MIN_PASSWORD_LENGTH"
        :placeholder="t('authForm.inputs.password.placeholder')"
        required
        :is-valid="isPasswordValid"
        :class="[$style.input, $style['password-input']]"
        @focus="reset"
      >
        <template #default>
          {{ t('authForm.inputs.password.label') }}:
        </template>

        <template #additional>
          <BaseButton
            :class="togglePasswordBtnClasses"
            :aria-label="t('authForm.buttons.showPassword.ariaLabel')"
            @click.stop="togglePasswordInputType"
          />
        </template>
      </InputField>

      <BaseButton
        type="submit"
        :class="$style['submit-btn']"
        :is-loading="isLoading"
      >
        {{ t('authForm.buttons.submit.title') }}
      </BaseButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {
  ref, reactive, computed, useCssModule,
} from 'vue';
import { useTranslation } from 'i18next-vue';
import { toast } from 'vue3-toastify';

import InputField from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

import { logIn } from '@/api/index';

type passwordType = 'text' | 'password';
type formStatus = 'pending' | 'loading';

const { t } = useTranslation();

const email = ref('');
const password = ref('');
const passwordInputType = ref<passwordType>('password');

const state = reactive<{
  formStatus: formStatus;
  error: string | null;
}>({
  formStatus: 'pending',
  error: null,
});

const authenticationForm = ref<HTMLFormElement | null>(null);

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 16;
const MAX_EMAIL_LENGTH = 30;
const MIN_EMAIL_LENGTH = 5;

const emailRegex = /^\S+@\S+\.\S+$/;
const isEmailValid = computed(() => email.value.trim().match(emailRegex) !== null);
const isPasswordValid = computed(() => password.value.trim().length >= MIN_PASSWORD_LENGTH);
const isFormValid = computed(() => isPasswordValid.value && isEmailValid.value);

const isLoading = computed(() => state.formStatus === 'loading');

const getErrorText = computed(() => {
  switch (state.error) {
    case 'unathorized':
      return t('authForm.messages.unathorized');
    default:
      return t('authForm.messages.defaultError');
  }
});

const togglePasswordInputType = () => {
  passwordInputType.value = passwordInputType.value === 'password' ? 'text' : 'password';
};

const reset = () => {
  state.error = null;
};

const submitForm = async (event: Event) => {
  event.preventDefault();

  if (isFormValid.value && !isLoading.value) {
    state.formStatus = 'loading';
    const formData = new FormData(authenticationForm.value as HTMLFormElement);

    try {
      await logIn(formData);

      toast.success(t('authForm.messages.success'));
      throw new Error();
    } catch (error) {
      if (error.response?.status === 401) {
        state.error = 'unathorized';
      } else {
        state.error = error.message;
      }
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
  background: no-repeat center/26px 26px url('@/assets/icons/eye-crossed.svg');
}

.auth-error {
  margin: 0;

  color: var(--text-color);
  border-radius: 6px;
  padding: 5px 0;
  background-color: var(--alert-background);
  border: 1px solid var(--alert-color);
  margin-bottom: 10px;
}

.submit-btn {
  background-color: var(--success-color);
  color: var(--text-color);
  margin: 15px 0 0;
  width: 100%;
}
</style>
