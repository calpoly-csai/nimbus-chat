<template>
  <div class="prompter">
    <img src="@/assets/nimbus-logo.png" />
    <h2>Hi there</h2>
    <div class="actions">
      <p class="current-action" ref="currentAction">{{ action }}</p>
      <p class="next-action" ref="nextAction">{{ nextAction }}</p>
    </div>
  </div>
</template>

<script>
import { animateEl } from "@/modules/animation";
export default {
  data() {
    return {
      index: 0,
      actionInterval: -1,
      intersectionOptions: {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0]
      },
      suggestions: [
        "Thanks for trying Nimbus Chat! Ask our bot something about Cal Poly.",
        "What should I take after CPE 202?",
        "What is CSAI?",
        "What is your purpose?",
        "Where is my professor now?"
      ]
    };
  },
  computed: {
    action() {
      return this.suggestions[this.index];
    },
    nextAction() {
      return this.suggestions[(this.index + 1) % this.suggestions.length];
    }
  },
  methods: {
    cycleActions() {
      clearInterval(this.actionInterval);
      this.actionInterval = setInterval(this.incrementAction, 2000);
    },
    async incrementAction() {
      animateEl(this.$refs.currentAction, "exit");
      await animateEl(this.$refs.nextAction, "enter");
      this.index = (this.index + 1) % this.suggestions.length;
    }
  },
  mounted() {
    // this.cycleActions();
  },
  beforeDestroy() {
    clearInterval(this.actionInterval);
  }
};
</script>

<style lang="scss">
.prompter {
  margin: 30px auto;
  text-align: center;
  color: var(--dark);
  img {
    height: 70px;
  }

  .actions {
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 350px;
  }

  .current-action {
    margin: auto;
    &.exit {
      animation: exit 1s ease-in-out;
    }
  }

  .next-action {
    pointer-events: none;
    opacity: 0;

    transition: flex 0.5s;

    &.enter {
      animation: enter 1s ease-in-out;
    }
  }

  @keyframes enter {
    0%,
    20% {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translateY(-100%);
    }
  }

  @keyframes exit {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
}
</style>
