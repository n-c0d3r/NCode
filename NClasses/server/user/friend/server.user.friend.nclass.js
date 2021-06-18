[Render("nf-js")]

[NClass("friend")]

class{
    constructor(){}

    SetUp(){
        this.serverDataNClass=framework.ImportNClass("server.user.data");
    }

    async SetUpFriendList(){
        
    }

    Start(){
        
    }

    SendFriendRequest(uid,targetUid){
        var users=this.serverDataNClass.users;
        var user=users[uid];
        var targetUser=users[targetUid];
        var friendRequest={
            'uid':uid,
            'target':targetUid
        }
        user.friendRequests[targetUid]=friendRequest;
        targetUser.friendRequests[uid]=friendRequest;
        this.SaveData();
    }

    ApplyFriendRequest(uid,targetUid){
        var users=this.serverDataNClass.users;
        var user=users[uid];
        var targetUser=users[targetUid];
        var friendRequest=user.friendRequests[targetUid]
        delete user.friendRequests[targetUid];
        delete targetUser.friendRequests[uid];
        user.friends[targetUid]=true;
        targetUser.friends[uid]=true;
        this.SaveData();
    }

    Unfriend(uid,targetUid){
        var users=this.serverDataNClass.users;
        var user=users[uid];
        var targetUser=users[targetUid];
        delete user.friends[targetUid];
        delete targetUser.friends[uid];
        this.SaveData();
    }

    DeclineFriendRequest(uid,targetUid){
        var users=this.serverDataNClass.users;
        var user=users[uid];
        var targetUser=users[targetUid];
        delete user.friendRequests[targetUid];
        delete targetUser.friendRequests[uid];
        this.SaveData();
    }

    SaveData(){
        this.serverDataNClass.SaveUsersData();
    }



}