import { getDatabase, set, push, ref, orderByChild, query, get, startAt, endAt, onValue, update, remove } from "firebase/database";
import { app } from "@/firebase";

const db = getDatabase(app);

const RealtimeDb = {

  //SEE MORE HERE https://firebase.google.com/docs/database/web/read-and-write
  async saveUserData(name, id) {
    try {
      const usersRef = ref(db, "users");
      const newUserRef = push(usersRef);

      await set(newUserRef, {
        id,
        name,
      });
    }
    catch(err) {
      console.log(err);
    }
  },


  async listenUserFriends(userId, setFriends) {
    const friendsRequestsRef = ref(db, "friends");
    const friendsRequestsQuery = query(friendsRequestsRef, orderByChild("id"));

    const userRef = ref(db, "users");
    const userQuery = query(userRef, orderByChild("name"));

    const usersSnapshot = await get(userQuery);

    onValue(friendsRequestsQuery, (snapshot) => {
      const userFriends =[];
      const allFriendsRelations = getSnapshotAsArray(snapshot);

      const users = getSnapshotAsArray(usersSnapshot);

      for(const friend of allFriendsRelations) {
        if(friend.reletionIds.includes(userId)) this._addUserIfHeIsFriend(friend, users, userFriends);
      }

      setFriends(userFriends);
    });
  },


  _addUserIfHeIsFriend(friend, users, userFriends) {
    for(const user of users) {
      if(friend.reletionIds.includes(user.id)) {
        userFriends.push(user)
      }
    }
  },


  async listenAndNotifyFriendsRequests(userId, setHasNotify, setFriendsRequests) {
    const friendsRequestsRef = ref(db, "friends_requests");
    const friendsRequestsQuery = query(friendsRequestsRef, orderByChild("id"));

    onValue(friendsRequestsQuery, (snapshot) => {
      const friendsRequests = getSnapshotAsArray(snapshot);
      const requests = [];

      let didntSee = false;

      for(const friendRequest of friendsRequests) {
        const isARequestForThisUser = friendRequest.id === userId;
        const userHasNotSeenRequest = isARequestForThisUser && !friendRequest.seen;

        if(isARequestForThisUser) requests.push(friendRequest);
        
        if(userHasNotSeenRequest) {
          setHasNotify(true);
          didntSee = true;
        }
      }

      if(!didntSee) setHasNotify(false);
      setFriendsRequests(requests);
    });
  },


  async seeFriendsRequests(userId) {
    const friendsRequestsRef = ref(db, "friends_requests");
    const friendsRequestsQuery = query(friendsRequestsRef, orderByChild("id"));
    
    const snapshot = await get(friendsRequestsQuery);
    const friendsRequests = getSnapshotAsArray(snapshot);

    // Loop through all friend requests and mark those related to the userId as seen
    friendsRequests.forEach(async (friendRequest) => {
      if (friendRequest.id === userId && !friendRequest.seen) {
        const childRef = ref(db, `friends_requests/${friendRequest.key}`);
        await update(childRef, { seen: true });
      }
    });
  },


  async addFriend(userId, friendId) {
    const friendsRef = ref(db, "friends");
    const newFriendRef = push(friendsRef);
    
    let friendsId = generateFriendId(userId, friendId);

    await set(newFriendRef, {
      id:friendsId,
      reletionIds:[ userId, friendId ]
    });
  },


  async createFriendRequest(userId, userWhoWasRequested, name) {
    const friendsRequestRef = ref(db, "friends_requests");
    const newFriendsRequestRef = push(friendsRequestRef);

    await set(newFriendsRequestRef, {
      id:userWhoWasRequested,
      whoRequest:userId,
      seen:false,
      whoRequestName:name
    });
  },

  async removeFriendRequest(userId, whoAskId) {
    const friendsRequestRef = ref(db, "friends_requests");
    const friendsRequestQuery = query(friendsRequestRef, orderByChild("id"));

    const snapshot = await get(friendsRequestQuery);
    const friendsRequests = getSnapshotAsArray(snapshot);

    for(const request of friendsRequests) {

      if(request.id === userId && request.whoRequest === whoAskId) {
        const requestRef = ref(db, `friends_requests/${request.key}`);
        await remove(requestRef);
      }
    }
  },


  async getSortedBy(refName, orderBy="id") {
    const refData = ref(db, refName);
    const queryData = query(refData, orderByChild(orderBy));
  
    const querySnapshot = await get(queryData);
    const result = getSnapshotAsArray(querySnapshot);
  
    return result;
  },


  async searchUser(searchQuery="") {
    try {
      if(!searchQuery) return [];
      const userRef = ref(db, "users");

      const userQuery = query(userRef, orderByChild("name"), startAt(searchQuery), endAt(searchQuery + "\uf8ff"));
      const querySnapshot = await get(userQuery);

      const users = getSnapshotAsArray(querySnapshot);
      return users;
    }
    catch(err) {
      console.error("Error in search by username function in the real time db:", err);
      return [];
    }
  }
}


function getSnapshotAsArray(querySnapshot) {
  const list = [];

  querySnapshot.forEach((doc) => {
    // Include the unique key from Firebase along with the data
    list.push({
      key: doc.key,
      ...doc.val()
    });
  });

  return list;
}


function generateFriendId(ownerId, friendId) {
  let ids = [ownerId, friendId];
  ids = ids.sort();

  let friendsId = "";
  for(const id of ids) friendsId += id;

  return friendsId;
}

export default RealtimeDb;