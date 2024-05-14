<template>
  <button 
    :class="`button ${className || ''} ${styleType === 'no-bg' ? 'no-bg' : '' }`" 
    :disabled="loading" 
    @click="handleClick" 
    :type="type"
  >
    <span v-if="loading">Loading...</span>
    <span v-else>{{ content }}</span>
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",

  props: {
    content: String,
    className: String,
    styleType: String,
    type: {
      type: String,
      default: "button"
    },
    loading: Boolean, // New prop for indicating loading state
    click: Function
  },

  methods: {
    handleClick() {
      if (!this.loading && this.click) {
        this.click();
      }
    }
  }
};
</script>

<style scoped>
button {
  background: var(--primary);
  border: none;
  border-radius: 100px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  padding: 12px 10px;
  width: 100%;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button.no-bg {
  background:transparent;
  border:2px solid var(--primary);
}

</style>
