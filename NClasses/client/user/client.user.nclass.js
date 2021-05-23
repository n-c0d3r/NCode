[Render("nf-js")]

[NClass("user")]

class{
    constructor(){}

    SetUp(){
        this.CheckIsLoggedIn();
        if(this.isLoggedIn){
            this.GetUserPublicData();
        }
    }

    Start(){
        
    }

    CheckIsLoggedIn(){
        this.isLoggedIn=localStorage.getItem("isLoggedIn");
        if(this.isLoggedIn==null){
            this.isLoggedIn=false;
        }
    }

    GetUserPublicData(){
        if(this.isLoggedIn){
            var firebase=framework.ImportNClass("client.firebase").firebase;
            this.userId=localStorage.getItem("user-id");
            this.userAvatarId=firebase.firestore().collection('users')
        }
    }

    async GetUserData(){
        
    }

    SetAvt(){
        this.header=framework.ImportNClass("client.header");

        var avt=this.header.avt;

        var avt_index=6;

        var image_url=`/images/avatar/avt-${avt_index}.png`;

        if(!this.isLoggedIn){
            image_url=`/images/avatar/avt-guess.png`;
        }

        avt.style.backgroundImage=`url(${image_url})`;

    }

}