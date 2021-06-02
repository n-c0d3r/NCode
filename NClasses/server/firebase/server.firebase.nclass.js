[Render("nf-js")]

[Require("firebaseAdmin","firebase-admin")]

[Require("fs","fs")]

[NClass("firebase")]

class{
    constructor(){}

    SetUp(){
        this.SetUpAdmin();
    }

    SetUpAdmin(){
        var nclass=this;
        this.ReadPrivateKey();
        this.admin=modules.firebaseAdmin;
        this.admin.initializeApp({
            credential: nclass.admin.credential.cert(this.privateKey)
          });
        var auth=this.admin.auth();
        var fireStore=this.admin.firestore();
        
        var authNClass=framework.ImportNClass("server.firebase.auth");
        authNClass.auth=auth;
        authNClass.SetUpAuth();

        var firestoreNClass=framework.ImportNClass("server.firebase.firestore");
        firestoreNClass.fireStore=fireStore;
        firestoreNClass.SetUpFireStore();
    }

    ReadPrivateKey(){
        var fs=modules.fs;
        var data=fs.readFileSync(framework.NClassesDirPath+'/server/firebase/config.json').toString();
        this.privateKey=JSON.parse(data);
    }

    Connect(){

    }

    Start(){

    }

}