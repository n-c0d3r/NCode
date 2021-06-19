[Render("nf-js")]

[NView("home")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
            "client.firebase",
            "client.user",
            "client.webComponents",
            "client.webComponents.header",
            "client.webComponents.background",
            "client.pages",
            "client.pages.home"
        ]);
        this.Routing("/home");
        this.Routing("/");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/home.ejs");
    }

}