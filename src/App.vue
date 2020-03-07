<template>
  <div id="app">
    <div class="content">
      <nav class="nav-bar">
        <img class="icon" src="@/assets/help.svg" alt="help" @click="status = 'suggesting'" />
      </nav>
      <transition name="roll">
        <query-examples v-if="status === 'suggesting'" @select="useExample" />
      </transition>

      <div class="messages" ref="messages">
        <prompter v-if="!conversation.length" />
        <transition-group name="message">
          <Message
            v-for="message in conversation"
            v-bind="message"
            :key="message.timestamp"
            @feedback="sendFeedback($event, message.timestamp)"
          />
          <typing-indicator v-if="status === 'thinking'" />
        </transition-group>
      </div>

      <Composer v-model="textField" @send="sendMessage" ref="composer" />
    </div>
  </div>
</template>

<script>
import QueryExamples from "./components/QueryExamples.vue";
import Message from "./components/Message.vue";
import Composer from "./components/Composer.vue";
import Prompter from "./components/Prompter.vue";
import TypingIndicator from "./components/TypingIndicator.vue";
import axios from "axios";
import { delay } from "./modules/animation";
export default {
  name: "app",
  components: {
    QueryExamples,
    Message,
    Composer,
    Prompter,
    TypingIndicator
  },
  data() {
    return {
      conversation: [],
      textField: "",
      /**The different states of the Chat UI
       * @enum {"chatting", "thinking", "suggesting"}
       */
      status: "chatting"
    };
  },
  methods: {
    async sendMessage() {
      let hasContent = /\w/;
      if (!hasContent.test(this.textField)) return;
      let text = this.textField.trim();
      this.textField = "";
      this.conversation.push({
        text,
        fromUser: true,
        timestamp: Date.now()
      });
      this.status = "thinking";
      this.scrollToBottom();
      let answer;
      try {
        let response = await axios.post("ask", {
          question: text
        });
        answer = response.data.answer;
      } catch (err) {
        console.error(err);
        answer = "I'm sorry, I don't understand. Please try another question.";
      }
      this.status = "chatting";
      this.conversation.push({
        text: answer,
        fromUser: false,
        timestamp: Date.now()
      });

      this.scrollToBottom();
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
    },
    sendFeedback(isPositive, messageTimestamp) {
      if (isPositive) return; //Only dealing with issues right now
      let exchange = [];
      let messageIndex = this.conversation.findIndex(
        message => message.timestamp === messageTimestamp
      );
      if (messageIndex === -1)
        return console.error("Could not locate message for feedback");
      do {
        exchange.unshift(this.conversation[messageIndex]);
        messageIndex--;
      } while (messageIndex >= 0 && this.conversation[messageIndex].fromUser);
      // axios.post("/feedback", exchange);
      console.log("recieved feedback");
    },
    useExample(text) {
      //Not great practice, but its better performance than a watcher
      this.$refs.composer.$refs.messageInput.innerText = text;
      this.textField = text;
      this.status = "chatting";
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
  margin: 0;
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
    position: relative;
    display: flex;
    flex-direction: column;
    background: white;
    width: 100%;
    height: 100%;
    max-width: 750px;
    padding: 15px 30px;
    padding-bottom: 0;
    margin: 0 auto;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.158);

    .nav-bar {
      text-align: right;
      .icon {
        cursor: pointer;
        height: 45px;
      }
    }

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

//ANIMATIONS
//==============================================

.message {
  &-enter-active {
    transition: all 0.7s;
  }
  &-enter {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
}

.roll {
  &-enter-active,
  &-leave-active {
    transition: height 0.7s;
  }
  &-enter,
  &-leave-to {
    height: 0px;
  }
}
</style>
