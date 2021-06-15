[Render("nf-js")]

[NClass("user")]

class{
    constructor(){}

    SetUp(){

    }

    Start(){
        
    }

    async Register(name,email,password){
        var auth=framework.ImportNClass("server.firebase.auth");
        var result=await auth.Register(name,email,password);
        if(result.result){
            var user=result.user;
            var uid=user.uid;

            var firestoreNClass=framework.ImportNClass("server.firebase.firestore");
            var fireStore=firestoreNClass.fireStore;
            await fireStore.collection("users").doc(uid).set({
                "avatarId":0,
                "name":name
            });
            
            var storageNClass=framework.ImportNClass("server.user.storage");
            storageNClass.CreateUserStorage(user.uid);
        }
        return result;
    }

}