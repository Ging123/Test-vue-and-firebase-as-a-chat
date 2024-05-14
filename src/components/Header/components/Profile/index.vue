<template>
  <div :class="$style.container">
    <UserCircleIcon @click="open" class="opacity-effect"/>
    
    <PopUp v-if="isOpen" :close="close">
      <div :class="`${$style.items} opacity-effect`" @click="logout">
        <PowerIcon/>
        <p>Logout</p>
      </div>  
    </PopUp>

  </div>
</template>

<script>
  import { UserCircleIcon, PowerIcon } from "@heroicons/vue/24/solid";
  import PopUp from "@/components/PopUp/Primary";
  
  import api from "@/services/api";
  
  export default {
    name:"HeaderProfile",
    components:{
      UserCircleIcon,
      PowerIcon,
      PopUp
    },
    data() {
      return {
        isOpen:false,
      }
    },
    methods: {
      async logout() {
        await api.logout();
        this.$router.push("/");
      },
      close() {
        this.isOpen = false;
      },
      open() {
        this.isOpen = true;
      }
    }
  }
</script>

<style module>

  .container {
    position:relative;
    z-index:1;
  }

  .items {
    align-items:center;
    display:flex;
    color:white;
    gap:10px;
  }

  .items svg {
    width:25px !important;
  }

</style>