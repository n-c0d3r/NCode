[Render("nf-js")]

[NView("login")]

class{
    constructor(){
        
    }
    SetUp(){
        this.UseNClasses([
            "client.webComponents"
        ]);
        this.Routing("/about");
        
    }

    Start(){
    }

    OnRequest(req,res){
        this.Render("pages/about.ejs");
    }

}