[Render("nf-js")]

[Require("fs","fs")]

[NClass("chatrooms")]

class{
    constructor(){}

    SetUp(){
        this.ReadRoomsData();
    }

    Start(){
        
    }

    GetFromFirestore(){

    }

    ReadRoomsData(){
        var fs=modules.fs;
        var path=framework.chatroomsDataDirPath;
        this.rooms=JSON.parse(fs.readFileSync(path).toString());
    }

    CreateRoom(room,id){
        this.rooms[id]=room;
        var usersDataNClass=framework.ImportNClass('server.user.data');
        usersDataNClass.users[room.owner].chatrooms[id]=id;
        this.SaveRoomsData();
    }


    AddParticipantToChatRoom(roomId,uid){
        this.rooms[roomId].participants[uid]=uid;
        var usersDataNClass=framework.ImportNClass('server.user.data');
        usersDataNClass.users[uid].chatrooms[roomId]=roomId;
        this.SaveRoomsData();

    }

    AddComment(comment,id){
        var room = this.rooms[id];
        room.comments.push(comment);
        this.SaveRoomsData();
    }


    SaveRoomsData(){
        var fs=modules.fs;
        var path=framework.chatroomsDataDirPath;
        try{
            var usersDataNClass=framework.ImportNClass('server.user.data');
            usersDataNClass.SaveUsersData();
            fs.writeFileSync(path,JSON.stringify(this.rooms));

        }
        catch{

        }
    }

}