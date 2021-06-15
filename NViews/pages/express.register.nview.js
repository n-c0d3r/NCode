[Render("nf-js")]

[NView("register")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
            "client.firebase",
            "client.user",
            "client.webComponents",
            "client.webComponents.registerForm",
            "client.webComponents.background"
        ]);
        this.Routing("/register");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/register.ejs");
    }

}