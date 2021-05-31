[Render("nf-js")]

[NView("login")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
            "client.firebase",
            "client.user",
            "client.loginForm",
            "client.background"
        ]);
        this.Routing("/login");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/login.ejs");
    }

}