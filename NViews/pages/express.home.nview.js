[Render("nf-js")]

[NView("home")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
            "client.firebase",
            "client.user",
            "client.header",
            "client.home.background",
            "client.home"
        ]);
        this.Routing("/home");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/home.ejs");
    }

}