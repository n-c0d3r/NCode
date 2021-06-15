[Render("nf-js")]

[Require("fs","fs")]

[NClass("filesManage")]

class{
    constructor(){
        this.clientSockets=new Object();
        this.filesWatch=[];
    }

    SetUp(){
        this.auth=framework.ImportNClass("client.firebase").firebase.auth();
        var nclass=this;
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                nclass.SetUserID(uid);
                nclass.server__Reload(uid);
            } else {
                window.location=window.origin;
            }
        });
    }

    Start(){

    }

    SetUserID(uid){
        this.uid=uid;
    }

    ReloadAll(){
        
    }

    server__Reload(uid,clientSocket){
        this.clientSockets[uid]=clientSocket;
        var data=this.GetUserStorage(uid);
        this.client__Reload(data,clientSocket);
    }

    GetFilesOrDirectoriesFromNode(uid,node){
        var fs=modules.fs;
        var strPath=node.strPath;
        var path2=framework.userStoragesDirPath+"/"+strPath;
        var filenames = fs.readdirSync(path2);
        var nclass=this;
        filenames.forEach(fileName => {
            var filePath=path2+"/"+fileName;
            var stat = fs.statSync(filePath);
            if(stat.isFile()){
                const newPath=[...node.path];
                newPath.push(fileName);
                var newStrPath=node.strPath+"/"+fileName;
                var data=fs.readFileSync(filePath).toString();
                var newNode={
                    "name":fileName,
                    "path":newPath,
                    "strPath":newStrPath,
                    "type":"file",
                    "childs":[],
                    "data":data
                }

                this.WatchFile(filePath,uid);
                node.childs.push(newNode);
            }
            else{
                const newPath=[...node.path];
                newPath.push(fileName);
                var newStrPath=node.strPath+"/"+fileName;
                var newNode={
                    "name":fileName,
                    "path":newPath,
                    "strPath":newStrPath,
                    "type":"folder",
                    "childs":[]
                }
                newNode = nclass.GetFilesOrDirectoriesFromNode(uid,newNode);
                this.WatchFile(filePath,uid);
                node.childs.push(newNode);
            }
        });
        return node;
    }

    GetUserStorage(uid){
        var fs=modules.fs;
        var rootNode={
            "name":uid,
            "path":[uid],
            "strPath":uid,
            "type":"folder",
            "childs":[]
        }
        var nclass=this;
        this.WatchFile(framework.userStoragesDirPath+"/"+uid,uid);
        
        rootNode=this.GetFilesOrDirectoriesFromNode(uid,rootNode);
        return rootNode;
    }

    WatchFile(path,uid){
        var fs=modules.fs;
        try{
            fs.watch(path,{},event=>{
                const newUid=uid;
                var clientSocket=this.clientSockets[newUid];
                try{
                    var data=this.GetUserStorage(newUid);
                    this.client__Reload(data,clientSocket);
                }
                catch{
    
                }
            }).on('error', ()=>{});
        }
        catch{

        }
        
    }

    client__Reload(data){
        this.files=data;
        var ideNClass=framework.ImportNClass("client.pages.ide");
        ideNClass.ReloadFiles(data);
    }
    

}