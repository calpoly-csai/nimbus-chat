<template>
  <div class="tooltip">
    <slot />
    <p class="description">{{description}}</p>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.tooltip {
  font-family: inherit;
  font-size: 12px;
  z-index: 5;
  position: relative;
  cursor: pointer;
  width: min-content;
  .description {
    position: absolute;
    left: 0%;
    top: 80%;
    padding: 7px;
    opacity: 0;
    transition: opacity 0.7s;
    background: #76d4ffce;
    color: white;
    pointer-events: none;
    border-radius: 7px;
  }

  &:hover > .description {
    opacity: 1;
  }
}
</style>