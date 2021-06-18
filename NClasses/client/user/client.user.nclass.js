[Render("nf-js")]

[NClass("user")]

class{
    constructor(){
        this.clientSockets=new Object();
    }

    SetUp(){
        this.CheckIsLoggedIn();
        
    }

    Start(){
        
    }

    Login(){

        var nclass=this;
        var loginFormNClass=framework.ImportNClass("client.webComponents.loginForm");

        var email=loginFormNClass.emailInput.value;
        var password=loginFormNClass.passwordInput.value;

        var auth=framework.ImportNClass("client.firebase").firebase.auth();
        auth.signInWithEmailAndPassword(email,password)
        .then(user=>{
            loginFormNClass.HideErr();
            var userId=(user.user.uid);
            localStorage.setItem("userId",userId);
            localStorage.setItem("isLoggedIn",true);
            loginFormNClass.LoginDone();
            window.location.href=window.origin+'/home';
            
        })
        .catch(err=>{
            loginFormNClass.Err(err.message);
        });
        
    }


    LogOut(){
        var auth=framework.ImportNClass("client.firebase").firebase.auth();
        auth.signOut();
        localStorage.setItem("isLoggedIn",false);
        window.location.href=window.origin+'/login';
    }


    CheckIsLoggedIn(){
        this.isLoggedIn=localStorage.getItem("isLoggedIn");
        if(this.isLoggedIn==null){
            this.isLoggedIn=false;
            
        }
        if((this.isLoggedIn=="false" || this.isLoggedIn==false) && framework.nviewPath!="express.login" && framework.nviewPath!="express.register"){
            window.location.href=window.origin+"/login";
        }
    }

    SendFriendRequest(targetUid){
        var uid=firebase.auth().currentUser.uid;
        this.server__SendFriendRequest(uid,targetUid);

    }

    server__SendFriendRequest(uid,targetUid){
        var serverFriendNClass=framework.ImportNClass("server.user.friend");
        serverFriendNClass.SendFriendRequest(uid,targetUid);
    }

    ApplyFriendRequest(targetUid){
        var uid=firebase.auth().currentUser.uid;
        this.server__ApplyFriendRequest(uid,targetUid);

    }

    server__ApplyFriendRequest(uid,targetUid){
        var serverFriendNClass=framework.ImportNClass("server.user.friend");
        serverFriendNClass.ApplyFriendRequest(uid,targetUid);
    }

    async GetUserPublicData(){
        if(this.isLoggedIn){
            var firebase=framework.ImportNClass("client.firebase").firebase;
            this.userId=localStorage.getItem("userId");
            this.userData=(await firebase.firestore().collection('users').doc(this.userId).get()).data();
            if(this.userId!=null){  
                this.userAvatarId = this.userData.avatarId;
            }
            return this.userAvatarId;
        }
    }

    DeclineFriendRequest(targetUid){
        var uid=firebase.auth().currentUser.uid;
        this.server__DeclineFriendRequest(uid,targetUid);
    }

    server__DeclineFriendRequest(uid,targetUid){
        var serverFriendNClass=framework.ImportNClass("server.user.friend");
        serverFriendNClass.DeclineFriendRequest(uid,targetUid);

    }

    Unfriend(targetUid){
        var uid=firebase.auth().currentUser.uid;
        this.server__Unfriend(uid,targetUid);
    }

    async server__Unfriend(uid,targetUid){
        var serverFriendNClass=framework.ImportNClass("server.user.friend");
        serverFriendNClass.Unfriend(uid,targetUid);

    }

    async SetAvt(){
        this.header=framework.ImportNClass("client.webComponents.header");
        var avt=this.header.avt;

        if(this.isLoggedIn){
            this.GetUserPublicData()
            .then(userAvatarId=>{
                var image_url=`/images/avatar/avt-${userAvatarId}.png`;
                avt.style.backgroundImage=`url(${image_url})`;
            });            
        }
        else{
            
            image_url=`/images/avatar/avt-guess.png`;
    
            avt.style.backgroundImage=`url(${image_url})`;
        }
        

    }

}