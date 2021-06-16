
var settings=JSON.parse(require("fs").readFileSync("./settings.json").toString());

settings.Customize=function(framework) {
    framework.NClassesDirPath=__dirname+"/NClasses";
    framework.userStoragesDirPath=__dirname+"/datas/userStorages";
    framework.usersDataDirPath=__dirname+"/datas/usersData/usersData.json";
}

var framework=require("./framework/NightFramework")(settings);
