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
                    width:100vw;
                    right:0;
                    display:flex;
                    flex-flow:row;
                }
                #ide-explorer{
                    padding-top:10px;
                    padding-bottom:10px;
                    width:200px;
                    height:calc(100vh - 20px);
                    margin-left:60px;
                    background-color:rgba(0,0,0,0.5);
                    z-index:50;
                    overflow-x:auto;
                    overflow-y:auto;

                    scrollbar-face-color: #646464;
                    scrollbar-base-color: #646464;
                    scrollbar-3dlight-color: #646464;
                    scrollbar-highlight-color: #646464;
                    scrollbar-track-color: #000;
                    scrollbar-arrow-color: #000;
                    scrollbar-shadow-color: #646464;
                    scrollbar-dark-shadow-color: #646464;
                }
                #ide-explorer::-webkit-scrollbar { width: 12px; height: 12px;}
                #ide-explorer::-webkit-scrollbar-button {  background-color: #666; border-radius: 6px;width:0px;height:0px;}
                #ide-explorer::-webkit-scrollbar-track {  background-color: #646464;}
                #ide-explorer::-webkit-scrollbar-track-piece { background-color: #000;}
                #ide-explorer::-webkit-scrollbar-thumb { height: 50px; background-color: #777; border-radius: 2px;}
                #ide-explorer::-webkit-scrollbar-corner { background-color: rgba(0,0,0,0);}}
                #ide-explorer::-webkit-resizer { background-color: rgba(0,0,0,0);}

                #ide-code{
                    height:100vh;
                    width:calc(100vw - 260px);
                    background-color:rgba(255,255,255,0.8);
                    background-size:calc(100vw - 260px);
                    background-image:url('/images/bg4.png');
                }
                #ide-code-input{
                    background-color:rgba(0,0,0,0);
                    border:none;
                    border-radius:0px;
                    color:rgba(0,0,0,0.7);
                    font-size:large;
                    font-weight:100px;
                    resize: none;
                    padding-left:25px;
                    padding-top:5px;
                    padding-right:5px;
                    padding-bottom:5px;
                    height:calc(100vh - 330px);
                    width:calc(100vw - 260px);                    
                    overflow-wrap: break-word;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    
                }
                #ide-terminal{
                    height:300px;
                    width:calc(100vw - 260px);        
                    background-color:rgb(10,10,10);

                }
                #ide-terminal-logs{
                    height:280px;
                    width:calc(100vw - 260px);   
                    overflow-x:auto;
                    overflow-y:auto;
                }
                #ide-terminal-logs::-webkit-scrollbar{
                    display:none;
                }
                .ide-terminal-log{
                    height:30px;
                    display:flex;
                    flex-flow:row;
                    padding-left:10px;
                    padding-right:10px;
                    padding-top:5px;
                    padding-bottom:5px;
                }
                .ide-terminal-log-title{
                    color:rgb(60,60,60);
                    font-weight:300;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    margin-left:10px;
                    margin-right:10px;
                }
                .ide-terminal-log-content{
                    font-weight:200;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    margin-left:10px;
                    margin-right:10px;
                }
                #ide-terminal-input{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    
                    width:calc(100vw - 260px);  
                    background-color:rgb(20,20,20);  
                    border:none;
                    height:20px;
                    padding-left:10px;
                    padding-right:10px;
                    padding-top:5px;
                    padding-bottom:5px;
                    color:white;
                }
                #ide-terminal-input:focus{
                    border:none;
                    outline:0;
                }
                #ide-code-input:focus{
                    outline:0px;
                }
                #ide-code-fileList{
                    padding-left:25px;
                    color:rgb(150,150,150);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    
                    background-size:calc(100vw - 260px);
                    background-image:url('/images/bg5.png');
                    height:30px;
                    width:calc(100vw - 260px); 
                    background-color:white;
                }
                .ide-file-in-explorer{
                    padding-left:12px;
                    color:rgb(200,200,200);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    
                }
                .ide-file-name-in-explorer{
                    font-size:15px;
                    padding-left:4px;
                    user-select: none;
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
                        <div id="ide-code">
                            <div id="ide-code-fileList">
                            </div>
                            <textarea id="ide-code-input" spellcheck="false" contenteditable="true">
                            </textarea>
                            <div id="ide-terminal">
                                <div style="width:100%;">
                                    <input type="text" id="ide-terminal-input"/>
                                </div>
                                <div id="ide-terminal-logs">

                                </div>
                            </div>
                        </div>
                    </div>


                `;


                nclass.Update();

            }


            


        }

        customElements.define("n-ide",this.htmlElement);

    }


    
    Update(){
        var nclass=this;
        var idePageNClass=framework.ImportNClass("client.pages.ide");
        var ideCodeInput=document.getElementById("ide-code-input");
        ideCodeInput.TrySave=function(){
            if(this.path!=null){
                try{
                    idePageNClass.TrySaveData(this.path,this.value);
                }catch{

                }
            }
        }
        document.addEventListener("keydown", function(e) {
            if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
              e.preventDefault();
              ideCodeInput.TrySave();
            }
          }, false);
        this.ideCodeInput=ideCodeInput;
        var ideExplorer=document.getElementById("ide-explorer");
        this.ideExplorer=ideExplorer;
        this.ideTerminalInput=document.getElementById("ide-terminal-input");
        this.ideTerminalInput.addEventListener("keydown",(e)=>{
            if(e.key=="Enter"){
                nclass.ExecuteCommandFromTerminal();
            }
        });
    }

    ExecuteCommandFromTerminal(){
        var command=this.ideTerminalInput.value;
        var terminal=framework.ImportNClass("client.terminal");
        terminal.ExecuteCommand(command);
        this.ideTerminalInput.value="";
    }

}