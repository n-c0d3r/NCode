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
                    //background-color:rgb(9, 13, 15);
                    background-color:hsla(${180+parseInt(hue)}, 5%, 89%,1);
                    position:fixed;
                    top:0;
                    left:0;
                    z-index:999;
                    transition: 0.2s;
                    // border-bottom-right-radius:30px;
                    // border-top-right-radius:30px;
                    //border-radius:30px;
                    
                }

                #header:hover{
                    background-color:hsla(${180+parseInt(hue)}, 60%, 100%, 1);
                    width:150px;
                }

                #header:hover #avt{
                }

                #log-out{
                    position:absolute;
                    right:5px;
                    bottom:5px;
                    height:50px;
                    width:50px;
                    background-size:cover;
                    border-radius:25px;
                    transition:0.2s;
                    background-size:cover;
                    background-image:url('/images/icons/logout.png');
                    opacity:0.4;
                }

                #header:hover #log-out{
                    right:55px;
                }

                #log-out:hover{
                    opacity:1;
                }
                

                #avt{
                    height:50px;
                    width:50px;
                    background-size:cover;
                    border-radius:25px;
                    transition:0.2s;
                    margin-bottom:5px;
                    margin-top:5px;
                }

                #header-body{
                }

                .header-pageA{
                    margin-top:5px;
                    width:50px;
                    height:50px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    color:black;
                    display:flex;
                    flex-flow:row;
                    justify-content:space-around;
                    background-size:cover;
                    transition:0.2s;
                    border-radius:25px;
                }

                .header-pageA-container{
                    width:100%;
                    display:flex;
                    flex-flow:row;
                    justify-content:space-around;
                }

                #header:hover .header-pageA-container{
                    width:100%;
                    display:flex;
                    flex-flow:row;
                    justify-content:space-around;
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
                        

                        <div class="header-pageA-container">
                            <div id="avt">

                            </div>
                        </div>

                        <div style="width:100%;height:1px;background-color:rgba(200,200,200,1);">
                        </div>

                        <div id="header-body">
                            <div class="header-pageA-container">
                                <div class="header-pageA" style="background-image:url('/images/icons/home.png');" onclick="window.location.href='${window.origin+"/home"}';">
                                </div>
                            </div>
                            
                            <div class="header-pageA-container">
                                <div class="header-pageA" style="background-image:url('/images/icons/ide.png');" onclick="window.location.href='${window.origin+"/ide"}';">
                                </div>
                            </div>
                            
                        </div>
                        
                        
                        ${
                            (()=>{
                                if(localStorage.getItem('isLoggedIn')){
                                    return `
                                    
                                        <div id="log-out">
                                        </div>
                                    
                                    `;
                                }
                                else
                                {
                                    window.location.href=window.origin+'/login';
                                    return ' ';
                                }
                            })()
                            
                        }
                    </div>
                
                `;
                nclass.avt=document.getElementById("avt");
                nclass.SetUpAvt();
                nclass.logoutBtn=document.getElementById("log-out");
                nclass.logoutBtn.addEventListener("click",()=>{
                    nclass.LogOut();
                });

            }


            


        }

        customElements.define("n-header",this.htmlElement);

    }

    SetUpAvt(){
        var userNClass=framework.ImportNClass("client.user");
        userNClass.SetAvt();
    }


    LogOut(){
        console.log("logout");
        var userNClass=framework.ImportNClass("client.user");
        userNClass.LogOut();
    }


}