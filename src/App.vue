<template>
  <Header v-if="isChatPage" /> 
  <router-view/>
</template>

<script>
  import Header from "./components/Header/";

  export default {
    computed:{
      isChatPage() {
        return this.$route.path === "/chat";
      }
    },
    components: {
      Header
    }
  }
</script>

<style lang="scss">

  * {
    box-sizing:border-box;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  :root {
    --primary:#00A3A3;
    --sent-message:#016c6c;
    --main-bg:#333;
    --received-message:#3e3e3e;
    --header-height:70px;
    --modal-index:99;
  }

  body {
    background:var(--main-bg);
    padding:0;
    margin:0;
  }

  a {
    text-decoration:none;
    color:white;
  }

  .opacity-effect {
    cursor:pointer;
  }

  .opacity-effect:active {
    opacity: .6;
  }

  .opacity-effect:hover {
    opacity:.8;
  }

  .custom-scroll {
    overflow-y:auto;
    overflow-x:hidden;
  }

  .custom-scroll::-webkit-scrollbar {
    width: 10px;
  }

  .custom-scroll::-webkit-scrollbar-track {
    background: white;
  }

  .custom-scroll::-webkit-scrollbar-thumb {
    background: var(--primary);
  }

</style>