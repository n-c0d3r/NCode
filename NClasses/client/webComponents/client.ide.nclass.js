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
                #ide{
                    position:fixed;
                    height:100vh;
                    width:100vw;
                }
            </style>
        `;

        var nclass=this;

        this.htmlElement=class extends HTMLElement{
            constructor(){
                super();
            }

            connectedCallback(){
                this.innerHTML=`
                
                    ${style}
                
                    <div id="ide">
                    </div>


                `;

            }


            


        }

        customElements.define("n-ide",this.htmlElement);

    }


}