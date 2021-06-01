[Render("nf-js")]

[NView("setting")]

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
            "client.pages.setting"
        ]);
        this.Routing("/setting");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/setting.ejs");
    }

}