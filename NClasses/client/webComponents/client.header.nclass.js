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
        var hue=localStorage.getItem("hueHeader");
        if(hue!=null){

        }
        else{
            hue=0;
        }
        var style=`
            <style>
                #header{
                    height:100vh;
                    width:60px;
                    padding-top:60px;
                    //background-color:rgb(9, 13, 15);
                    background-color:hsla(${210+hue}, 13%, 100%,0.05);
                    position:fixed;
                    top:0;
                    left:0;
                    z-index:999;
                    transition: 0.3s;
                }

                #header:hover{
                    background-color:hsla(${210+hue}, 13%, 100%, 0.85);
                    width:150px;
                }

                #header:hover #avt{
                    right:55px;
                }

                

                #avt{
                    position:absolute;
                    right:5px;
                    top:5px;
                    height:50px;
                    width:50px;
                    background-size:cover;
                    border-radius:25px;
                    transition:0.3s;
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

                    <div id="header">
                        <div id="avt">

                        </div>
                    </div>
                
                `;
                nclass.avt=document.getElementById("avt");
                nclass.SetUpAvt();

            }


            


        }

        customElements.define("n-header",this.htmlElement);

    }

    SetUpAvt(){
        var userNClass=framework.ImportNClass("client.user");
        userNClass.SetAvt();
    }


}