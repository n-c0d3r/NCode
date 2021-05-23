[Render("nf-js")]

[NClass("fbase")]

class{
    constructor(){}

    SetUp(){
        this.firebase=window.firebase;
    }

    Start(){

        var nclass=this;

        var test = async function(){
            var response = await nclass.firebase.firestore().collection('users').get();
            console.log(response);
        } 
        test();
    }

}