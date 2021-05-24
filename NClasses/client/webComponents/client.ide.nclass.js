[Render("nf-js")]

[NClass("header")]

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

            }


            


        }

        customElements.define("n-ide",this.hlmlElement);

    }


}