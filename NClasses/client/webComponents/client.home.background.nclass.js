[Render("nf-js")]

[NClass("home background")]

class{
    constructor(){}

    SetUp(){
        this.CreateWebComponent();
    }

    Start(){

    }


    CreateWebComponent(){

        var style=`
            <style>
            
            </style>
        `;

        var nclass=this;

        this.hlmlElement=class extends HTMLElement{
            constructor(){
                super();
            }

            connectedCallback(){
                this.innerHTML=`
                
                    ${style}

                    
                
                `;
                nclass.background=this;
                nclass.SetUp();

            }


            


        }

        customElements.define("n-home-background",this.hlmlElement);

    }


    SetUp(){

    }
    

}