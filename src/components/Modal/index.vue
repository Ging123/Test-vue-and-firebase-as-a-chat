<template>
  <div v-if="visibility">
    <div :class="$style.modal_overlay" @click="close"></div>
    <div :class="`${$style.modal_content} ${className}`" :style="`max-width:${maxWidth};max-height:${maxHeight}`">
      <slot></slot> 
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomModal",
  props: {
    close: {
      type: Function,
      required: true
    },
    maxHeight:{
      type:String,
      required:false
    },
    maxWidth:{
      type:String,
      required:false
    },
    className:{
      type:String,
      required:false,
      default:""
    },
    visibility: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style module>
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:var(--modal-index);
}

.modal_content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--main-bg);
  border:2px solid var(--primary);
  padding: 20px;
  border-radius: 8px;
  width:100%;
  max-width:600px;
  z-index: calc(var(--modal-index) + 1);
}
</style>
