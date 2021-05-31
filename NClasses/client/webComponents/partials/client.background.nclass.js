[Render("nf-js")]

[NClass("home background")]

class{
    constructor(){}

    SetUp(){
        this.SetColor();
    }

    Start(){
    }

    SetColor(){

        var hue=localStorage.getItem("hueBg");
        if(hue!=null){
        }
        else{
            hue=0;
        }

        //document.body.style.backgroundColor=`hsl(${190+parseInt(hue)}, 50%, 1%)`;
        //document.body.style.backgroundColor=`hsl(180, 20%, 80%)`;

        document.body.style=`
            background-image:url('/images/bg3.png');
            background-size:cover;
        
        `;

    }

    

}