[Render("nf-js")]

[NClass("userInfo")]

class{
    constructor(){}

    SetUp(){
    }   

    Start(){
        this.GetTargetUserInfo();

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
    }

}