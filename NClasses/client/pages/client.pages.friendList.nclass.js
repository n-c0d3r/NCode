[Render("nf-js")]

[NClass("friendList")]

class{
    constructor(){}

    SetUp(){
        
    }

    Start(){
        this.server__GetFriendList();
    }
    
    server__GetFriendList(client_socket){
        var friendList=[];

        

        this.client__SetFriendList(friendList,client_socket);
    }

    client__SetFriendList(friendList){
    }

}