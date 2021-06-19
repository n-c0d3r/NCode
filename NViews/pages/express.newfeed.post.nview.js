[Render("nf-js")]

[NView("newfeed")]

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
            "client.pages.newfeed.post",
            "client.pages.newfeed"
        ]);
        this.Routing("/posts/:postId");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/newfeed.ejs");
    }

}