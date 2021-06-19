[Render("nf-js")]

[NClass("userInfo")]

class{
    constructor(){}

    SetUp(){
        this.newfeedNClass=framework.ImportNClass('client.pages.newfeed');
        this.newfeedNClass.showOtherUserPosts=true;
    }   

    Start(){
        this.GetTargetUserInfo();
        this.newfeedNClass.otherUid=this.targetUid;

    }

    async GetTargetUserInfo(){
        var currentUrl=window.location.href;
        var currentUrlParts=currentUrl.split('/');
        this.targetUid=currentUrlParts[currentUrlParts.length-1];
        this.server__GetTargetUserInfo(this.targetUid);
    }

    async server__GetTargetUserInfo(targetUid,clientSocket){

        try{
            
            var fireStore=framework.ImportNClass("server.firebase.firestore").fireStore;
            var fromFirestoreData=await fireStore.collection("users").doc(targetUid).get();
            fromFirestoreData=fromFirestoreData.data();
            var userDataNClass=framework.ImportNClass("server.user.data");
            var localServerData=userDataNClass.users[targetUid];
            Object.assign(fromFirestoreData,localServerData);
    
            this.client__GetTargetUserInfo(fromFirestoreData,clientSocket);

        }
        catch{

        }
    }

    client__GetTargetUserInfo(user){
        this.targetUser=user;
        this.SetupPage();
    }

    SetupPage(){
        var user=this.targetUser;

        var nclass=this;

        var userInfoElement=document.createElement('div');
        userInfoElement.id='userInfo';

        var styleElement=document.createElement('style');
        styleElement.textContent=`
            #userInfo{
                padding-top:20px;
                margin-left:25vw;
                width:50vw;
            }
            .userAvt{
                width:100px;
                height:100px;
                border-radius:50px;
                background-size:cover;
            }
            .userName{
                padding-left:20px;
                padding-right:20px;
                font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
                font-size:50px;
                color:white;
                display:flex;
                flex-flow:row;
                justify-content:center;
            }
            .userId{
                padding-left:20px;
                padding-right:20px;
                font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:300;
                font-size:20px;
                color:rgba(255,255,255,0.5);
                display:flex;
                flex-flow:row;
                justify-content:center;
                padding-top:20px;
            }
        `;
        userInfoElement.appendChild(styleElement);


        userInfoElement.innerHTML+=`
            <div style="width:100%;display:flex;flex-flow:row;justify-content:space-around;">
                <div style="width:100%;height:100%">
                    <div style="width:100%;display:flex;flex-flow:row;justify-content:center;">
                        <div class="userAvt" style="background-image:url('/images/avatar/avt-${user.avatarId}.png')">
                        </div>

                        <div class="userName">
                            ${user.name} 
                        </div>
                    </div>
                    <div class="userId">

                        (id: ${this.targetUid})
                    </div>
                </div>

                
                
            </div>
        `;



        this.userInfoElement=userInfoElement;


        



        document.body.appendChild(userInfoElement);


    }

}