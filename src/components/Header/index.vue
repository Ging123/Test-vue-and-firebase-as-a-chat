<template>
  <header>
    <div class="container">
      <h1 class="opacity-effect">
        <router-link class="title-container" to="/chat">
          <div>YOU</div> 
          <div class="bold">TALK</div>
        </router-link>
      </h1>

      <nav class="action-box">
        <Search/>
        <Notifications/>
        <Profile/>
      </nav>

    </div>
  </header>
</template>

<script>

  import Notifications from "./components/Notifications";
  import Profile from "./components/Profile";

  import Search from "./components/Search";

  export default {
    name:"CustomHeader",
    components: {
      Search,
      Notifications,
      Profile
    }
  }

</script>

<style scoped>

  header {
    background:var(--main-bg);
    border-bottom:1px solid var(--primary);
    padding:0px 20px;
    position:fixed;
    width:100%;
    top:0px;
    left:0px;
  }

  .container {
    align-items:center;
    display:flex;
    justify-content:space-between;
    max-width:1500px;
    height:var(--header-height);
    
    margin:0 auto;
    width:100%;
  }

  h1 {
    margin: 0;
  }

  .title-container {
    align-items:center;
    color:white;
    display:flex;
    gap:5px;
    padding:5px 0;
  }

  h1 .bold {
    color:var(--primary);
  }

  header >>> svg {
    color:white;
    height:30px;
    width:30px;
  }

  .action-box {
    align-items:center;
    display: flex;
    gap:20px;
  }

</style>