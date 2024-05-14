<template>
  <div :class="$style.container">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: "PopUpPrimary",
    data() {
      return {
        hasBeingOpen:false,
      }
    },
    methods: {
      registerOpen() {
        this.hasBeingOpen = true;
      }
    },
    props: {
      isOpen: Boolean,
      close: Function
    },

    mounted() {
      setTimeout(() => {
        document.addEventListener('click', this.close);
      }, 100);
    },

    beforeUnmount() {
      document.removeEventListener('click', this.close);
    }
  };

</script>

<style module>
.container {
  border-radius: 3px;
  background: var(--main-bg);
  border: 1px solid var(--primary);
  width: 220px;
  top: 100%;
  right: 0px;
  padding: 10px;
  position: absolute;
}
</style>
