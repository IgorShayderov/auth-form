<template>
  <button
    :class="btnClasses"
    :disabled="$props.isLoading"
    type="button"
  >
    <span :class="btnTextClasses">
      <slot name="default">
        {{ labelText }}
      </slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { useCssModule, computed } from 'vue';

interface IProps {
  labelText?: string;
  isValid?: boolean;
  isLoading?: boolean;
}

const $props = withDefaults(defineProps<IProps>(), {
  labelText: '',
  isValid: true,
  isLoading: false,
});

const $style = useCssModule();

const btnClasses = computed(() => {
  return {
    [$style.btn]: true,
    [$style.btn_invalid]: !$props.isValid,
    [$style.btn_loading]: $props.isLoading,
  };
});

const btnTextClasses = computed(() => {
  return {
    [$style.btn__text]: true,
    [$style.btn__text_loading]: $props.isLoading,
  };
});
</script>

<style lang="scss" module>
.btn {
  --input-height: 32px;
  --vertical-padding: 5px;

  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  height: var(--input-height);
  padding: var(--vertical-padding) 10px;

  &_invalid {
    opacity: 0.6;
  }

  &_loading {
    background-image: url('@/assets/icons/loader.svg');
    background-repeat: no-repeat;
    background-size: calc(var(--input-height) + (var(--vertical-padding) * 2));
    background-position: center;
  }

  &[disabled] {
    cursor: wait;
  }
}

.btn__text {
  &_loading {
    visibility: hidden;
  }
}
</style>
