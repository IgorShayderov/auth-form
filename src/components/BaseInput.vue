<template>
  <label
    for="email"
    :class="$style.label"
  >
    <slot name="default">
      {{ labelText }}
    </slot>
    <input
      :value="modelValue"
      :class="inputClasses"
      v-bind="$attrs"
      @input="handleInput"
      @change="handleChange"
    >
  </label>
</template>

<script lang="ts" setup>
import { computed, useCssModule } from 'vue';

interface IProps {
  modelValue: string;
  labelText?: string;
  isValid?: boolean;
}

interface IEmits {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<IProps>(), {
  labelText: '',
  isValid: true,
});
const $emit = defineEmits<IEmits>();

const handleInput = (event: Event) => {
  console.log({ event }, 'from input');
  $emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const handleChange = () => {
  //
};

const $style = useCssModule();

const inputClasses = computed(() => {
  return [$style.input];
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

</style>
