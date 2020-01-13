<template>
  <div id="app">
    <div class="content">
      <div class="messages" ref="messages">
        <prompter v-if="!conversation.length"></prompter>
        <transition-group name="message">
          <Message v-for="message in conversation" v-bind="message" :key="message.timestamp"></Message>
        </transition-group>
      </div>

      <Composer v-model="textField" @send="sendMessage"></Composer>
    </div>
  </div>
</template>

<script>
import Message from "./components/Message.vue";
import Composer from "./components/Composer.vue";
import Prompter from "./components/Prompter.vue";
import { delay } from "./modules/animation";
export default {
  name: "app",
  components: {
    Message,
    Composer,
    Prompter
  },
  data() {
    return {
      conversation: [],
      textField: "",
      dummyResponses: [
        "Hmmm I'll think about that",
        "I'll get back to you",
        "That depends",
        "What do you think"
      ]
    };
  },
  methods: {
    async generateResponse() {
      await delay(1500);
      let i = (Math.random() * (this.dummyResponses.length - 1)) >> 0;
      this.conversation.push({
        text: this.dummyResponses[i],
        fromUser: false,
        timestamp: Date.now()
      });
      this.scrollToBottom();
    },
    sendMessage() {
      console.log("send");
      let hasContent = /\w/;
      if (!hasContent.test(this.textField)) return;
      this.conversation.push({
        text: this.textField,
        fromUser: true,
        timestamp: Date.now()
      });
      this.textField = "";
      this.scrollToBottom();
      this.generateResponse();
    },
    scrollToBottom() {
      let { messages } = this.$refs;
      setTimeout(() => {
        messages.scrollTo({
          top: messages.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
      }, 500);
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  width: 100%;
}

#app {
  /*COLOR GUIDE*/
  --dark: #3b3b3b;
  --base: #419bc6;
  --accent: #76d3ff;
  --light: white;
  --secondary: #a3a3a3;

  font-family: "Karla", Helvetica, Arial, sans-serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  height: 100%;
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    background: white;
    width: 100%;
    height: 100%;
    max-width: 750px;
    padding: 15px 30px;
    margin: 0 auto;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.158);

    .prompter {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .messages {
      height: 100%;
      overflow-y: scroll;
    }
  }
}

h1 {
  font-size: 43px;
}

.message {
  &-enter-active,
  &-leave-active {
    transition: all 0.7s;
  }
  &-enter,
  &-leave-to {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
}
</style>
