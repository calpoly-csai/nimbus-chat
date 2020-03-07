<template functional>
  <div class="typing-indicator" key="typing">
    <svg width="80" height="50" xmlns="http://www.w3.org/2000/svg">
      <g id="cloud" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Cloud" transform="translate(1 2)" fill="#419bc6">
          <ellipse cx="5.4" cy="24" rx="5.4" ry="4.8" />
          <ellipse cx="13.8" cy="19.2" rx="9" ry="9.6" />
          <ellipse cx="27" cy="24" rx="9" ry="9.6" />
          <ellipse cx="40.2" cy="24" rx="9" ry="9.6" />
          <circle cx="26.4" cy="14.4" r="14.4" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.typing-indicator {
  $anim-duration: 2s;

  svg {
    ellipse {
      $num-ellipses: 4;
      animation: float $anim-duration infinite ease-in-out;
      @for $i from 1 through $num-ellipses {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.09s;
        }
      }
    }
    circle {
      animation: float-circle $anim-duration infinite ease-in-out;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-2%);
    }
    80% {
      transform: translateY(15%);
    }
  }

  @keyframes float-circle {
    0%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-2%);
    }
    80% {
      transform: translateY(11%);
    }
  }
}
</style>