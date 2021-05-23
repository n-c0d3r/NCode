[Render("nf-js")]

[NClass("user")]

class{
    constructor(){}

    SetUp(){

    }

    Start(){
        
    }

    SetUpAvt(){
        this.header=framework.ImportNClass("client.header");

        var avt=this.header.avt;

        var avt_index=6;

        var image_url=`/images/avatar/avt-${avt_index}.png`;

        avt.style.backgroundImage=`url(${image_url})`;

    }

}