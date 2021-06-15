[Render("nf-js")]

[NClass("loginForm")]

class{
    constructor(){}

    SetUp(){
        this.CreateWebComponent();
    }

    Start(){
    }

    CreateWebComponent(){
        var nclass=this;
        var style=`
            <style>

                #loginForm{
                    height:379px;
                    background-color:rgba(0,0,0,0);
                    border-radius:20px;
                    display:flex;
                    flex-flow:row;
                }


                #loginForm-ncode{
                    border-top-left-radius:20px;
                    border-bottom-left-radius:20px;
                    
                    width:379px;
                    height:379px;
                    background-image:url('/images/icons/ncode-5.png');
                    background-size:cover;
                    transition:0.3s;
                }

                #loginForm-ncode:hover{
                    outline:0;
                    border:0;
                    background-image:url('/images/icons/ncode-4.png');
                }


                #loginForm-rightPart{
                    height:calc(379px - 80px);
                    display:flex;
                    flex-flow:column;
                    width:379px;
                    padding:40px;
                    background:white;
                    border-top-right-radius:20px;
                    border-bottom-right-radius:20px;
                    transition:0.5s;
                }

                .loginForm-input{
                    height:30px;
                    margin-bottom:20px;
                    border-radius:15px;
                    outline:0;
                    padding-left:20px;
                    padding-right:20px;
                    border:0;
                    background-color:hsl(199,10%,80%);
                    width:calc(100% - 40px);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    color:black;
                    font-size:20px;
                }

                .loginForm-input:focus{
                    //background-color:hsl(199,50%,70%);
                    border:solid 2px black;
                    height:26px;
                    width:calc(100% - 44px);
                }
                
                .loginForm-width100percent{
                    width:100%;
                }

                #loginBtn{
                    border:0;
                    height:35px;
                    border-radius:17px;
                    width:100%;
                    background-color:hsl(199,20%,55%);
                    outline:0;
                    margin-top:20px;
                    color:white;
                    transition:0.2s;
                    background-size:cover;
                    background-image: url('/images/button3.png');
                }

                #loginBtn:hover{
                    background-color:hsl(199,90%,55%);
                    background-image: url('/images/button2.png');
                }

                #loginForm-err{
                    display:flex;
                    flex-flow:row;
                    margin-top:12px;
                    color:white;
                    justify-content:space-around;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }

                #gotoRegister{
                    color:white;
                    font-size:20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    position:fixed;
                    right:calc(50vw - 150px);
                    bottom:20px;
                }


            </style>
        `;


        this.htmlElement=class extends HTMLElement{
            constructor(){
                super();
            }

            connectedCallback(){
                
                this.innerHTML=`
                
                    ${style}

                    <div style="width:100vw;height:100vh;display:flex;flex-flow:row;justify-content:space-around;">
                        <div style="height:100vh;display:flex;flex-flow:column;justify-content:space-around;">
                            <div id="loginForm">

                            
                                <div id="loginForm-ncode">
                                </div>

                                <!--<div style="height:100%;width:1px;background-color:rgb(170,170,170);">
                                </div>-->

                                <div id="loginForm-rightPart">
                                    <div class="loginForm-width100percent">
                                        <h4 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Email</h3>
                                        <input type="email" class="loginForm-input" id="emailLoginInput">
                                    </div>
                                    <div class="loginForm-width100percent">
                                        <h4 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Password</h3>
                                        <input type="password" class="loginForm-input" id="passwordLoginInput">
                                    </div>
                                    <div class="loginForm-width100percent">
                                        <button id="loginBtn">
                                            LOGIN
                                        </button>
                                    </div>

                                    <div class="loginForm-width100percent">
                                        <div id="loginForm-err">
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>

                    <a href="${window.origin}/register" id="gotoRegister">You dont have account? Register</a>

                `;

                nclass.rightPart=document.getElementById(`loginForm-rightPart`);
                nclass.emailInput=document.getElementById(`emailLoginInput`);
                nclass.passwordInput=document.getElementById(`passwordLoginInput`);
                nclass.loginBtn=document.getElementById(`loginBtn`);
                nclass.err=document.getElementById('loginForm-err');
                nclass.loginBtn.addEventListener("click",function(){
                    nclass.framework.ImportNClass("client.user").Login();
                });

            }
        }

        customElements.define("n-login-form",this.htmlElement);

    }

    Err(message){
        this.err.textContent=message;
        var nclass=this;
        nclass.rightPart.style.backgroundColor='red';
        setTimeout(()=>{
            nclass.HideErr();  
        },3000);
    }

    HideErr(){
        var nclass=this;
        nclass.rightPart.style.backgroundColor='white';
        this.err.textContent="";

    }

    LoginDone(){
        var nclass=this;
        nclass.rightPart.style.backgroundColor='rgb(90,255,100)';

    }


}