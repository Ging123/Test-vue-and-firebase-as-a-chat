<template>
  <div class="container">

    <div class="chat-box custom-scroll" v-if="friendId">
      
      <div class="header">

        <img
          alt="a user's profile picture"
          height="50"
          :src="require('@/assets/images/login-bg.webp')"
          width="50"
        />

        <div class="info" title="test">
          <p class="username" title="test">test</p>
          <p class="name" title="test test">test test</p>
        </div>

      </div>

      <div class="message-container">
        <div 
          v-for="(item, index) in messages" 
          :class="item.owner === 'you' ? 'message sent-message' : 'message received-message'" 
          :key="index"
        >
          <p>
            {{ item.message }}
          </p>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" v-if="friendId">
      <Input
        placeholder="Send a message"
        :value="text"
        :change="updateText"
      />
    </form>

    <div class="no-friends-container" v-else>
      <UserMinusIcon class="user-minus-icon"/>

      <h2 class="title">
        You don't have any friend yet, {{ userData ? userData.displayName : "" }}
      </h2>
      <p class="no-friend-text">
        You can add by clicking our search icon and try typing their name
      </p>
    </div>

  </div>
</template>

<script>

  import { UserMinusIcon } from "@heroicons/vue/24/solid";
  import Input from "@/components/inputs/primary";
  
  import api from "@/services/api";

  export default {
    name:"DefaultChat",
    data() {
      return {
        text:"",
        messages:[
          // { message:"Hii how are u", owner:"other" },
          // { message:"I'm fine!", owner:"you" }
        ],
        userData:null
      }
    },
    async created() {
      this.userData = await api.getUserData();
    },
    props: {
      friendId:String
    },
    methods:{
      sendMessage() {
        this.messages.push({ message:this.text, owner:"you" });
        this.text = "";
      },
      updateText(e) {
        this.text = e.target.value;
      }
    },  
    components: {
      Input,
      UserMinusIcon
    }
  }

</script>

<style scoped>

  .header {
    align-items:center;
    display:flex;
    gap:15px;
    padding:20px 40px;
    margin-bottom:40px;
    border-bottom:1px solid var(--primary);
  }

  .header p {
    margin:0;
  }

  .no-friends-container {
    display:flex;
    flex-direction:column;
    height:100%;
    align-items:center;
    justify-content:center;
    padding:20px;
  }

  .user-minus-icon {
    fill:var(--primary);
    width:100px;
  }

  .title {
    color:var(--primary);
    font-size:40px;
    max-width:400px;
    text-align:center;
  }

  .no-friend-text {
    color:white;
    font-size:18px;
    max-width:700px;
    text-align:center;
  }

  .username {
    color:var(--primary);
    font-size:20px;
  }

  .name {
    color:white;
    font-size:14px;
  }

  .header img {
    border-radius:100px;
    border:2px solid var(--primary);
  }

  .container {
    display:flex;
    flex-direction:column;
    padding:40px;
    gap:20px;
    height:100%;
    justify-content:space-between;
    width:100%;
  }

  .chat-box {
    border:1px solid var(--primary);
    border-radius:8px 0px 0px 8px;
    height:100%;
    max-height:90%;
    overflow-x:hidden;
    overflow-y:auto;
  }

  .message-container {
    gap:20px;
    height:100%;
    padding:0px 40px 40px;
    width:100%;
  }

  .message {
    display:flex;
    margin-bottom:25px;
  }

  .message p {
    border-radius:8px;
    color:white;
    font-weight:700;
    display:inline-block;
    max-width:300px;
    word-break: break-all;
    font-size:18px;
    padding:10px 20px;
    margin:0;
  }

  .sent-message {
    justify-content:flex-end;
  }

  .received-message p {
    background:var(--received-message);
  }

  .sent-message p {
    background:var(--sent-message);
  }

</style>