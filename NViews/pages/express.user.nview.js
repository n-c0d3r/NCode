[Render("nf-js")]

[NView("user")]

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
            "client.pages.userInfo",
            "client.pages.newfeed"
        ]);
        this.Routing("/userInfo/:uid");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/userInfo.ejs");
    }

}