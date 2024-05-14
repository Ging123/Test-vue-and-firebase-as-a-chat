<template>
  <div class="container" :style="`background-image:url('${require('@/assets/images/' + image)}');`">
    <div class="dark-layer"/>
    <div class="children" :class="center ? 'container center' : 'container'">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name:"ActionContainer",
  props:[ "image", "center" ]
}
</script>

<style scoped>
  .container {    
    object-position:center;
    background-size: cover;
  }

  .center {
    align-items: center;
    justify-content: center;
    display:flex;
  }

  .dark-layer {
    background:#000000e3;
    position:absolute;
    width:100%;
    height:100%;
    z-index:1;
  }

  .children {
    width:100%;
    height:100vh;
    position:relative;
    z-index:2;
  }
</style>