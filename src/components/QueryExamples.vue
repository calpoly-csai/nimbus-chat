<template>
  <div class="query-examples">
    <h2>Stuff Nimbus Knows</h2>
    <ion-icon
      class="close-icon"
      name="close-circle"
      @click="requestClose">
    </ion-icon>
    <ul class="example-list">
      <li
        v-for="example in examples"
        @click="selectExample"
        class="example"
        :key="example"
      >{{example}}</li>
    </ul>
  </div>
</template>

<script>
import examples from "@/modules/query-examples.js";
export default {
  data() {
    return {
      examples: examples
    };
  },
  methods: {
    selectExample(e) {
      this.$emit("select", e.target.innerText);
    },
    requestClose() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.query-examples {
  z-index: 7;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--base);
  color: white;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  h2 {
    text-align: center;
  }
  .close-icon {
    position: fixed;
    top: 0;
    font-size: 2em;
    cursor: pointer;
    padding: 5px;
  }
  .example-list {
    list-style: none;
    max-width: 400px;
    margin: auto;
    .example {
      cursor: pointer;
      padding: 20px 0;
    }
  }
}
</style>
