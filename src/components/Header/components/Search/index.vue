<template>
  <div>
    <MagnifyingGlassIcon class="opacity-effect" @click="openModal"/>
    
    <Modal 
      :visibility="modalIsOpen" 
      :close="closeModal" 
      :className="`${$style.container} custom-scroll`" 
      maxHeight="400px"
    >
      <Input 
        v-if="!loading"
        :class="$style.passwordInput"
        @keyup.enter="searchUser"
        type="text"
        placeholder="Type a name and hit enter to search"
        id="search"
        :value="search"
        :change="updateInput"
        required
        notRounded
      />

      <div v-if="loading" :class="$style.loading">
        Loading...
      </div>

      <div v-else-if="usersFound.length === 0 && !loading" :class="$style.not_user_found">
        Not user was found with this name
      </div>

      <div v-else-if="usersFound.length > 0 && !loading" :class="$style.users_found_container">
        <div 
          :class="$style.user_found_container" 
          v-for="(user, index) in usersFound" 
          :key="index"
        >
          <div :class="$style.user_info_container">
            <img
              :alt="`${user.name}'s photo`"
              :src="user.profileImage || defaultImage"
            >
            <div :class="$style.user_info">
              <p :class="$style.username">
                {{ user.name }}
              </p>
              <p v-if="user.isFriend" :class="$style.name">
                Friend
              </p>
            </div>
          </div>

          <div v-if="!user.isFriend">
            <UserPlusIcon class="opacity-effect" @click="addFriend(user.id)"/>
          </div>
        </div>
      </div>

    </Modal>


  </div>
</template>

<script>

  import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
  import { UserPlusIcon } from "@heroicons/vue/24/solid";

  import Input from "@/components/inputs/primary";
  import Modal from "@/components/Modal";

  import api from "@/services/api";

  export default {
    name:"HeaderSearch",

    data() {
      return {
        defaultImage:"https://1.gravatar.com/avatar/d1ca18cecaa470117672980092647dfe?s=100&d=mm&r=g",
        modalIsOpen:false,
        search:"",
        loading:false,
        oldSearch:"",
        usersFound:[]
      }
    },
    methods: {
      openModal() {
        this.modalIsOpen = true;
      },
      closeModal() {
        this.modalIsOpen = false;
      },
      updateInput(e) {
        this.search = e.target.value;
      },

      async addFriend(friendId) {
        const usersAreFriends = await api.usersAreFriend(friendId);
        const alreadyRequestToBeFriend = await api.userAlreadyRequestToBeFriend(friendId);

        if(usersAreFriends || alreadyRequestToBeFriend) return;
        await api.createFriendRequest(friendId);        
      },

      async searchUser() {
        if(this.oldSearch === this.search) return;
        this.loading = true;   

        const userData = await api.getUserData();
        let users = await api.searchUser(this.search);

        const userId = userData.uid;
        this.usersFound = [];

        // Remove the searcher if found him
        users = users.filter((user) => user.id !== userId);

        users = await api.validateWhoIsAddedAsFriend(users);
        this.usersFound = users;

        this.oldSearch = this.search;
        this.loading = false;
      }
    },
    components:{
      MagnifyingGlassIcon,
      Modal,
      Input,
      UserPlusIcon
    }
  }

</script>

<style module>

  .not_user_found {
    color:gray;
    text-align:center;
    margin-top:20px;
  }

  .loading {
    color:var(--primary);
    padding:20px;
    text-align: center;
    font-size:1.4rem;
  }


  .users_found_container {
    display:flex;
    flex-direction:column;
    gap:20px;
    margin-top:40px;

  }

  .user_found_container {
    align-items:center;
    display:flex;
    gap:10px;
    justify-content:space-between;
  }

  .user_info_container {
    align-items:center;
    display:flex;
    gap:10px;
  }

  .user_found_container img {
    border:2px solid var(--primary);
    width:40px;
    height:40px;
    border-radius:100px;
  }

  .user_info {
    display:flex;
    flex-direction:column;
    gap:4px;
  }

  .user_info p {
    margin:0;
    padding:0;
  }

  .username {
    color:var(--primary);
    font-size:16px;
  }

  .name {
    color:white;
    font-size:14px;
  }

</style>