[Render("nf-js")]

[NClass("registerForm")]

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
                #registerForm{
                    width:400px;
                    height:450px;
                    border-radius:20px;
                    background-color:white;
                    transition:0.3s;
                    background-size:cover;
                    padding-left:30px;
                    padding-right:30px;
                    padding-bottom:30px;
                    padding-top:10px;
                }
                #registerForm:hover{
                    background-size:cover;
                }
                *{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                
                }
                h4{
                    margin-top:40px;
                    margin-bottom:10px;
                }
                #registerForm input{
                    width: calc(100% - 40px);
                    border-radius:20px;
                    border:0;
                    background-color:rgb(210,210,210);
                    height:30px;
                    margin-top:10px;
                    padding-right:20px;
                    padding-left:20px;
                }

                #registerForm input:focus{
                    outline:0;
                    border:solid 2px black;
                    width: calc(100% - 44px);
                    height:26px;
                }

                #registerBtn{
                    margin-top:40px;
                    border:0;
                    height:32px;
                    border-radius:17px;
                    width:100%;
                    background-color:hsl(199,20%,55%);
                    outline:0;
                    color:white;
                    transition:0.2s;
                    background-size:cover;
                    background-image: url('/images/button3.png');
                    display:flex;
                    flex-flow:row;
                    justify-content:space-around;
                    padding-top:5px;
                }

                #registerBtn:hover{
                    background-color:hsl(199,90%,55%);
                    background-image: url('/images/button2.png');
                }
                

                #gotoLogin{
                    color:white;
                    font-size:20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    position:fixed;
                    right:calc(50vw - 150px);
                    bottom:20px;
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

                    <div style="width:100vw;display:flex;flex-flow:row;justify-content:space-around;">
                        <div style="height:100vh;display:flex;flex-flow:column;justify-content:space-around;">
                            <div id="registerForm">
                                <h4>name</h4>
                                <input type="text" id="nameInput"/>
                                <h4>Email</h4>
                                <input type="email" id="emailInput"/>
                                <h4>Password</h4>
                                <input type="password" id="passwordInput"/>
                                <div id="registerBtn">REGISTER</div>
                            </div>
                    </div>


                    
                    <a href="${window.origin}/login" id="gotoLogin">Already have an account? Login</a>


                `;

                var nameInput=document.getElementById('nameInput');
                var emailInput=document.getElementById('emailInput');
                var passwordInput=document.getElementById('passwordInput');
                var btn=document.getElementById('registerBtn');
                
                nclass.nameInput=nameInput;
                nclass.emailInput=emailInput;
                nclass.passwordInput=passwordInput;
                nclass.btn=btn;

                btn.addEventListener('click',()=>{
                    nclass.Register();
                });

            }
        }

        customElements.define("n-register-form",this.htmlElement);

    }


    Register(){
        var name=this.nameInput.value;
        var email=this.emailInput.value;
        var password=this.passwordInput.value;
        
        this.name=name;
        this.email=email;
        this.password=password;

        this.server__Register(name,email,password);
    }

    server__Register(name,email,password,client_socket){
        var serverUser=framework.ImportNClass("server.user");
        serverUser.Register(name,email,password)
        .then(data=>{
            this.client__FinallyRegister(data,client_socket);
        });
    }

    client__FinallyRegister(result){
        console.log(result.result);
        if(result.result){
            window.location.href=window.origin+"/login";
        }
        else{

        }
    }


}