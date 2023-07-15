<template>
  <button
    :class="submitBtnClasses"
    type="button"
  >
    <slot name="default">
      {{ labelText }}
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { useCssModule, computed } from 'vue';

interface IProps {
  labelText?: string;
  isValid?: boolean;
}

const $props = withDefaults(defineProps<IProps>(), {
  labelText: '',
  isValid: true,
});

const $style = useCssModule();

const submitBtnClasses = computed(() => {
  return [$style.btn, !$props.isValid && $style.btn_invalid];
});

</script>

<style lang="scss" module>
.btn {
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  height: 32px;
  padding: 5px 10px;
}

.btn_invalid {
  opacity: 0.6;
}
</style>
