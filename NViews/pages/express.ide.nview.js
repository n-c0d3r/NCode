[Render("nf-js")]

[NView("ide")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
            "client.firebase",
            "client.user",
            "client.header",
            "client.ide",
            "client.background",
            "client.home"
        ]);
        this.Routing("/ide");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/ide.ejs");
    }

}