import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence  } from "firebase/auth";
import { updateProfile } from "firebase/auth";

import RealtimeDb from "./realtimedb";

const auth = getAuth();

const api = {

  // see more here https://firebase.google.com/docs/auth/web/manage-users and https://firebase.google.com/docs/auth/web/password-auth
  async createNewUser(user) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      
      await updateProfile(auth.currentUser, {
        displayName:user.name
      });

      const uid = userCredential.user.uid;

      await this.login(user.email, user.password);
      await RealtimeDb.saveUserData(user.name, uid);

      return true;
    }
    catch(err) {
      return err;
    }
  },


  async login(email, password) {
    try {
      await auth.setPersistence(browserSessionPersistence);
    
      const expirationDurationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      await auth.setPersistence(browserSessionPersistence, { expiresIn: expirationDurationMs });

      await signInWithEmailAndPassword(auth, email, password);
      return true;
    }
    catch(err) {
      return err;
    }
  },


  async searchUser(query) {
    try {
      return await RealtimeDb.searchUser(query)
    }
    catch(err) {
      console.error("Error in search function in the api:", err);
    }
  },


  async getUserData() {
    try {
      await new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe(); 
          resolve(user);
        });
      });
  
      const user = auth.currentUser;
      if (user) return user;
    } 
    catch (err) {
      console.error("Error in getUserData:", err);
    }
  },


  async addAsFriend(newFriendId) {
    try {
      const userId = auth.currentUser.uid;
      await RealtimeDb.addFriend(userId, newFriendId);
    }
    catch(err) {
      console.log("Error in addAsFriend:", err);
    }
  },


  async createFriendRequest(friendId) {
    try {
      const userId = auth.currentUser.uid;
      const name = auth.currentUser.displayName;
      await RealtimeDb.createFriendRequest(userId, friendId, name);
    }
    catch(err) {
      console.log("Error in createFriendRequest:", err);
    }
  },


  async removeFriendRequestRequest(whoAskId) {
    try {
      const userId = auth.currentUser.uid;
      await RealtimeDb.removeFriendRequest(userId, whoAskId);
    }
    catch(err) {
      console.log("Error in removeFriendRequestRequest:", err);
    }
  },


  async userAlreadyRequestToBeFriend(friendId) {
   try {
    const userId = auth.currentUser.uid;
    const friendRequests = await RealtimeDb.getSortedBy("friends_requests");

    for(const request of friendRequests) {
      if(request.id === userId && request.whoRequest === friendId) return true;
    }

    return false;
   } 
   catch (err) {
    console.log("Error in userAlreadyRequestToBeFriend:", err);
   }
  },


  async usersAreFriend(friendId) {
    try {
      const userId = auth.currentUser.uid;
      const friends = await RealtimeDb.getSortedBy("friends");
      return validateIfUsersAreFriends(friends, userId, friendId);
    }
    catch(err) {
      console.log("Error in usersAreFriend:", err);
    }
  },


  async logout() {
    try {
      await auth.setPersistence(browserSessionPersistence);
      await auth.signOut();
    } 
    catch (err) {
      console.error("Error during logout:", err);
    }
  },


  async listenUserFriends(setFriends) {
    try {
      const userId = auth.currentUser.uid;
      await RealtimeDb.listenUserFriends(userId, setFriends);
    }
    catch(err) {
      console.error("Error during listenFriends:", err);
    }
  },


  async validateWhoIsAddedAsFriend(users=[]) {
    try {
      const friends = await RealtimeDb.getSortedBy("friends");
      const userId = auth.currentUser.uid;

      const newUserData = [];

      users.forEach((user) => {
        newUserData.push({
          ...user,
          isFriend:validateIfUsersAreFriends(friends, userId, user.id)
        });
      });

      return newUserData;
    }
    catch(err) {
      console.error("Error during validateWhoIsAddedAsFriend:", err);
    }
  },


  async startNotification(setHasNotify, setFriendsRequests) {
    const userId = auth.currentUser.uid;
    await RealtimeDb.listenAndNotifyFriendsRequests(userId, setHasNotify, setFriendsRequests);
  },


  async markFriendsRequestsAsSeen() {
    try {
      const userId = auth.currentUser.uid;
      await RealtimeDb.seeFriendsRequests(userId);
    }
    catch(err) {
      console.error("Error during markFriendsRequestsAsSeen:", err);
    }
  } 

}


function validateIfUsersAreFriends(friends, userId, friendId) {
  for(const friend of friends) {
    const alreadyAreFriends = friend.reletionIds.includes(userId) && friend.reletionIds.includes(friendId);
    if(alreadyAreFriends) return true;
  }

  return false;
}

export default api;