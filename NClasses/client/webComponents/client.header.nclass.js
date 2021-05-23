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
                #header{
                    height:50px;
                    width:calc(100vw - 10px);
                    background-color:rgb(7, 11, 13);
                    border-bottom-right-radius: 25px;
                    border-top-right-radius: 25px;
                    position:fixed;
                    top:10px;
                    left:0;
                    z-index:999;
                }

                body{
                    background-color:rgb(3, 5, 6);
                }

                #avt{
                    position:absolute;
                    right:0;
                    height:50px;
                    width:50px;
                    background-size:cover;
                    border-radius:25px;
                }

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

                    <div id="header">
                        <div id="avt">

                        </div>
                    </div>
                
                `;
                nclass.avt=document.getElementById("avt");
                nclass.SetUpAvt();

            }


            


        }

        customElements.define("n-header",this.hlmlElement);

    }

    SetUpAvt(){
        var userNClass=framework.ImportNClass("client.user");
        userNClass.SetAvt();
    }


}