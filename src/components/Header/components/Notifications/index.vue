<template>
  <div :class="$style.container">
    <BellAlertIcon 
      v-if="hasNotification" 
      class="opacity-effect" 
      @click="open"
    />
    <BellIcon 
      v-else 
      class="opacity-effect" 
      @click="open"
    />

    <PopUp v-if="isOpen" :close="close">

      <div :class="`${$style.item_container}`" v-if="friendsRequests.length > 0">
        <div :class="$style.items" v-for="(frindRequest, index) in friendsRequests" :key="index">
          <div :class="$style.friend_request_content">
            <img
              :alt="`${frindRequest.name}'s photo`"
              :class="$style.friend_request_image"
              :src="frindRequest.profileImage || defaultImage"
            >
            <p>
              {{ frindRequest.whoRequestName }}
            </p>
          </div>
          <div>
            <PlusIcon :class="`${$style.plus} opacity-effect`" @click="addFriend(frindRequest)" />
            <XMarkIcon :class="`${$style.close} opacity-effect`"/>
          </div>
        </div>
      </div>

      <p :class="$style.notification_message" v-else>
        No notification
      </p>

    </PopUp>
  </div>
</template>

<script>

  import { BellIcon, BellAlertIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
  import PopUp from "@/components/PopUp/Primary";

  import api from "@/services/api";

  export default {
    name:"HeaderNotifications",

    data() {
      return {
        defaultImage:"https://1.gravatar.com/avatar/d1ca18cecaa470117672980092647dfe?s=100&d=mm&r=g",
        isOpen:false,
        hasNotification:false,
        friendsRequests:[]
      }
    },

    created() {
      const setHasNotify = (status) => this.hasNotification = status; 
      const setFriendsRequests = (requests=[]) => this.friendsRequests = requests;

      api.startNotification(setHasNotify, setFriendsRequests);
    },

    methods: {
      async open() {
        this.isOpen = true;
        this.status = false;
        await api.markFriendsRequestsAsSeen();
      },
      
      async addFriend(friendRequest) {
        await api.addAsFriend(friendRequest.id);
        await api.removeFriendRequestRequest(friendRequest.whoRequest);
      },

      close() {
        this.isOpen = false;
      },
    },

    components:{
      BellIcon,
      BellAlertIcon,
      PopUp,
      PlusIcon,
      XMarkIcon
    }
  }

</script>

<style module>

  .container {
    position:relative;
    z-index:1;
  }

  .item_container {
    display:flex;
    flex-direction:column;
    gap:10px;
  }

  .items {
    align-items:center;
    display:flex;
    color:white;
    justify-content:space-between;
  }

  .friend_request_content {
    align-items:center;
    display:flex;
    gap:10px;
  }

  .items p {
    font-size:14px;
    max-width:100px;
  }

  .plus, .close {
    height:20px !important;
  }

  .plus {
    fill:#00A3A3;
  }

  .close {
    fill:red;
  }

  .friend_request_image {
    border:2px solid var(--primary);
    border-radius:100px;
    width:30px;
    height:30px;
  }

  .notification_message {
    color:gray;
    text-align:center;
  }

</style>