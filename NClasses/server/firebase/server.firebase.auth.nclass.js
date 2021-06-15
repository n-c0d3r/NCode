[Render("nf-js")]

[NClass("auth")]

class{
    constructor(){}

    SetUp(){

    }

    Start(){
        
    }

    SetUpAuth(){
        
    }

    async Register(name,email,password){
        var auth=this.auth;
        try{
            var user = await auth.createUser({
                "email":email,
                "password":password
            });
            var parsedUser={
                'uid':user.uid
            }
            return {
                'result':true,
                'user':parsedUser
            };
        }
        catch(err){
            return {
                'result':false,
                'err':err
            };
        }
        
    }

}