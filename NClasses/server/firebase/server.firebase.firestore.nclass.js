[Render("nf-js")]

[NClass("firestore")]

class{
    constructor(){}

    SetUp(){

    }

    Start(){
        
    }

    async SetUpFireStore(){
        this.users=await this.fireStore.collection('users').get();
        //console.log(this.users);
    }

    GetUsers(){

    }

}