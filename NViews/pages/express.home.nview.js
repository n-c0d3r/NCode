[Render("nf-js")]

[NView("home")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
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