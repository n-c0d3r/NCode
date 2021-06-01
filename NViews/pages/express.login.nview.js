[Render("nf-js")]

[NView("login")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
            "client.firebase",
            "client.user",
            "client.webComponents",
            "client.webComponents.loginForm",
            "client.webComponents.background"
        ]);
        this.Routing("/login");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/login.ejs");
    }

}