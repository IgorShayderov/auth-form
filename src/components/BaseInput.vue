<template>
  <label
    :for="id"
    :class="$style.label"
  >
    <slot name="default">
      {{ labelText }}
    </slot>
    <input
      :id="id"
      :value="modelValue"
      :class="inputClasses"
      v-bind="$attrs"
      @input="handleInput"
      @change="handleChange"
    >
  </label>

  <p :class="errorMessagesClasses">
    {{ errors.join(', ') }}
  </p>
</template>

<script lang="ts" setup>
import { computed, ref, useCssModule } from 'vue';

interface IProps {
  id: string;
  modelValue: string;
  labelText?: string;
  isValid?: boolean;
  errors?: string[];
}

interface IEmits {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<IProps>(), {
  labelText: '',
  isValid: true,
  errors: () => [],
});
const $emit = defineEmits<IEmits>();

const isUsed = ref(false);

const handleInput = (event: Event) => {
  isUsed.value = false;
  $emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const handleChange = () => {
  isUsed.value = Boolean(props.modelValue);
};

const $style = useCssModule();

const inputClasses = computed(() => {
  return {
    [$style.input]: true,
    [$style.input_valid]: isUsed.value && props.isValid,
    [$style.input_invalid]: isUsed.value && !props.isValid,
  };
});
const errorMessagesClasses = computed(() => {
  const shouldBeVisible = isUsed.value && props.errors.length > 0 && !props.isValid;

  return {
    [$style['error-message']]: true,
    [$style['error-message_visible']]: shouldBeVisible,
  };
});
</script>

<style lang="scss" module>
.label {
  display: flex;
  flex-wrap: wrap;
}

.input {
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
  font-size: 1rem;
  height: 32px;
  padding: 5px;
  width: 100%;

  &:focus-visible {
    outline: var(--background-color) auto 1px;
  }
}

.input_valid {
  outline: var(--success-color) auto 1px;

  &:focus-visible {
    outline: var(--success-color) auto 1px;
  }
}

.input_invalid {
  outline: var(--alert-color) auto 1px;

  &:focus-visible {
    outline: var(--alert-color) auto 1px;
  }
}

.error-message {
  color: var(--alert-color);
  font-size: 0.875rem;
  line-height: 1;
  margin: 0 0 5px;
  min-height: 0.875rem;
  text-align: left;
  visibility: hidden;
}

.error-message_visible {
  visibility: visible;
}
</style>
