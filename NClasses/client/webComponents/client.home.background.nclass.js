[Render("nf-js")]

[NClass("home background")]

class{
    constructor(){}

    SetUp(){
        this.CreateWebComponent();
    }

    Start(){
        this.Apply();
    }

    Apply(){
        this.bg=new this.htmlElement();
        document.body.appendChild(this.bg);
    }

    CreateWebComponent(){

        var hue=localStorage.getItem("hueHomeBg");
        if(hue!=null){

        }
        else{
            hue=0;
        }

        var style=`
            <style>
                body{
                    background-color:hsla(${195+hue}, 50%, 2%, 1);
                }
            </style>
        `;


        this.htmlElement=class extends HTMLElement{
            constructor(){
                super();
                this.innerHTML=`
                
                    ${style}

                    
                
                `;
            }

            connectedCallback(){
                

            }
        }

        customElements.define("n-home-background",this.htmlElement);

    }

    

}