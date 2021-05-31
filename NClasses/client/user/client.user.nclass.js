[Render("nf-js")]

[NClass("user")]

class{
    constructor(){}

    SetUp(){
        this.CheckIsLoggedIn();
        
    }

    Start(){
        
    }

    Login(){

        var nclass=this;
        var loginFormNClass=framework.ImportNClass("client.loginForm");

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
        if((this.isLoggedIn=="false" || this.isLoggedIn==false) && framework.nviewPath!="express.login"){
            window.location.href=window.origin+"/login";
        }
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

    

    async SetAvt(){
        this.header=framework.ImportNClass("client.header");
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