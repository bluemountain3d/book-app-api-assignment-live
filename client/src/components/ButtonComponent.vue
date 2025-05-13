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
  }
});

const emit = defineEmits(['click', 'change'])

const handleClick = (event) => {
  if (props.to) {
    router.push(props.to)
  }
  else {
    emit('click', event)
  }
};
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="['CTA-button', typeOfBtn]">
      <span>{{ label }}</span>
  </RouterLink>

  <button
      v-else
      :type="type"
      @click="handleClick"
      :class="['CTA-button', typeOfBtn]">

    <span>{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
button {
  all: unset;
}

.CTA-button {
  cursor: pointer;
  padding: 0.75rem 2rem;
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

  transition: color .2s ease, background-color .2s ease;

  &:hover {
    background-color: var(--color-accent-tint);
  }
  &:active {
    background-color: var(--color-accent-shade);
  }
}

.primary-btn {
  background-color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary-tint);
  }
  &:active {
    background-color: var(--color-primary-shade);
  }
}
</style>

