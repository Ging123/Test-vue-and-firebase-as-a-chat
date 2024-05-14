<template>
  <nav class="container custom-scroll">

    <div v-if="friends.length > 0">
      <div class="item opacity-effect" 
        v-for="(item, index) in friends" 
        :key="index" 
        :title="item.name"
      >
        <div>
          <img
            :alt="`${item.name}'s profile picture`"
            :src="require('@/assets/images/login-bg.webp')"
            height="50"
            width="50"
          />
        </div>
        
        <div class="info" :title="item.username">
          <p class="username" :title="item.username">{{ item.username }}</p>
          <p class="name" :title="item.name">{{ item.name }}</p>
        </div>

      </div>
    </div>
    
    <p class="you-dont-have-friends-yet" v-else>
      You don't have any friends yet {{">:)"}}
    </p>
  </nav>
</template>

<script>

  import { duplicateObject } from "@/utils/duplicateObject";
  import api from "@/services/api";

  const friends = [];

  // const mockExample = { username:"test", name:"test o test", online:true };
  // const mockData = duplicateObject(mockExample);

  export default {
    name:"FriendList",
    data() {
      return { friends:friends }
    },
    created() {
      const setFriends = (friends=[]) => this.friends = friends; 
      api.listenUserFriends(setFriends);
    },
    components:{

    }
  }
</script>

<style scoped>

  .container {
    border-right:1px solid var(--primary);
    height:100%;
    width:100%;
    max-width:300px;    
    position:relative
  }


  .item {
    align-items:center;
    border-bottom:1px solid var(--primary);
    gap:15px;
    display:flex;
    padding:10px;
  }

  .item img {
    border-radius:100px;
    border:2px solid var(--primary);
  }

  .info {
    display:flex;
    flex-direction:column;
    gap:5px;
  }

  .username, .name {
    margin:0;
  }

  .username {
    color:var(--primary);
    font-size:20px;
  }

  .name {
    color:white;
    font-size:14px;
  }

  .you-dont-have-friends-yet {
    color:var(--primary);
    position:absolute;
    max-width:200px;
    text-align:center;
    width:100%;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }

</style>