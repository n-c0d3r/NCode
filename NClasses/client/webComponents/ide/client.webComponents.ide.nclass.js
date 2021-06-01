[Render("nf-js")]

[NClass("ide")]

class{
    constructor(){}

    SetUp(){
        this.CreateWebComponent();
    }

    Start(){
    }


    CreateWebComponent(){

        var hue=localStorage.getItem("hueIde");
        if(hue!=null){

        }
        else{
            hue=0;
        }

        var style=`
            <style>
                #ide{
                    position:fixed;
                    height:100vh;
                    width:calc(100vw);
                    right:0;
                    background-color:black;
                    
                }
                #ide-explorer{
                    width:100%;
                    height:30px;
                    background-color:black;
                    z-index:50;
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
                        <div id="ide-explorer">
                        </div>
                    </div>


                `;

            }


            


        }

        customElements.define("n-ide",this.htmlElement);

    }


}