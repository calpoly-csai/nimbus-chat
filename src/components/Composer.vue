<template>
  <div class="composer">
    <hr class="divider" />
    <div
      class="text-field"
      contenteditable="true"
      @input="onType"
      @keyup.enter="sendMessage"
      ref="messageInput"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  methods: {
    onType(event) {
      this.$emit("input", event.target.innerText);
    },
    sendMessage() {
      this.$refs.messageInput.innerText = "";
      this.$emit("send");
    }
  }
};
</script>

<style lang="scss">
.composer {
  position: relative;
  padding: 15px;
  display: flex;
  justify-content: center;
  background: white;
  width: 100%;

  .divider {
    position: absolute;
    top: -10px;
    width: 100%;
    border: 1px solid whitesmoke;
  }

  .text-field {
    width: 250px;
    max-width: 50%;
    height: min-content;
    font-size: 25px;
    font-family: inherit;
    border-bottom: 1px solid var(--dark);
  }
}
</style>