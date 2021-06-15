
var settings=JSON.parse(require("fs").readFileSync("./settings.json").toString());

settings.Customize=function(framework) {
    framework.NClassesDirPath=__dirname+"/NClasses";
    framework.userStoragesDirPath=__dirname+"/datas/userStorages";
}

var framework=require("./framework/NightFramework")(settings);
