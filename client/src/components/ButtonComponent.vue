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
  display: inline-block;
  background-color: var(--color-accent);
  border-radius: 100px;

  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  color: #fff;
  text-decoration: none;

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

