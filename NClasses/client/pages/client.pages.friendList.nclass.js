[Render("nf-js")]

[NClass("friendList")]

class{
    constructor(){}

    SetUp(){
        this.SetUpFriendContainer();
        this.SetUpFriendRequestContainer();
        this.SetUpAddFriendBtn();
    }

    SetUpAddFriendBtn(){
        var btn=document.createElement('div');
        btn.id='addFriendBtn';
        var styleElement=document.createElement('style');
        styleElement.textContent=`
            #addFriendBtn{
                top:175px;
                left:60px;
                position:fixed;
                width:50px;
                height:50px;
                position:fixed;
                background-color:rgba(255,255,255,0.85);
                border-top-right-radius:10px;
                border-bottom-right-radius:10px;
                transition:0.2s;
                background-size:cover;
                background-image:url('/images/icons/addfriend.png');
            }
            #addFriendBtn:hover{
                width:400px;
                height:70px;
                overflow-y:auto;
                z-index:10;
                background-color:rgba(200,200,200,1);
                border-top-right-radius:10px;
                border-bottom-right-radius:10px;
                background-image:none;
                padding-top:30px;
                padding-bottom:30px;

            }
            #addFriendBtn:hover #addfriend-input{
                visibility: visible;
                width: calc(100% - 40px);
                border:none;
                outline:0;
                margin:0;
                padding:0;
                padding-left:20px;
                padding-right:20px;
                
            }
            #addfriend-input{
                visibility: hidden;
                width: 100%;
                border:none;
                outline:0;
                margin:0;
                padding:0;
                height:30px;
                background-color:rgba(255,255,255,0.2);
                font-size:15px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                
                
            }

            #addFriendBtn:hover #addfriend-btn{
                visibility: visible;
                width: calc(100% - 0px);
                border:none;
                outline:0;
                margin:0;
                margin-top:2px;
                padding:0;
                padding-left:20px;
                padding-right:20px;
                
            }
            #addfriend-btn{
                visibility: hidden;
                width: 100%;
                border:none;
                outline:0;
                margin:0;
                padding:0;
                height:30px;
                background-color:rgba(255,255,255,0);
                display:flex;
                flex-flow:row;
                justify-content:space-around;
                font-size:30px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                color:white;
            }
        `;
        btn.appendChild(styleElement);

        var inputElement=document.createElement('input');
        inputElement.setAttribute("type","text")
        inputElement.id=`addfriend-input`;
        btn.appendChild(inputElement);

        
        var afbtn=document.createElement('button');
        afbtn.id=`addfriend-btn`;
        afbtn.textContent=`Add Friend`;

        afbtn.addEventListener('click',()=>{
            var uNClass=framework.ImportNClass("client.user")
            uNClass.SendFriendRequest(inputElement.value)
        });

        btn.appendChild(afbtn);

        document.body.appendChild(btn);
    }

    SetUpFriendRequestContainer(){
        var container=document.createElement('div');
        container.id='friendRequestList-container';
        var title=document.createElement('div');
        title.id=`frqtitle`;
        title.textContent=`Friend Requests`;
        title.style=`
            font-size:30px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
            display:flex;
            flex-flow:row;
            justify-content:space-around;
            width:100%;
            background-color:rgba(200,200,200,0.7);
            padding-bottom:5px;
            color:rgba(255,255,255,1);
        `;
        container.appendChild(title);
        var styleElement=document.createElement('style');
        styleElement.textContent=`
            #friendRequestList-container{
                top:65px;
                left:60px;
                position:fixed;
                width:50px;
                height:50px;
                position:fixed;
                background-color:rgba(255,255,255,0.85);
                border-top-right-radius:10px;
                border-bottom-right-radius:10px;
                transition:0.2s;
                background-size:cover;
                background-image:url('/images/icons/bell2.png');
            }
            #friendRequestList-container #frqtitle{ 
                visibility: hidden;
            }
            #friendRequestList-container .friendRQ{ 
                visibility: hidden;
            }
            #friendRequestList-container:hover .friendRQ{ 
                visibility: visible;
            }
            #friendRequestList-container:hover #frqtitle{ 
                visibility: visible;

            }
            #friendRequestList-container:hover{
                top:60px;
                left:60px;
                position:fixed;
                width:400px;
                height:300px;
                position:fixed;
                padding-bottom:10px;
                right:0;
                overflow-y:auto;
                z-index:10;
                background-color:rgba(200,200,200,1);
                border-top-right-radius:10px;
                border-bottom-right-radius:10px;
                background-image:none;
            }
            .friendRQ{
                width:100%;
                height:50px;
                display:flex;
                flex-flow:row;
                justify-content:space-around;
                margin-top:10px;
                margin-bottom:10px;
            }
            .friendRQDataShower{
                background-color:rgba(255,255,255,0.1);
                padding-left:20px;
                padding-top:5px;
                padding-bottom:5px;
                height:50px;
                width:100%;
                display:flex;
                flex-flow:row;
                justify-content:center;
            }
            .friendAvt{
                width:50px;
                height:50px;
                background-size:cover;
                border-radius:25px;
                margin-right:20px;
            }
            .friendRQName{
                border-radius:25px;
                background-color:rgba(0,0,0,0);
                height:50px;
                background-size:cover;
                border-radius:25px;
                margin-right:20px;
                color:rgba(255,255,255,0.8);
                padding-left:20px;
                padding-right:20px;
                display:flex;
                flex-flow:column;
                justify-content:space-around;
                font-size:30px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .friendRQBtn{
                padding-left:17px;
                padding-right:17px;
                border-radius:25px;
                height:50px;
                font-size:30px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin-right:20px;
                display:flex;
                flex-flow:column;
                justify-content:space-around;
                color:rgba(255,255,255,1);
                filter:grayscale(100%);
            }
            .friendRQBtn:hover{
                filter:grayscale(0%);
            }
        `;
        container.appendChild(styleElement);

        document.body.appendChild(container);
    }

    SetUpFriendContainer(){
        var container=document.createElement('div');
        container.id='friendList-container';
        container.style=`
            width:calc(100vw - 60px);
            height:calc(100vh - 100px);
            position:fixed;
            padding-top:50px;
            padding-bottom:50px;
            right:0;
            overflow-y:auto;
        `;
        var styleElement=document.createElement('style');
        styleElement.textContent=`
            .friend{
                width:calc(100vw - 60px);
                height:50px;
                display:flex;
                flex-flow:row;
                justify-content:space-around;
                margin-top:10px;
                margin-bottom:10px;
            }
            .friendDataShower{
                background-color:rgba(150,150,150,0.9);
                padding-left:20px;
                padding-top:5px;
                padding-bottom:5px;
                height:50px;
                width:900px;
                display:flex;
                flex-flow:row;
                justify-content:center;
                border-radius:10px;
            }
            .friendAvt{
                width:50px;
                height:50px;
                background-size:cover;
                border-radius:25px;
                margin-right:20px;
            }
            .friendName{
                border-radius:25px;
                background-color:rgba(255,255,255,0);
                height:50px;
                background-size:cover;
                border-radius:25px;
                margin-right:20px;
                color:rgba(255,255,255,0.8);
                padding-left:20px;
                padding-right:20px;
                display:flex;
                flex-flow:column;
                justify-content:space-around;
                font-size:30px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .friendBtn{
                padding-left:17px;
                padding-right:17px;
                border-radius:25px;
                height:50px;
                font-size:30px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin-right:20px;
                display:flex;
                flex-flow:column;
                justify-content:space-around;
                color:rgba(255,255,255,1);
                background-color:rgba(255,255,255,1);
                filter:grayscale(100%);
            }
            .friendBtn:hover{
                color:rgba(255,255,255,1);
                background-color:rgba(255,255,255,1);
                filter:grayscale(0%);
            }
        `;
        container.appendChild(styleElement);

        document.body.appendChild(container);
    }

    Start(){
        var nclass=this;
        firebase.auth().onAuthStateChanged(user=>{
            if(user!=null){
                nclass.uid=user.uid;
                this.server__GetFriendRequestList(nclass.uid);
            }
        });
    }
    
    async server__GetFriendList(uid,client_socket){
        var userDataNClass=framework.ImportNClass('server.user.data');
        var friends=userDataNClass.users[uid].friends;

        var friendUids=Object.keys(friends);

        var friendsData=new Object();

        var fireStore=framework.ImportNClass('server.firebase.firestore').fireStore;

        for(var friendUid of friendUids){
            var fromFS=await fireStore.collection('users').doc(friendUid).get();
            fromFS=fromFS.data();
            var local=userDataNClass.users[friendUid];
            const friendUid2=friendUid;
            fromFS.uid=friendUid2;
            const friend = Object.assign(fromFS, local);
            friendsData[friendUid]=friend;

        }

        this.client__SetFriendList(friendsData,client_socket);
    }

    client__SetFriendList(friendList){
        this.ShowFriends(friendList);
    }

    async server__GetFriendRequestList(uid,client_socket){
        var userDataNClass=framework.ImportNClass('server.user.data');
        var friendRequests=userDataNClass.users[uid].friendRequests;

        var friendUids=Object.keys(friendRequests);

        var friendsData=new Object();

        var fireStore=framework.ImportNClass('server.firebase.firestore').fireStore;

        for(var friendUid of friendUids){
            if(friendRequests[friendUid].uid!=uid){
                var fromFS=await fireStore.collection('users').doc(friendUid).get();
                fromFS=fromFS.data();
                var local=userDataNClass.users[friendUid];
                const friendUid2=friendUid;
                fromFS.uid=friendUid2;
                const friend = Object.assign(fromFS, local);
                friendsData[friendUid]=friend;
            }
            

        }

        this.client__GetFriendRequestList(friendsData,client_socket);
    }

    client__GetFriendRequestList(friendList){
        //console.log(friendList);
        this.ShowFriendRequests(friendList);
        this.server__GetFriendList(this.uid);
    }

    ShowFriendRequests(friendList){
        var nclass=this;
        var friendUids=Object.keys(friendList);
        var container=document.getElementById('friendRequestList-container');
        for(var friendUid of friendUids){
            var friend = friendList[friendUid];
            var friendElement=document.createElement('div');
            friendElement.className="friendRQ";
            friendElement.friendData=friend;

            var friendDataShower=document.createElement('div');
            friendDataShower.className="friendRQDataShower";
            

            var friendAvt=document.createElement('div');
            friendAvt.className=`friendAvt`;
            friendAvt.style.backgroundImage=`url('/images/avatar/avt-${friend.avatarId}.png')`;

            friendDataShower.appendChild(friendAvt);

            const friendUid2=friendUid;

            var friendName=document.createElement('div');
            friendName.className=`friendRQName`;
            friendName.textContent=friend.name;

            friendDataShower.appendChild(friendName);

            var unFriend=document.createElement('div');
            unFriend.className=`friendRQBtn`;
            unFriend.textContent=`X`;
            unFriend.style.backgroundColor=`rgba(255,0,0,0.5)`;

            unFriend.addEventListener('click',()=>{
                var userNClass=framework.ImportNClass("client.user");
                userNClass.DeclineFriendRequest(friend.uid);
                friendElement.remove();
                window.location.href=window.location.href;
            });

            friendDataShower.appendChild(unFriend);

            var apply=document.createElement('div');
            apply.className=`friendRQBtn`;
            apply.textContent=`✓`;
            apply.style.backgroundColor=`rgba(0,255,0,0.5)`;

            
            apply.addEventListener('click',()=>{
                var userNClass=framework.ImportNClass("client.user");
                userNClass.ApplyFriendRequest(friend.uid);
                friendElement.remove();
                window.location.href=window.location.href;
            });

            friendDataShower.appendChild(apply);

            friendElement.appendChild(friendDataShower);

            container.appendChild(friendElement);
        }
    }

    ShowFriends(friendList){
        var friendUids=Object.keys(friendList);
        this.friends=friendList;
        var container=document.getElementById('friendList-container');
        var nclass=this;

        for(var friendUid of friendUids){
            var friend = this.friends[friendUid];
            var friendElement=document.createElement('div');
            friendElement.className="friend";
            friendElement.friendData=friend;

            var friendDataShower=document.createElement('div');
            friendDataShower.className="friendDataShower";

            var friendAvt=document.createElement('div');
            friendAvt.className=`friendAvt`;
            friendAvt.style.backgroundImage=`url('/images/avatar/avt-${friend.avatarId}.png')`;

            friendAvt.addEventListener('click',()=>{
                window.location.href=`${window.origin}/userInfo/${friend.uid}`;
            });

            friendDataShower.appendChild(friendAvt);

            var friendName=document.createElement('div');
            friendName.className=`friendName`;
            friendName.textContent=friend.name;

            friendDataShower.appendChild(friendName);
            
            var friendUid=document.createElement('div');
            friendUid.className=`friendName`;
            friendUid.textContent=`id: `+friend.uid;
            friendUid.style.color=`rgba(255,255,255,0.3)`;

            friendDataShower.appendChild(friendUid);

            var unFriend=document.createElement('div');
            unFriend.className=`friendBtn`;
            unFriend.textContent=`X`;
            unFriend.style.backgroundColor=`rgba(255,0,0,0.5)`;
            
            unFriend.addEventListener('click',()=>{
                var userNClass=framework.ImportNClass("client.user");
                userNClass.Unfriend(friend.uid);
                friendElement.remove();
                window.location.href=window.location.href;
            });

            friendDataShower.appendChild(unFriend);

            friendElement.appendChild(friendDataShower);

            container.appendChild(friendElement);
        }
    }

}