[Render("nf-js")]

[NClass("chat")]

class{
    constructor(){
        this.clientSockets=new Object();
    }

    SetUp(){
        
    }

    Start(){
        this.SetUpUI();
        var nclass=this;
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                nclass.uid=user.uid;
                nclass.GetChatRooms();
            }
        });
    }

    SetUpUI(){
        var container=document.createElement('div');
        container.id='pageContainer';
        var nclass=this;
        var styleElement = document.createElement('style');
        styleElement.textContent=`
            #pageContainer{
                width:calc(100vw - 60px);
                height:100vh;
                margin-left:60px;
                display:flex;
                flex-flow:row;

            }
            #roomsExplorer{
                width:200px;
                height:100vh;
                display:flex;
                flex-flow:column;
                
            }
            #room{
                width:calc(100vw - 260px);
                height:100vh;
                display:flex;
                flex-flow:column;
                background-color:rgba(200,200,200,1);
            }
            #room::-webkit-scrollbar {
                display:none;
            }
            #room-info{
                font-size:large;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
                width:calc(100vw - 260px);
                height:30px;
                display:flex;
                flex-flow:row;
                justify-content:space-around;
                background-color:rgba(220,220,220,1);
            }
            #room-content{
                width:100%;
                height:calc(100vh - 70px);
                overflow-y:auto;
            }
            #room-content::-webkit-scrollbar {
                display:none;
            }
            .room-in-ex-2{
                margin-top:10px;
                font-size:large;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
                color:rgb(230,230,230);
                padding-left:20px;
            }
            .room-in-ex{
                margin-top:10px;
                padding-left:20px;
            }

            #room-input{
                height:40px;
                border:none;
                font-size:20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:400;
                padding-left:20px;
                padding-right:20px;
            }

            #room-input:focus{
                border:none;
                outline:0;
            }

            .room-in-ex-name{
                
                font-size:15px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:400;
                color:rgb(200,200,200);

            }

            .room-participants{
                padding-left:20px;
            }

            .room-participant{
                height:40px;
                display:flex;
                flex-flow:row;
            }

            .room-participant-name{
                height:40px;
                font-size:15px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:100;
                display:flex;
                flex-flow:column;
                justify-content:space-around;
                text-align:center;
                color:rgb(150,150,150);
            }

            .room-participant-avt{
                width:25px;
                height:25px;
                margin:7px;
                border-radius:15px;
                background-size:cover;
            }

            .comment{
                margin-top:10px;
                margin-bottom:10px;
                width:100%;
            }

            .comment-owner-info{
                display:flex;
                flex-flow:row;
            }

            .comment-owner-info-avt{
                width:25px;
                height:25px;
                margin:7px;
                border-radius:15px;
                background-size:cover;
            }

            .comment-owner-info-name{
                font-size:15px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:400;
                display:flex;
                flex-flow:column;
                justify-content:space-around;

            }

            .comment-content{
                padding:10px;
                font-size:20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
                background-color:rgb(100,200,255);
                margin-left:40px;
                margin-right:40px;
                border-radius:10px;
            }

            hr{
                padding:0;
                border:none;
                height:1px;
                background-color:rgba(0,0,0,0.2);
            }
            
        `;

        container.appendChild(styleElement);


        var roomsExplorerElement=document.createElement('div');
        roomsExplorerElement.id='roomsExplorer';

        var roomInExElement=document.createElement('div');
        roomInExElement.className='room-in-ex-2';
        roomInExElement.textContent="ChatRooms";

        var chatRoomsExElement=document.createElement('div');
        roomInExElement.appendChild(chatRoomsExElement);

        this.chatRoomsExElement=chatRoomsExElement;

        roomsExplorerElement.appendChild(roomInExElement);

        container.appendChild(roomsExplorerElement);

        
        var roomElement=document.createElement('div');
        roomElement.id='room';
        container.appendChild(roomElement);
        
        var roomInfoElement=document.createElement('div');
        roomInfoElement.id='room-info';
        roomElement.appendChild(roomInfoElement);
        
        var roomContentElement=document.createElement('div');
        roomContentElement.id='room-content';

        this.roomContentElement=roomContentElement;
        
        roomElement.appendChild(roomContentElement);

        var roomInput=document.createElement('input');
        roomInput.id=`room-input`;
        roomInput.addEventListener('keydown',(e)=>{
            if(e.key=="Enter"){
                nclass.AddComment(roomInput.value);
                roomInput.value='';
            }
        });
        roomElement.appendChild(roomInput);


        document.body.appendChild(container);
    }

    /*
    
        var name="Hung";

        var url="/images/avatar/avt-4.png";

        roomInExElement.innerHTML+=`
            <div class="room-in-ex">
                <div class="room-in-ex-name">
                    Room 1
                </div>
                <div class="room-participants">
                    <div class="room-participant">
                        <div class="room-participant-avt" style="background-image:url('${url}');">
                            
                        </div>
                        <div class="room-participant-name">
                            ${name}
                        </div>
                    </div>
                </div>
            </div>
        `;
    */

    CreateChatRoom(){

    }

    AddComment(value){
        var nclass=this;
        var comment={
            "owner":nclass.uid,
            "content":value
        };
        var roomId=this.currentChatRoomid;
        this.server__AddComment(comment,roomId);
    }

    server__AddComment(comment,roomId,clientSocket){
        try{
            var chatroomsDataNClass=framework.ImportNClass('server.user.chatrooms');
            chatroomsDataNClass.rooms[roomId].comments.push(comment);
            var room=chatroomsDataNClass.rooms[roomId];
            var participantIds=Object.keys(room.participants);
            for(var participantId of participantIds){
                var clientSocket=this.clientSockets[participantId];
                try{
                    this.client__UpdateComments(roomId,room.comments,clientSocket);
                }
                catch{
    
                }
            }
            chatroomsDataNClass.SaveRoomsData();
        }
        catch{
            
        }
        
    }

    GetChatRooms(){
        this.server__GetChatRooms(this.uid);
    }

    async server__GetChatRooms(uid,clientSocket){
        this.clientSockets[uid]=clientSocket;
        var chatRooms=new Object();

        var usersDataNClass=framework.ImportNClass('server.user.data');
        var users=usersDataNClass.users;
        var user=users[uid];

        var chatroomsDataNClass=framework.ImportNClass('server.user.chatrooms');
        var rooms=chatroomsDataNClass.rooms;
        
        var roomIds=Object.keys(user.chatrooms);

        var firestore=framework.ImportNClass("server.firebase.firestore").fireStore;

        for(var roomId of roomIds){
            var room=rooms[roomId];
            var participants=room.participants;
            var participantIds=Object.keys(participants);
            if(participants[room.owner]==null){
                chatroomsDataNClass.rooms[roomId].participants[room.owner]=(room.owner);
                participantIds.push(room.owner);
            }
            room.participantsData=new Object();

            for(var participantId of participantIds){
                var participantData=await firestore.collection('users').doc(participantId).get();
                participantData=participantData.data();
                room.participantsData[participantId]=participantData;
            }
            chatRooms[roomId]=room;
        }

        this.client__ShowChatRooms(chatRooms,clientSocket);
    }


    client__ShowChatRooms(chatRooms){
        var chatRoomIds=Object.keys(chatRooms);
        this.chatRooms=chatRooms;
        var totalInnerHTML=``;

        for(var chatRoomId of chatRoomIds){
            var chatRoom=chatRooms[chatRoomId];
            const chatRoomId2=chatRoomId;
            var participantsInnerHTML=``;

            var participantIds=Object.keys(chatRoom.participantsData);

            for(var participantId of participantIds){
                var participant=chatRoom.participantsData[participantId];
                var name=participant.name;
                var url=`/images/avatar/avt-${participant.avatarId}.png`;
                var pInnerHTML=`
                    
                <div class="room-participant">
                    <div class="room-participant-avt" style="background-image:url('${url}');" onclick="window.location.href=window.origin+'/userInfo/${participantId}'">
                        
                    </div>
                    <div class="room-participant-name">
                        ${name}
                    </div>
                </div>
                `;
                participantsInnerHTML+=pInnerHTML;
            }
            var innerHTML=`
                <div class="room-in-ex">
                    <div class="room-in-ex-name" onclick="framework.ImportNClass('client.pages.chat').OpenRoom(${chatRoomId2});">
                        ${chatRoom.name}
                    </div>
                    <div class="room-participants">
                        ${participantsInnerHTML}
                    </div>
                </div>
            `;

            

            totalInnerHTML+=innerHTML;
        }

        this.chatRoomsExElement.innerHTML=totalInnerHTML;
        
        if(chatRoomIds.length>0){

            var cid=localStorage.getItem('currentChatRoomid');
            if(cid==null){
                this.OpenRoom(chatRoomIds[0]);
            }
            else{
                this.OpenRoom(cid);

            }
        }
    }

    OpenRoom(id){
        var chatRoom=this.chatRooms[id];
        this.currentChatRoomid=id;
        localStorage.setItem('currentChatRoomid',id);
        document.getElementById('room-info').textContent=`${chatRoom.name}: ${id}`;
        
        var totalInnerHTML=``;

        for(var comment of chatRoom.comments){

            var ownerAvtUrl=`/images/avatar/avt-${chatRoom.participantsData[comment.owner].avatarId}.png`;
            
            var flexDir=`flex-direction: row-reverse;`;

            if(this.uid!=comment.owner){
                flexDir=`flex-direction: row`;
            }
            else{
                
            }

            var commentOwnerInnerHTML=`
            <div class="comment-owner-info" style="${flexDir}">
                <div class="comment-owner-info-avt"  style="background-image:url('${ownerAvtUrl}');"  onclick="window.location.href=window.origin+'/userInfo/${comment.owner}'">
                </div>
                <div class="comment-owner-info-name">
                    ${chatRoom.participantsData[comment.owner].name}
                </div>
            </div>
            `;

            if(this.uid!=comment.owner){
                
            }
            else{
                
                commentOwnerInnerHTML=``;
            }

            var innerHTML=`
                <hr>
                <div class="comment">
                    ${commentOwnerInnerHTML}
                    <div style="display:flex;flex-flow:row;${flexDir}">
                        <div class="comment-content">
                            ${comment.content}
                        </div>
                    </div>
                </div>
                
            `;

            totalInnerHTML+=innerHTML;

        }

        this.roomContentElement.innerHTML=totalInnerHTML;
        this.roomContentElement.scrollTop = this.roomContentElement.scrollHeight;

    }


    UpdateComments(roomId,comments){
        console.log(comments);
        this.chatRoom=this.chatRooms[roomId];
        this.chatRoom.comments=comments;
        if(this.currentChatRoomid==roomId){
            this.OpenRoom(roomId)
        }
        
    }
    

    client__UpdateComments(roomId,comments){
        this.UpdateComments(roomId,comments);
    }

}