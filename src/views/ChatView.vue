<template>
  <div :class="$style.container">
    <FriendLists/>
    <Chat/>
  </div>
</template>

<script>
  import FriendLists from "@/components/Views/Chat/FriendLists";
  import Chat from "@/components/Views/Chat/Chat";

  export default {
    components: {
      FriendLists,
      Chat
    }
  }
</script>

<style module scoped>
  
  .container {
    display: flex;
    height:calc(100vh - var(--header-height));
    margin-top:var(--header-height);
    width:100%;
  }

</style>