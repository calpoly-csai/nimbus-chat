<template>
  <div class="message-container" :class="{'from-user': fromUser}">
    <p class="message">{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    fromUser: Boolean,
    text: String
  }
};
</script>

<style lang="scss">
.message-container {
  padding: 5px 20px;
  color: white;
  width: 100%;
  text-align: left;

  &.from-user {
    text-align: right;
    .message {
      background: var(--accent);
      &::after {
        background: var(--accent);
        right: -5px;
        left: auto;
        transform: skew(-10deg);
      }
    }
  }

  .message {
    position: relative;
    display: inline-block;
    text-align: left;
    border-radius: 15px;
    font-size: 17px;
    background: var(--base);
    padding: 15px;
    max-width: 60%;

    &::after {
      position: absolute;
      bottom: -5px;
      left: -5px;
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--base);
      transform: skew(10deg);
    }
  }
}
</style>