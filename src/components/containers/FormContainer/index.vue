<template>
  <div class="container">
    <div class="content-container">
      <h1>
        {{ title }}
      </h1>
      <form @submit.prevent="submit">
        <slot />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name:"ActionContainer",
  props:[ "image", "center", "title", "submit" ]
}
</script>

<style scoped>
  .container {
    border-radius:8px;
    color:white;
    padding:10px;
    position:relative;
    width:100%;
  }

  .content-container {
    position:relative;
    z-index:3;
  }

  h1 {
    text-align:center;
  }

  @media (min-width:550px) {
    .container {
      border:4px solid var(--primary);
      max-width:500px;
      padding:50px;
    }
  }

</style>