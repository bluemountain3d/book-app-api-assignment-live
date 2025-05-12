<script>
/**
 * @component IconSvg
 * @description A reusable SVG icon component that works with the SvgSymbols system
 *
 * @example
 * <IconSvg name="email" />
 * <IconSvg name="user" customClass="icon--lg" />
 * <IconSvg name="settings" customClass="icon-spin icon--primary" />
 */
export default {
  name: 'IconSvg',
  inheritAttrs: false, // prevents attrs from being added as attributes
  props: {
    /**
     * Icon name without the 'icon-' prefix (which is added automatically)
     * This should match an ID in your SvgSymbols component
     * @example 'email' will reference the symbol with id="icon-email"
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Additional CSS classes to apply to the icon
     * Use this to apply sizing, colors, animations, etc.
     * @example 'icon--lg icon-flip-v'
     */
    customClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>

  <svg class="icon-svg" :class="customClass" aria-hidden="true">
    <use :href="'#icon-' + name"></use>
  </svg>

</template>

<style scoped lang="scss">

  /// Base icon class for consistent styling
  .icon-svg {
    display: inline-block;
    height: 1em;
    width: auto;
    aspect-ratio: 1/1;
    fill: currentColor;
    vertical-align: middle;

    // Variants for different sizes
    &--sm {
      height: 0.75em;
    }

    &--lg {
      height: 1.5em;
    }

    &--xl {
      height: 2em;
    }
  }

  /// Utility class to flip icons horizontally
  .icon-flip-h {
    transform: scaleX(-1);
  }

  /// Utility class to flip icons vertically
  .icon-flip-v {
    transform: scaleY(-1);
  }

</style>
