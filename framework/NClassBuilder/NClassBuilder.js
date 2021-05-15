const e = require('cors');
const fs = require('fs');

const { readdirSync } = require('fs')

var nclassSyntaxIndex=1;

var file_extension="nclass";

var customize_framework_file_extension="customer";

module.exports=class{
    constructor(framework){
        this.framework=framework;

    }


    Build(){
        var path=__dirname+'/../../NClasses';
        var default_path=__dirname+'/../NClasses';
        
        var NClassPaths=[];
        var default_NClassPaths=this.GetNClasses(default_path);
        var extend_NClassPaths=this.GetNClasses(path);

        NClassPaths=default_NClassPaths.concat(extend_NClassPaths);

        this.framework.NClassManager.paths=NClassPaths;


        var NClassLevels=this.GetLevels(NClassPaths);

        //console.log(NClassLevels);
        this.framework.NClassManager.global.highestLevel=NClassLevels.length;
        this.ImportLevels(NClassLevels);

        //console.log(this.framework.NClassManager.global.childs.server.childs.home.childs);

        //console.log(this.framework.ImportNClass("server.home.test"));
    }

    ImportLevels(NClassLevels){
        for(var i=0;i</*1;i++){//*/NClassLevels.length;i++){
            var NClasses=NClassLevels[i];
            for(var j=0;j<NClasses.length;j++){
                var NClass=NClasses[j];
                var base=this.framework.NClassManager.global;
                var NClassPath=NClass.NClassPath;
                
                for(var t=0;t<NClassPath.length-1;t++){
                    base=base.childs[NClassPath[t]];

                }

                
                var nclass=this.Import(NClass,base);
                

                base.childs[NClassPath[NClassPath.length-1]]=nclass;

                nclass.parent=base.childs[NClassPath[NClassPath.length-1]];
                
            }
        }
    }

    Import(NClassPath,base){
        //var nclass = require(NClassPath.path)(this.framework);
        //console.log(this.framework.nfjsRenderer);
        var nclass = (this.framework.nfjsRenderer.Import(NClassPath.path))(this.framework);
        nclass.path=NClassPath.NClassPath;
        nclass.filePath=NClassPath.path;
        return nclass;
    }

    GetLevels(NClassPaths){
        var result=[];

        var result2=new Object();

        var max=0;
        
        for(var i=0;i<NClassPaths.length;i++){
            var NClassPath=NClassPaths[i];
            var parts=NClassPath.name.split('.');            
            parts.splice(parts.length-2,2);
            if(parts.length<=max){
                if(result2[parts.length-1]==null)
                {
                    result2[parts.length-1]=[];
                }
                result2[parts.length-1].push(NClassPath);
            }
            else
            {
                max=parts.length;
                result2[parts.length-1]=[];
                result2[parts.length-1].push(NClassPath);
            }
        }
        for(var i=0;i<max;i++){
            result[i]=result2[i];
        }
        return result;
    }    

    GetNClasses(path){
        var value=[];
        var fileAndDirs=(readdirSync(path, { withFileTypes: true }));
        for(var fileOrDir of fileAndDirs){
            if(fileOrDir.isFile()){
                var data=new Object();
                data.name=fileOrDir.name;
                data.path=path+'/'+fileOrDir.name;
                var NClassPath=(data.name.split('.'));
                
                if(NClassPath[NClassPath.length-2]==file_extension){
                    NClassPath=(NClassPath.splice(0,NClassPath.length-2));
                    var NClassPathStr="";
                    for(var index=0;index<NClassPath.length;index++){
                        NClassPathStr+=NClassPath[index];
                        if(index!=NClassPath.length-1){
                            NClassPathStr+=".";
                        }
                    }
                    data.NClassPathStr=NClassPathStr;
                    data.NClassPath=NClassPath;
                    value.push(data);

                }
                else{
                    // if(NClassPath[NClassPath.length-2]==customize_framework_file_extension){
                    //     this.framework.customerPaths.push(data.path);
                    // }
                }
            }
            else
            {
                var value2=this.GetNClasses(path+'/'+fileOrDir.name);
                for(var fileOrDir2 of value2){
                    value.push(fileOrDir2);
                }
            }
        }
        return value;
    }

};