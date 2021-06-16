[Render("nf-js")]

[NView("ide")]

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
            "client.webComponents.ide",
            "client.webComponents.ide.filesManage",
            "client.terminal",
            "client.terminal.defaultCommands",
            "client.pages",
            "client.pages.ide"
        ]);
        this.Routing("/ide");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/ide.ejs");
    }

}