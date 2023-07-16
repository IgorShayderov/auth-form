<template>
  <button
    :class="submitBtnClasses"
    :disabled="$props.isLoading"
    type="button"
  >
    <slot
      v-if="!$props.isLoading"
      name="default"
    >
      {{ labelText }}
    </slot>
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

const submitBtnClasses = computed(() => {
  return {
    [$style.btn]: true,
    [$style.btn_invalid]: !$props.isValid,
    [$style.btn_loading]: $props.isLoading,
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
    background-color: transparent;
    background-image: url('@/assets/icons/loader2.svg');
    background-repeat: no-repeat;
    background-size: calc(var(--input-height) + (var(--vertical-padding) * 2));
    background-position: center;
  }

  &[disabled] {
    cursor: wait;
  }
}

.btn__loader {
  // background: url('@/assets/icons/loader.svg');
}
</style>
