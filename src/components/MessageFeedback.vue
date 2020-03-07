<template>
  <div class="feedback" :class="{show: isShown}">
    <tooltip description="Question Answered">
      <svg width="33" height="32" xmlns="http://www.w3.org/2000/svg" @click="sendFeedback(true)">
        <g id="thumbs-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Path" stroke="#76D3FF" stroke-width="2.275">
            <path
              d="M20.92 28.945s-1.051.384-4.204.384c-3.154 0-4.862-1.051-6.307-2.102H6.204A4.204 4.204 0 012 23.022V19.87a4.204 4.204 0 014.204-4.204h1.971a2.125 2.125 0 001.798-1.012s.567-1.235 2.275-4.193c1.708-2.958 4.993-7.409 5.519-8.46C19.672 2 20.592 3.445 20 5.134c-.675 1.931-1.557 3.573-1.804 5.722-.035.314.207.788.523.788l8.508.67"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M27.227 16.65l-5.256-.131c-1.314-.121-2.102-.815-2.102-1.971h0c0-1.157.92-1.895 2.102-1.971l5.256-.263c1.156 0 2.102 1.077 2.102 2.234v.01a2.102 2.102 0 01-2.102 2.092zM29.329 20.92l-7.358-.131c-1.182-.055-2.102-.816-2.102-1.971h0c0-1.157.92-1.896 2.102-1.971l7.358-.131a2.109 2.109 0 012.102 2.102h0a2.109 2.109 0 01-2.102 2.102zM26.176 29.329l-4.205-.197c-1.38-.12-2.102-.749-2.102-1.905h0c0-1.156.946-1.971 2.102-1.971l4.205-.131a2.108 2.108 0 012.102 2.102h0a2.108 2.108 0 01-2.102 2.102zM28.278 25.125l-6.307-.132c-1.248-.055-2.102-.814-2.102-1.97h0c0-1.157.854-1.895 2.102-1.972l6.307-.13a2.108 2.108 0 012.102 2.101h0a2.108 2.108 0 01-2.102 2.103z"
            />
          </g>
        </g>
      </svg>
    </tooltip>
    <tooltip description="Not Quite">
      <svg width="33" height="32" xmlns="http://www.w3.org/2000/svg" @click="sendFeedback(false)">
        <g id="thumbs-down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Path" stroke="#76D3FF" stroke-width="2.275">
            <path
              d="M12.511 2.384S13.562 2 16.716 2c3.153 0 4.861 1.051 6.306 2.102h4.205a4.204 4.204 0 014.204 4.205v3.153a4.204 4.204 0 01-4.204 4.205h-1.971a2.125 2.125 0 00-1.798 1.011s-.567 1.235-2.275 4.193c-1.708 2.958-4.993 7.409-5.518 8.46-1.906 0-2.825-1.445-2.234-3.134.675-1.931 1.558-3.573 1.804-5.722.035-.314-.206-.788-.526-.788l-8.505-.67"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.204 14.68l5.256.13c1.314.121 2.102.815 2.102 1.971h0c0 1.157-.92 1.895-2.102 1.971l-5.256.263c-1.156 0-2.102-1.077-2.102-2.234v-.01a2.102 2.102 0 012.102-2.092zM4.102 10.409l7.358.131c1.183.056 2.102.816 2.102 1.971h0c0 1.157-.92 1.896-2.102 1.971l-7.358.131A2.109 2.109 0 012 12.511h0a2.109 2.109 0 012.102-2.102zM7.256 2l4.204.197c1.38.121 2.102.749 2.102 1.905h0c0 1.156-.946 1.971-2.102 1.971l-4.204.131a2.108 2.108 0 01-2.103-2.102h0A2.108 2.108 0 017.256 2zM5.153 6.204l6.307.132c1.248.055 2.102.814 2.102 1.97h0c0 1.157-.854 1.895-2.102 1.972l-6.307.13a2.108 2.108 0 01-2.102-2.101h0a2.108 2.108 0 012.102-2.103z"
            />
          </g>
        </g>
      </svg>
    </tooltip>
  </div>
</template>

<script>
import Tooltip from "@/components/Tooltip";
import { delay } from "@/modules/animation";
export default {
  components: {
    Tooltip
  },
  data() {
    return {
      isShown: false
    };
  },
  methods: {
    async sendFeedback(isPositive) {
      this.isShown = false;
      await delay(700);
      this.$emit("feedback", isPositive);
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShown = true;
    }, 1000);
  }
};
</script>

<style lang="scss">
.feedback {
  display: flex;
  opacity: 0;
  align-items: center;
  transition: opacity 0.7s;
  pointer-events: none;

  &.show {
    opacity: 1;
    pointer-events: all;
  }

  .tooltip {
    margin: 0 10px;
    img {
      width: 30px;
    }
  }
  #thumbs-up #Path:active,
  #thumbs-down #Path:active {
    fill: #76d3ff;
  }
}
</style>