[Render("nf-js")]

[NClass("user")]

class{
    constructor(){}

    SetUp(){
        this.CheckIsLoggedIn();
        
    }

    Start(){
        
    }

    CheckIsLoggedIn(){
        this.isLoggedIn=localStorage.getItem("isLoggedIn");
        if(this.isLoggedIn==null){
            this.isLoggedIn=false;
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
                console.log(userAvatarId);
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