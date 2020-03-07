<template>
  <div class="message-container" :class="{'from-user': fromUser}">
    <p class="message">{{text}}</p>
    <message-feedback v-if="!fromUser && pendingFeedback" @feedback="sendFeedback"></message-feedback>
  </div>
</template>

<script>
import MessageFeedback from "@/components/MessageFeedback";
export default {
  components: {
    MessageFeedback
  },
  props: {
    fromUser: Boolean,
    text: String
  },
  data() {
    return {
      pendingFeedback: true
    };
  },
  methods: {
    sendFeedback(isPositive) {
      console.log("feedback message recieved");
      this.pendingFeedback = false;
      this.$emit("feedback", isPositive);
    }
  }
};
</script>

<style lang="scss">
.message-container {
  display: flex;
  justify-content: flex-start;
  padding: 5px 10px;
  color: white;
  width: 100%;

  &.from-user {
    justify-content: flex-end;
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
    max-width: 80%;
    word-break: break-word;
    hyphens: auto;

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