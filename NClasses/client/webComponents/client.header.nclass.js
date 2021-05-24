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
                    height:100vh;
                    width:60px;
                    padding-top:60px;
                    //background-color:rgb(9, 13, 15);
                    background-color:rgba(170, 180, 190,0.05);
                    position:fixed;
                    top:0;
                    left:0;
                    z-index:999;
                    transition: 0.3s;
                }

                #header:hover{
                    background-color:rgba(170, 180, 190,0.1);
                    width:150px;
                }

                #header:hover #avt{
                    right:55px;
                }

                body{
                    background-color:rgb(3, 5, 6);
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