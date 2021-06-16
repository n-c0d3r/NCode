[Render("nf-js")]

[Require("fs","fs")]

[NClass("storage")]

class{
    constructor(){}

    SetUp(){
        this.fs=modules.fs;
    }

    Start(){

    }

    CreateUserStorage(uid){
        var fs=this.fs;
        //Create Folder
        var path=`${framework.userStoragesDirPath}/${uid}`;
        fs.mkdirSync(path);
        fs.writeFileSync(path+"/commands","");
    }

}