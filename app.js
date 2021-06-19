
var settings=JSON.parse(require("fs").readFileSync("./settings.json").toString());

settings.Customize=function(framework) {
    framework.NClassesDirPath=__dirname+"/NClasses";
    framework.userStoragesDirPath=__dirname+"/datas/userStorages";
    framework.usersDataDirPath=__dirname+"/datas/usersData/usersData.json";
    framework.postsDataDirPath=__dirname+"/datas/usersData/posts.json";
    framework.chatroomsDataDirPath=__dirname+"/datas/usersData/chatrooms.json";
}

var framework=require("./framework/NightFramework")(settings);
