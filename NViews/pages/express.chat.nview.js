[Render("nf-js")]

[NView("chat")]

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
            "client.pages.chat"
        ]);
        this.Routing("/chat");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/chat.ejs");
    }

}