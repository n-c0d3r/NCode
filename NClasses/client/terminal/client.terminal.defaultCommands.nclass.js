[Render("nf-js")]

[Require("fs","fs")]

[NClass("defaultCommands")]

class{
    constructor(){

        this.avatarCount=7;

        var nclass=this;
        this.defaultCommands={
            "addfriend":{
                method:(id)=>{
                    
                }
            },
            "uid":{
                method:(input)=>{
                    var uid=firebase.auth().currentUser.uid;
                    nclass.defaultCommands.terminal.log.jsMethod("uid",`${uid}`,"rgb(200,255,200)");
                }
            },
            "postIds":{
                method:(input)=>{
                    nclass.LogPostIdsToTerminal();
                }
            },
            "chatRoomIds":{
                method:(input)=>{
                    nclass.LogChatRoomIdsToTerminal();
                }
            },
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
            "nc":{
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
                            nclass.server__NCExecute(modulePath,pathInCommand);
                        }
                        else{
                            nclass.defaultCommands.terminal.log.jsMethod("nc execute",`"${input}" Not Found!!!`,"red");
                        }
                        
                    }
                }
            },
            "storage":{
                "filels":{
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
                            nclass.LogFiles(modulePath);
                        }
                        else{
                            nclass.defaultCommands.terminal.log.jsMethod("storage dir",`"${input}" Not Found!!!`,"red");
                        }
                    }
                },
                "dirls":{
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
                            nclass.LogDirs(modulePath);
                        }
                        else{
                            nclass.defaultCommands.terminal.log.jsMethod("storage dir",`"${input}" Not Found!!!`,"red");
                        }
                    }
                },
                "mkdir":{
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
                            nclass.CreateItem(modulePath,'folder');
                        }
                        else{
                            nclass.defaultCommands.terminal.log.jsMethod("storage mkdir",`"${input}" Not Found!!!`,"red");
                        }
                    }
                },
                "rmdir":{
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
                            if(input!='storage')
                                nclass.RemoveItem(modulePath,'folder');
                            else{
                                nclass.defaultCommands.terminal.log.jsMethod("storage rmdir",`Cannot Remove "Storage"!!!`,"red");

                            }
                        }
                        else{
                            nclass.defaultCommands.terminal.log.jsMethod("storage mkdir",`"${input}" Not Found!!!`,"red");
                        }
                    }
                },
                "del":{
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
                            if(input!='storage')
                                nclass.RemoveItem(modulePath,'file');
                            else{
                                nclass.defaultCommands.terminal.log.jsMethod("storage del",`Cannot Remove "Storage"!!!`,"red");

                            }
                        }
                        else{
                            nclass.defaultCommands.terminal.log.jsMethod("storage mkdir",`"${input}" Not Found!!!`,"red");
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

    //LogChatRoomIdsToTerminal

    LogChatRoomIdsToTerminal(){
        var uid=firebase.auth().currentUser.uid;
        this.server__LogChatRoomIdsToTerminal(uid);
    }

    server__LogChatRoomIdsToTerminal(uid,clientSocket){
        var usersDataNClass=framework.ImportNClass('server.user.data');
        var users=usersDataNClass.users;
        var user=users[uid];
        this.client__LogChatRoomIdsToTerminal(user.chatrooms,clientSocket);
    }

    client__LogChatRoomIdsToTerminal(chatroomIds){
        chatroomIds=Object.keys(chatroomIds);
        for(var chatroomId of chatroomIds){
            this.defaultCommands.terminal.log.jsMethod(`chatroomIds`,`${chatroomId}`,'rgb(200,200,200)');
        }
    }

    LogPostIdsToTerminal(){
        var uid=firebase.auth().currentUser.uid;
        this.server__LogPostIdsToTerminal(uid);
    }

    server__LogPostIdsToTerminal(uid,clientSocket){
        var usersDataNClass=framework.ImportNClass('server.user.data');
        var users=usersDataNClass.users;
        var user=users[uid];
        this.client__LogPostIdsToTerminal(user.posts,clientSocket);
    }

    client__LogPostIdsToTerminal(postIds){
        postIds=Object.keys(postIds);
        for(var postId of postIds){
            this.defaultCommands.terminal.log.jsMethod(`postIds`,`${postId}`,'rgb(200,200,200)');
        }
    }

    RemoveItem(path,type){
        this.server__RemoveItem(path,type);
    }

    server__RemoveItem(path,type){
        var fs=modules.fs;
        try{
            if(type=="folder"){
                fs.rmdirSync(framework.userStoragesDirPath+"/"+path, { recursive: true });
            }
            else{
                fs.unlinkSync(framework.userStoragesDirPath+"/"+path);
            }
        }
        catch{

        }
    }

    LogFiles(path){
        this.server__LogFiles(path);
    }

    server__LogFiles(path,clientSocket){
        var fs=modules.fs;
        try{
            var fileNames=[];
            var itemNames=fs.readdirSync(framework.userStoragesDirPath+"/"+path);
            for(var itemName of itemNames){
                if(fs.statSync(framework.userStoragesDirPath+"/"+path+"/"+itemName).isFile()){
                    fileNames.push(itemName);
                }
            }
            this.client__LogFiles(fileNames,clientSocket);
        }
        catch{

        }
    }

    client__LogFiles(files){
        for(var file of files){
            this.defaultCommands.terminal.log.jsMethod(`storage filels`,`${file}`,'rgb(100,255,0)');
        }
    }

    LogDirs(path){
        this.server__LogDirs(path);
    }

    server__LogDirs(path,clientSocket){
        var fs=modules.fs;
        try{
            var dirNames=[];
            var itemNames=fs.readdirSync(framework.userStoragesDirPath+"/"+path);
            for(var itemName of itemNames){
                if(fs.statSync(framework.userStoragesDirPath+"/"+path+"/"+itemName).isDirectory()){
                    dirNames.push(itemName);
                }
            }
            this.client__LogDirs(dirNames,clientSocket);
        }
        catch{

        }
    }

    client__LogDirs(dirs){
        for(var dir of dirs){
            this.defaultCommands.terminal.log.jsMethod(`storage dirls`,`${dir}`,'rgb(100,255,0)');
        }
    }

    CreateItem(newStrPath,type){
        var ideNClass=framework.ImportNClass('client.pages.ide');
        ideNClass.CreateItem(newStrPath,type);
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

    server__NCExecute(path,pathInCommand,clientSocket){
        var fs=modules.fs;
        if(fs.existsSync(framework.userStoragesDirPath+"/"+path)){
            var data=fs.readFileSync(framework.userStoragesDirPath+"/"+path).toString();
            this.client__NCExecute(data,path,pathInCommand,framework.userStoragesDirPath+"/"+path,clientSocket);

        }
    }

    client__NCExecute(data,path,pathInCommand,fullPath){
        var lines=data.split('\n');
        var terminalNClass=framework.ImportNClass("client.terminal");
        for(var line of lines){
            terminalNClass.ExecuteCommand(line);
        }
    }


    CreatePost(post){
        var generatedPostId=Date.now().toString();
        this.server__CreatePost(post,generatedPostId);
        return generatedPostId;
    }

    
    server__CreatePost(post,generatedPostId){
        var postsNClass=framework.ImportNClass('server.user.posts');
        postsNClass.CreatePost(post,generatedPostId);
    }

    CreateChatRoom(chatRoom,id){
        this.server__CreateChatRoom(chatRoom,id);
    }

    server__CreateChatRoom(chatRoom,id){
        var serverChatrooms=framework.ImportNClass('server.user.chatrooms');
        serverChatrooms.CreateRoom(chatRoom,id);

    }

    AddParticipantToChatRoom(crId,uid){
        this.server__AddParticipantToChatRoom(crId,uid);
        console.log(crId,uid);
    }

    server__AddParticipantToChatRoom(crId,uid){
        var serverChatrooms=framework.ImportNClass('server.user.chatrooms');
        serverChatrooms.AddParticipantToChatRoom(crId,uid);

    }

    ChangeChatRoomName(name,roomId){
        this.server__ChangeChatRoomName(name,roomId);
    }

    server__ChangeChatRoomName(name,roomId){
        var chatRoomsNClass=framework.ImportNClass('server.user.chatrooms');
        chatRoomsNClass.rooms[roomId].name=name;
        chatRoomsNClass.SaveRoomsData();
    }

    async ChangeUserName(name){
        var uid=framework.ImportNClass('client.user').userId;
        var userData=await firebase.firestore().collection('users').doc(uid).get();
        userData=userData.data();
        userData.name=name;
        firebase.firestore().collection('users').doc(uid).set(userData);
    }

    async ChangeUserAvatar(id){
        var uid=framework.ImportNClass('client.user').userId;
        var userData=await firebase.firestore().collection('users').doc(uid).get();
        userData=userData.data();
        userData.avatarId=id;
        document.getElementById('avt').style.backgroundImage=`url('/images/avatar/avt-${id}.png')`;
        firebase.firestore().collection('users').doc(uid).set(userData);
    }

    client__JSExecute(data,path,pathInCommand,fullPath){
        var finalCommandJS=`
        
        var defaultCommands=framework.ImportNClass("client.terminal.defaultCommands").defaultCommands;

        var terminalCommandsNClass=framework.ImportNClass("client.terminal.defaultCommands");

        var ExecuteCommand=function(command){
            terminalNClass=framework.ImportNClass("client.terminal");
            terminalNClass.ExecuteCommand(command);
        }

        var ChangeUserName=function(name){
            terminalCommandsNClass.ChangeUserName(name);
        }
        var ChangeUserAvatar=function(name){
            terminalCommandsNClass.ChangeUserAvatar(name);
        }

        var ChangeChatRoomName=function(name,roomId){
            terminalCommandsNClass.ChangeChatRoomName(name,roomId);
        }

        var CreateChatRoom=function(name){
            var owner=firebase.auth().currentUser.uid;
            var chatRoom={
                "comments":[],
                "name":name,
                "owner":owner,
                "participants":new Object()
            }
            var id=Date.now().toString();
            chatRoom.participants[owner]=owner;
            terminalCommandsNClass.CreateChatRoom(chatRoom,id);
        }

        var AddSomeoneToChatRoom=function(crId,uid){
            terminalCommandsNClass.AddParticipantToChatRoom(crId,uid);
        }

        var CreatePost=function(options,callback){
            var post={
                'owner':firebase.auth().currentUser.uid,
                'innerHTML':'',
                'reachs':new Object(),
                'comments':[]
            }

            Object.assign(post, options);

            post.AddTitle=function(title){
                post.innerHTML+='<h class="newfeed-post-title">'+title+'</h>';
            }

            post.AddContent=function(content){
                var contentElement=document.createElement('div');
                contentElement.textContent=content;
                contentElement.className='newfeed-post-content';
                var demoElement=document.createElement('div');
                demoElement.appendChild(contentElement);
                post.innerHTML+=demoElement.innerHTML;
            }

            post.AddInnerHTML=function(innerHTML){
                this.innerHTML+=innerHTML;
            }

            post.AddImage=function(imageUrl){
                
            }

            post.Demo=function(){
            }
            
            post.Push=function(){
                var nclass=framework.ImportNClass("client.terminal.defaultCommands");
                nclass.CreatePost(post);
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