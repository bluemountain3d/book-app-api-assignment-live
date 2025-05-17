<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button',
  },
  to: {
    type: String,
    default: '',
  },
  typeOfBtn: {
    type: String,
    default: "CTA-btn"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  widthClass: {
    type: String,
    default: "auto"
  }
});

const emit = defineEmits(['click', 'change'])

const handleClick = (event) => {
  if (props.disabled) {
    return; // Do nothing if buttin is inactive
  }

  if (props.to) {
    router.push(props.to)
  }
  else {
    emit('click', event)
  }
};
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    :class="['CTA-button', typeOfBtn, widthClass, { 'disabled': disabled }]"
    :tabindex="disabled ? -1 : 0"
  >
    <span>{{ label }}</span>
  </RouterLink>

  <button
    v-else
    :type="type"
    @click="handleClick"
    :class="['CTA-button', typeOfBtn, widthClass, { 'disabled': disabled }]"
    :disabled="disabled"
  >
    <span>{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
button {
  all: unset;
}

.CTA-button {
  cursor: pointer;
  box-sizing: border-box;
  padding: .875rem 2rem;
  background-color: var(--color-accent);
  border-radius: 100px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: var(--font-size-200);
  line-height: 1;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  width: fit-content;

  transition: color .2s ease, background-color .2s ease;

  &:hover:not(.disabled) {
    background-color: var(--color-accent-tint);
  }
  &:active:not(.disabled) {
    background-color: var(--color-accent-shade);
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.primary-btn {
  background-color: var(--color-primary);

  &:hover:not(.disabled) {
    background-color: var(--color-primary-tint);
  }
  &:active:not(.disabled) {
    background-color: var(--color-primary-shade);
  }
}

// Width Classes
.full {
  width: 100%;
}
.auto {
  width: auto;
}
</style>
