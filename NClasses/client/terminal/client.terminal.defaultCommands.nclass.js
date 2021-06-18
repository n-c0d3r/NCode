[Render("nf-js")]

[Require("fs","fs")]

[NClass("defaultCommands")]

class{
    constructor(){

        var nclass=this;
        this.defaultCommands={
            "app":{

                "goto":{
                    method:(input)=>{
                        if(input=="ide"){
                            window.location.href = (window.origin+"/ide");
                        }
                        if(input=="home"){
                            window.location.href = (window.origin+"/home");
                        }
                        if(input=="friendList"){
                            window.location.href = (window.origin+"/friendList");
                        }
                        if(input=="ide"){
                            window.location.href = (window.origin+"/ide");
                        }
                    }
                },
                "newtab":{
                    method:(input)=>{
                        if(input=="ide"){
                            window.open(window.origin+"/ide");
                        }
                        this.done();
                    }
                },
                
            },
            "js":{
                "execute":{
                    method:(input)=>{
                        var modulePath="";
                        var start=0;
                        var pathInCommand="";
                        while(input[start]==" "){
                            start++;
                        }
                        if(input.substring(start,start+7)=="storage"){
                            pathInCommand=input.substring(start,input.length);
                            start=start+8;
                            modulePath=input.substring(start,input.length);
                            var uid=firebase.auth().currentUser.uid;
                            modulePath=uid+'/'+modulePath;
                            nclass.server__JSExecute(modulePath,pathInCommand);
                        }
                        else{
                            nclass.defaultCommands.terminal.log.jsMethod("js execute",`"${input}" Not Found!!!`,"red");
                        }
                        
                    }
                }
            },
            "terminal":{
                "log":{
                    jsMethod:(title,content,content_color)=>{
                        var defaultContentColor="rgb(120,120,120)";
                        if(content_color==null)
                            content_color=defaultContentColor;
                        var innerHTML=`
                        <div class="ide-terminal-log">
                            <div class="ide-terminal-log-title">
                                ${title}
                            </div>
                            <div class="ide-terminal-log-content" style="color:${content_color}">
                                ${content}
                            </div>
                        </div>
                        `;
                        var ide_terminal_logs_element=document.getElementById("ide-terminal-logs");
                        ide_terminal_logs_element.innerHTML=innerHTML+ide_terminal_logs_element.innerHTML;
                    },
                    method:(input)=>{
                        var defaultContentColor="rgb(120,120,120)";
                        
                        var innerHTML=`
                        <div class="ide-terminal-log">
                            <div class="ide-terminal-log-title">
                                terminal log
                            </div>
                            <div class="ide-terminal-log-content" style="color:${defaultContentColor}">
                                ${input}
                            </div>
                        </div>
                        `;
                        var ide_terminal_logs_element=document.getElementById("ide-terminal-logs");
                        ide_terminal_logs_element.innerHTML=innerHTML+ide_terminal_logs_element.innerHTML;
                    }
                }
            }
        };

    }

    SetUp(){

    }

    Start(){
        
    }


    LoadCommands(){
        var nclass=this;
        firebase.auth().onAuthStateChanged(function (user) {
            if(user){
                var uid=user.uid;
                nclass.server__GetCommandSourcesPaths(uid);
            }
        });
        return this.defaultCommands;
    }

    SaveCommand(pathInCommand){
        var uid=firebase.auth().currentUser.uid;
        this.server__SaveCommand(uid,pathInCommand);
    }

    server__SaveCommand(uid,pathInCommand){
        var fs=modules.fs;
        var data="";
        var commandsPath=framework.userStoragesDirPath+"/"+uid+"/commands";
        try{
            data=fs.readFileSync(commandsPath).toString();
        }
        catch{

        }
        if(!data.includes(pathInCommand))
            data+=`\n${pathInCommand}`;
        fs.writeFileSync(commandsPath,data);
    }

    server__GetCommandSourcesPaths(uid,clientSocket){
        var fullPath=framework.userStoragesDirPath+"/"+uid+"/commands";
        var fs=modules.fs;
        var data="";
        try{
            data=fs.readFileSync(fullPath).toString();
        }
        catch{

        }
        this.client__FinallyGetCommandSourcesPaths(data,clientSocket);
    }

    client__FinallyGetCommandSourcesPaths(data){
        var lines=data.split('\n');
        var terminal=framework.ImportNClass("client.terminal");
        for(var line of lines){
            if(line!=""){
                var command="@js.execute:"+line;
                terminal.ExecuteCommand(command);

            }

        }
    }

    server__JSExecute(path,pathInCommand,clientSocket){
        var fs=modules.fs;
        if(fs.existsSync(framework.userStoragesDirPath+"/"+path)){
            var data=fs.readFileSync(framework.userStoragesDirPath+"/"+path).toString();
            this.client__JSExecute(data,path,pathInCommand,framework.userStoragesDirPath+"/"+path,clientSocket);

        }
        
    }

    client__JSExecute(data,path,pathInCommand,fullPath){
        var finalCommandJS=`
        
        var defaultCommands=framework.ImportNClass("client.terminal.defaultCommands").defaultCommands;


        var CreatePost=function(options,callback){
            var post={
                'owner':firebase.auth().currentUser.uid,
                'innerHTML':''
            }

            Object.assign(post, options);

            post.AddTitle=function(title){
                post.innerHTML+='<h>'+title+'</h>';
            }

            post.AddContent=function(content){
                var contentElement=document.createElement('div');
                contentElement.textContent=content;
                post.innerHTML+=(contentElement.innerHTML);
            }

            post.AddImage=function(imageUrl){
                
            }

            post.Push=function(){
                console.log(post);
            }

            return post;
        }


        var Log=function(title,content,contentColor){
            defaultCommands.terminal.log.jsMethod(title,content,contentColor);
        }

        var SaveCommand=function(){
            var pathInCommand="${pathInCommand}";
            var terminalDefaultCommands=framework.ImportNClass("client.terminal.defaultCommands");
            terminalDefaultCommands.SaveCommand(pathInCommand);
        }

        var CreateCommand=function(path,method){
            var parts=path.split('.');
            var base=defaultCommands;
            for(var i=0;i<parts.length;i++){
                if(base[parts[i]]==null){
                    base[parts[i]]=new Object();
                    base = base[parts[i]];
                }
            }
            base.method=method;
            SaveCommand();
        }

        ${data}
        
        `;
        var command=Function(finalCommandJS);
        command();
    }

}