<template>
  <nav class="nav-bar">
    <img class="icon" src="@/assets/help.svg" alt="help" @click />
  </nav>
</template>

<script>
import Tooltip from "@/components/Tooltip";
export default {
  components: {
    Tooltip
  }
};
</script>

<style lang="scss">
.nav-bar {
  text-align: right;
  .icon {
    cursor: pointer;
    height: 45px;
  }
}
</style>