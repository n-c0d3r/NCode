[Render("nf-js")]

[Require("fs","fs")]

[NClass("ide")]

class{
    constructor(){
        try{
            try{
                this.filesInIDE=JSON.parse(localStorage.getItem("filesInIDE"));
                if(this.filesInIDE==null){

                    this.filesInIDE=new Object();
                }
            }
            catch{
                this.filesInIDE=new Object();
            }
            this.openedFilePath=localStorage.getItem("openedFilePath");

            this.filesData=null;
            this.filesDataObj=new Object();


        }
        catch{

        }


        this.fileExtensions={
            "js":true,
            "html":true,
            "css":true,
            "cpp":true,
            "png":true,
            "jpeg":true,
            "jpg":true,
            "cs":true,
            "py":true,
            "nc":true,
            "bat":true,
            "exe":true,
            "ejs":true,
            "txt":true,
            "dll":true,
            "php":true,
        }


    }

    SetUp(){
        
    }

    Start(){

    }


    ReloadFiles(filesData){
        this.filesData=filesData;
        var nclass=this;
        var obj=new Object();
        function addToList(node){
            obj[node.strPath]=node;
            node.childs.forEach(child=>{
                addToList(child);
            });
        }
        addToList(filesData);
        this.filesDataObj=obj;


        var keys=Object.keys(this.filesInIDE);

        var canOpen=0;
        var newObj=new Object();
        for(var key of keys){
            if(this.filesDataObj[key]==null){
                this.filesInIDE[key]=null;
            }
            else{
                newObj[key]=this.filesDataObj[key];
                canOpen++;
            }
        }
        this.filesInIDE=newObj;


        localStorage.setItem("filesInIDE",JSON.stringify(this.filesInIDE));

        var openedFilePath=this.openedFilePath;
        var input=document.getElementById("ide-code-input");

        var disableTextInput=false;
        if(this.filesInIDE[openedFilePath]==null){
            this.openedFilePath=keys[0];
            openedFilePath=this.openedFilePath;

            if(canOpen>0){
                disableTextInput=false;
                var key=Object.keys(this.filesInIDE)[0];
                var item=this.filesInIDE[key];
                this.OpenItem(item);
            }
            else{
                disableTextInput=true;
                input.value="";
            }
        }


        if(this.filesDataObj[openedFilePath]!=null)
            this.OpenItem(this.filesDataObj[openedFilePath]);
        

        //Update Files Explorer
        this.UpdateFilesExplorer();
        
        input.disabled = disableTextInput;
    }

    UpdateFilesExplorer(){
        var filesExplorer=framework.ImportNClass("client.webComponents.ide").ideExplorer;

        var spaceChr="&nbsp;";
        var tabChr=`${spaceChr}${spaceChr}${spaceChr}${spaceChr}${spaceChr}`;

        filesExplorer.innerHTML="";

        var nclass=this;

        function addToExplorer(node,show,customName){
            if(show==null){
                show=true;
            }


            var newNode=document.createElement("div");
            newNode.className="ide-file-in-explorer";

            newNode.file=node.file;

            if(true){
                var paddingLeft=4;
                for(var i=0;i<node.file.path.length-2;i++){
                    paddingLeft+=4;
                }
                newNode.style.paddingLeft=`${paddingLeft}px`;
                var textContentElement=document.createElement("div");
                textContentElement.className="ide-file-name-in-explorer";

                if(show){
                    textContentElement.textContent=node.file.name;

                }
                else{
                    textContentElement.textContent=customName;

                }
                var itemType="folder";

                var name=node.file.name;
                if(node.file.type=="file"){
                    var nameParts=name.split('.');
                    var extension=nameParts[nameParts.length-1];
                    itemType=extension;
                }

                var icon_url=`/images/ide/icons/`+itemType+`.png`;

                if(nclass.fileExtensions[itemType]==null){
                    icon_url=`/images/ide/icons/txt.png`;
                }

                if(itemType=="folder"){
                    icon_url=`/images/ide/icons/folderExpl.png`;
                }

                var iconElement=document.createElement("div");
                iconElement.style=`
                    width:17px;
                    height:17px;
                    background-size:cover;
                    background-image:url('${icon_url}');
                    margin-right:5px;
                    transition:0.2s;
                    position:absolute;
                    
                `;

                var itemNameContainer=document.createElement("div");
                itemNameContainer.style=`
                    display:flex;
                    flex-flow:row;
                
                `;
                itemNameContainer.appendChild(iconElement);
                itemNameContainer.appendChild(textContentElement);
                newNode.appendChild(itemNameContainer); 
                newNode.textContentElement=textContentElement;
                newNode.iconElement=iconElement;
                
                
            }

            
            newNode.domElement=newNode;

            newNode.childDoms=[];

            for(var i=0;i<node.file.childs.length;i++){
                var childNode={
                    file:node.file.childs[i],
                    childs:[],
                    domElement:null,
                    parent:newNode
                }
                
                childNode=addToExplorer(childNode,true);
                newNode.childDoms.push(childNode.domElement);
            }
            
            if(node.parent==null){
                filesExplorer.appendChild(newNode);

            }
            else{
                node.parent.domElement.appendChild(newNode);

            }

            var rightclick=function(evt,btns){
                evt.preventDefault();

                if(document.body.contextMenu==null){
                    document.body.contextMenu=document.createElement("div");
                    document.body.contextMenu.style=`
                    display:none;
                    transition:0.5s;
                    background-color:rgba(0,0,0,0);
                    `;
                }
                if(document.body.contextMenu.status=="visible"){
                    document.body.contextMenu.style=`
                    display:none;
                    transition:10s;
                    background-color:rgba(0,0,0,0);
                    `;
                }
                document.body.contextMenu.status="visible";
                
                document.body.appendChild(document.body.contextMenu);
                
                const {clientX:mouseX,clientY:mouseY} = evt;

                

                
                document.body.contextMenu.style.top=`${mouseY}px`;
                document.body.contextMenu.style.left=`${mouseX}px`;
                document.body.contextMenu.style.paddingLeft=`5px`;
                document.body.contextMenu.style.paddingRight=`5px`;
                document.body.contextMenu.style.display=`flex`;
                document.body.contextMenu.style.flexFlow=`column`;
                document.body.contextMenu.style.zIndex=`100`;
                document.body.contextMenu.style.position=`absolute`;
                document.body.contextMenu.style.color=`white`;
                document.body.contextMenu.style.border=`solid 0px rgba(90,90,90,1)`;
                document.body.contextMenu.style.backgroundColor=`rgba(40,40,40,1)`;
                document.body.contextMenu.style.borderRadius=`2px`;
                document.body.contextMenu.style.fontFamily=`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`;
                    
                document.body.contextMenu.innerHTML="";
                for(var btn of btns){
                    document.body.contextMenu.appendChild(btn);
                }
                
            }


            if(true){
                if(node.file.type=="folder"){
                    newNode.explained=true;
                    var onclick=function(){
                        newNode.explained=!newNode.explained;
                        if(newNode.explained){
                            newNode.iconElement.style.backgroundImage =`url('/images/ide/icons/folderExpl.png')`;
                            for(var element of newNode.childDoms){
                                element.style.display = "block";
                            }
                        }
                        else{
                            newNode.iconElement.style.backgroundImage =`url('/images/ide/icons/folderNonExpl.png')`;
                            for(var element of newNode.childDoms){
                                element.style.display = "none";                                
                            }
                            
                        }
                    }
                    newNode.textContentElement.addEventListener("click",onclick);
                    newNode.iconElement.addEventListener("click",onclick);

                    


                    var btns=[
                        (()=>{
                            var btn=document.createElement("div");
                            btn.style=`
                                padding-left:10px;
                                font-size:13px;
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                -khtml-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                                color:rgb(200,200,200);
                                display:flex;
                                flex-flow:row;
                                width:300px;
                                margin-top:10px;
                                margin-bottom:10px;
                            `;
                            
                            
                            var textElement=document.createElement("div");
                            textElement.textContent="Create Folder";
                            
                            btn.appendChild(textElement);

                            var namneInput=document.createElement("input");
                            namneInput.style=`
                                position:absolute;
                                right:10px;
                            `;

                            btn.appendChild(namneInput);

                            var done=function(){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                                var newStrPath = newNode.file.strPath + `/`+ namneInput.value;
                                nclass.CreateItem(newStrPath,"folder");
                            }

                            textElement.addEventListener("click",()=>{
                                done();
                            });

                            namneInput.addEventListener("keyup", function(event) {
                                if (event.key == "Enter") {
                                    event.preventDefault();
                                    done();
                                }
                            });

                            return btn;
                        })(),

                        (()=>{
                            var btn=document.createElement("div");
                            btn.style=`
                                padding-left:10px;
                                font-size:13px;
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                -khtml-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                                color:rgb(200,200,200);
                                display:flex;
                                flex-flow:row;
                                width:300px;
                                margin-top:10px;
                                margin-bottom:10px;
                            `;
                            
                            var textElement=document.createElement("div");
                            textElement.textContent="Create File";
                            
                            btn.appendChild(textElement);

                            var namneInput=document.createElement("input");
                            namneInput.style=`
                                position:absolute;
                                right:10px;
                            `;

                            btn.appendChild(namneInput);

                            var done=function(){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                                var newStrPath = newNode.file.strPath + `/`+ namneInput.value;
                                nclass.CreateItem(newStrPath,"file");
                            }

                            textElement.addEventListener("click",()=>{
                                done();
                            });

                            namneInput.addEventListener("keyup", function(event) {
                                if (event.key == "Enter") {
                                    event.preventDefault();
                                    done();
                                }
                            });

                            return btn;
                        })(),

                        (()=>{
                            var btn=document.createElement("div");
                            btn.style=`
                                padding-left:10px;
                                font-size:13px;
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                -khtml-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                                color:rgb(200,200,200);
                                display:flex;
                                flex-flow:row;
                                width:300px;
                                margin-top:10px;
                                margin-bottom:10px;
                            `;
                            
                            var textElement=document.createElement("div");
                            textElement.textContent="Rename";
                            
                            btn.appendChild(textElement);

                            var namneInput=document.createElement("input");
                            namneInput.style=`
                                position:absolute;
                                right:10px;
                            `;

                            btn.appendChild(namneInput);

                            var done=function(){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                                var newStrPath = ""+ namneInput.value;
                                for (var i=node.file.path.length-2;i>=0;i--){
                                    newStrPath = node.file.path[i] + "/" + newStrPath;
                                }
                                nclass.server__RenameItem(newNode.file.strPath,newStrPath);
                            }

                            textElement.addEventListener("click",()=>{
                                done();
                            });

                            namneInput.addEventListener("keyup", function(event) {
                                if (event.key == "Enter") {
                                    event.preventDefault();
                                    done();
                                }
                            });

                            return btn;
                        })(),

                        (()=>{
                            var btn=document.createElement("div");
                            btn.style=`
                                padding-left:10px;
                                font-size:13px;
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                -khtml-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                                color:rgb(200,200,200);
                                display:flex;
                                flex-flow:row;
                                width:300px;
                                margin-top:10px;
                                margin-bottom:10px;
                            `;
                            
                            
                            var textElement=document.createElement("div");
                            textElement.textContent="Delete";
                            
                            btn.appendChild(textElement);


                            var done=function(){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                                nclass.server__RemoveItem(newNode.file.strPath);
                            }

                            textElement.addEventListener("click",()=>{
                                done();
                            });


                            return btn;
                        })(),


                    ];

                    newNode.textContentElement.addEventListener('contextmenu', function(evt) { 
                        rightclick(evt,btns);
                    }, false);
                    newNode.iconElement.addEventListener('contextmenu', function(evt) { 
                        rightclick(evt,btns);
                    }, false);



                    document.body.addEventListener("click",(e)=>{
                        if(e.target.offsetParent!=document.body.contextMenu){
                            if(document.body.contextMenu!=null){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                            }
                            
                        }
                    });

                }
                else{
                    var onclick=function(){
                        var file=newNode.file;
                        nclass.OpenItem(file);
                    }
                    newNode.textContentElement.addEventListener("click",onclick);
                    newNode.iconElement.addEventListener("click",onclick);

                    newNode.textContentElement.addEventListener('contextmenu', function(evt) { 
                        rightclick(evt,btns);
                    }, false);
                    newNode.iconElement.addEventListener('contextmenu', function(evt) { 
                        rightclick(evt,btns);
                    }, false);
                    
                    var btns=[


                        (()=>{
                            var btn=document.createElement("div");
                            btn.style=`
                                padding-left:10px;
                                font-size:13px;
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                -khtml-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                                color:rgb(200,200,200);
                                display:flex;
                                flex-flow:row;
                                width:300px;
                                margin-top:10px;
                                margin-bottom:10px;
                            `;
                            
                            var textElement=document.createElement("div");
                            textElement.textContent="Rename";
                            
                            btn.appendChild(textElement);

                            var namneInput=document.createElement("input");
                            namneInput.style=`
                                position:absolute;
                                right:10px;
                            `;

                            btn.appendChild(namneInput);

                            var done=function(){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                                var newStrPath = ""+ namneInput.value;
                                for (var i=node.file.path.length-2;i>=0;i--){
                                    newStrPath = node.file.path[i] + "/" + newStrPath;
                                }
                                nclass.server__RenameItem(newNode.file.strPath,newStrPath);
                            }

                            textElement.addEventListener("click",()=>{
                                done();
                            });

                            namneInput.addEventListener("keyup", function(event) {
                                if (event.key == "Enter") {
                                    event.preventDefault();
                                    done();
                                }
                            });

                            return btn;
                        })(),


                        (()=>{
                            var btn=document.createElement("div");
                            btn.style=`
                                padding-left:10px;
                                font-size:13px;
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                -khtml-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                                color:rgb(200,200,200);
                                display:flex;
                                flex-flow:row;
                                width:300px;
                                margin-top:10px;
                                margin-bottom:10px;
                            `;
                            
                            
                            var textElement=document.createElement("div");
                            textElement.textContent="Delete";
                            
                            btn.appendChild(textElement);


                            var done=function(){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                                nclass.server__RemoveItem(newNode.file.strPath);
                            }

                            textElement.addEventListener("click",()=>{
                                done();
                            });


                            return btn;
                        })(),
                        


                    ];



                    document.body.addEventListener("click",(e)=>{
                        if(e.target.offsetParent!=document.body.contextMenu){
                            if(document.body.contextMenu!=null){
                                document.body.contextMenu.style=`
                                display:none;
                                transition:5s;
                                background-color:rgba(0,0,0,0);
                                `;
                                document.body.contextMenu.status="un-visible";
                            }
                            
                        }
                    });


                }
            }

            return newNode;

        }

        var filesData=this.filesData;

        this.rootFileInExpl={
            "file":filesData,
            "childs":[],
            "domElement":null,
            "parent":null
        };

        this.rootFileInExpl=addToExplorer(this.rootFileInExpl,false,"Storage");

    }

    CreateItem(path,type){
        if(type=="file"){
            this.server__CreateFile(path);
        }
        else{
            
            this.server__CreateFolder(path);
        }
    }

    server__CreateFile(path,clientSocket){
        var fs=modules.fs;
        var fullPath=framework.userStoragesDirPath+"/"+path;
        fs.writeFileSync(fullPath,"");
        var filesManageNClass=framework.ImportNClass("client.webComponents.ide.filesManage");
    }
    
    server__CreateFolder(path,clientSocket){
        var fs=modules.fs;
        var fullPath=framework.userStoragesDirPath+"/"+path;
        if (!fs.existsSync(fullPath)){
            fs.mkdirSync(fullPath);
        }
    }

    server__RenameItem(path,newPath){
        var fs=modules.fs;
        var fullPath=framework.userStoragesDirPath+"/"+path;
        var fullPath2=framework.userStoragesDirPath+"/"+newPath;
        fs.renameSync(fullPath,fullPath2);
    }

    server__RemoveItem(path){
        var fs=modules.fs;
        var fullPath=framework.userStoragesDirPath+"/"+path;
        fs.rmdirSync(fullPath,{ recursive: true });
    }

    OpenItem(item,where){
        if(where==null){
            where="fileList";
        }

        var filePath=item.strPath;
        if(item.type=="file"){
            this.openedFilePath=filePath;
            if(this.filesInIDE[filePath]==null){
                this.filesInIDE[filePath]=item;

            }
            
            if(this.filesInIDE[filePath]==null){
                this.AddToFileList(filePath,item);
            }
            else
            {
    
            }
    
            var input=document.getElementById("ide-code-input");
            input.value=item.data;
            input.disabled=false;
            input.path=filePath;
            
            localStorage.setItem("openedFilePath",filePath);
            localStorage.setItem("filesInIDE",JSON.stringify(this.filesInIDE));
        }
        

    }

    AddToFileList(filePath,file){
        this.filesInIDE[filePath]=file;
    }

    TrySaveData(path,data){
        this.server__TrySaveData(path,data);
    }

    server__TrySaveData(path,data,clientSocket){
        var fs=modules.fs;
        try{
            var path2 = framework.userStoragesDirPath + "/" + path;
            fs.writeFileSync(path2,data);
            this.client__SaveDataDone(clientSocket);

        }
        catch{

        }
    }

    client__SaveDataDone(){
        alert("Saved");
    }
    
}