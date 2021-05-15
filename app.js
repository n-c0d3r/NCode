
var settings=JSON.parse(require("fs").readFileSync("./settings.json").toString());

settings.Customize=function(framework) {
}

var framework=require("./framework/NightFramework")(settings);
