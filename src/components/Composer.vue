<template>
  <div class="composer">
    <hr class="divider" />
    <div
      class="text-field"
      contenteditable="true"
      @input="onType"
      @keyup.enter="sendMessage"
      @keydown.enter="$event.preventDefault()"
      @paste="pasteText"
      ref="messageInput"
    ></div>
    <button class="send-button" @click="sendMessage">Send</button>
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
    },
    pasteText(e) {
      e.preventDefault();
      let text = (e.originalEvent || e).clipboardData.getData("text/plain");
      e.target.innerText = text;
    }
  }
};
</script>

<style lang="scss">
.composer {
  position: relative;
  padding: 15px;
  display: flex;
  align-items: center;
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
    width: 30%;
    background: whitesmoke;
    border-radius: 7px;
    width: 90%;
    padding: 15px;
    height: min-content;
    font-size: 25px;
    font-family: inherit;
    hyphens: auto;
  }

  .send-button {
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 20px;
    font-family: inherit;
    margin: auto 10px;
    transition: all 0.5s;
    padding: 10px;
    user-select: none;

    &:active {
      transform: scale(0.97);
      opacity: 0.5;
    }
  }
}
</style>
