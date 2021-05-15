const e = require('cors');
const fs = require('fs');

const { readdirSync } = require('fs')

var nviewSyntaxIndex=1;

var file_extension="nview";

module.exports=class{
    constructor(framework){
        this.framework=framework;

    }


    Build(){
        var path=__dirname+'/../../NViews';
        var default_path=__dirname+'/../NViews';
        
        var NViewPaths=[];
        var default_NViewPaths=this.GetNViews(default_path);
        var extend_NViewPaths=this.GetNViews(path);

        NViewPaths=default_NViewPaths.concat(extend_NViewPaths);

        
        this.framework.NViewManager.paths=NViewPaths;

        var NViewLevels=this.GetLevels(NViewPaths);
        this.framework.NViewManager.global.highestLevel=NViewLevels.length;
        this.ImportLevels(NViewLevels);


    }

    ImportLevels(NViewLevels){
        // for(var i=0;i</*1;i++){//*/NViewLevels.length;i++){
        //     var NViews=NViewLevels[i];
        //     for(var j=0;j<NViews.length;j++){
        //         var NView=NViews[j];
        //         var base=this.framework.NViewManager.global;
        //         var NViewPath=NView.NViewPath;
        //         for(var t=0;t<NViewPath.length-(nviewSyntaxIndex+1);t++){
        //             base=base.childs[NViewPath[t]];
        //         }

        //         var nview=this.Import(NView);
                
        //         base.childs[NViewPath[NViewPath.length-(nviewSyntaxIndex+1)]]=nview;

        //         nview.parent=base.childs[NViewPath[NViewPath.length-(nviewSyntaxIndex+1)]];

                
        //     }
        // }
        for(var i=0;i</*1;i++){//*/NViewLevels.length;i++){
            var NViews=NViewLevels[i];
            for(var j=0;j<NViews.length;j++){
                var NView=NViews[j];
                var base=this.framework.NViewManager.global;
                var NViewPath=NView.NViewPath;
                
                for(var t=0;t<NViewPath.length-1;t++){
                   base=base.childs[NViewPath[t]];
                }

                
                var nview=this.Import(NView,base);
                

                base.childs[NViewPath[NViewPath.length-1]]=nview;

                nview.parent=base.childs[NViewPath[NViewPath.length-1]];
                
            }
        }
    }

    Import(NViewPath){
        //var nview = require(NViewPath.path)(this.framework);
        
        var nview = (this.framework.nfjsRenderer.Import(NViewPath.path))(this.framework);
        nview.path=NViewPath.NViewPath;
        return nview;
    }

    GetLevels(NViewPaths){
        var result=[];
        
        // for(var NViewPath of NViewPaths){
        //     var parts=NViewPath.name.split('.');
        //     parts.splice(parts.length-2,2);
        //     if(parts.length<=result.length+1){
        //         if(result[parts.length-1]==null)
        //         {
        //             result[parts.length-1]=[];
        //         }
        //         result[parts.length-1].push(NViewPath);
        //     }
        //     else
        //     {
        //         result[parts.length-1]=[];
        //         result[parts.length-1].push(NViewPath);
        //     }
        // }

        var result=[];

        var result2=new Object();

        var max=0;
        
        for(var i=0;i<NViewPaths.length;i++){
            var NViewPath=NViewPaths[i];
            var parts=NViewPath.name.split('.');            
            parts.splice(parts.length-2,2);
            if(parts.length<=max){
                if(result2[parts.length-1]==null)
                {
                    result2[parts.length-1]=[];
                }
                result2[parts.length-1].push(NViewPath);
            }
            else
            {
                max=parts.length;
                result2[parts.length-1]=[];
                result2[parts.length-1].push(NViewPath);
            }
        }
        for(var i=0;i<max;i++){
            result[i]=result2[i];
        }
        return result;
    }    

    GetNViews(path){
        var value=[];
        var fileAndDirs=(readdirSync(path, { withFileTypes: true }));
        for(var fileOrDir of fileAndDirs){
            if(fileOrDir.isFile()){
                var data=new Object();
                data.name=fileOrDir.name;

                data.path=path+'/'+fileOrDir.name;
                var NViewPath=(data.name.split('.'));
                if(NViewPath[NViewPath.length-2]==file_extension){
                    NViewPath=(NViewPath.splice(0,NViewPath.length-2));

                    var NViewPathStr="";
                    for(var index=0;index<NViewPath.length;index++){
                        NViewPathStr+=NViewPath[index];
                        if(index!=NViewPath.length-1){
                            NViewPathStr+=".";
                        }
                    }

                    data.NViewPath=NViewPath;
                    value.push(data);

                }
            }
            else
            {
                var value2=this.GetNViews(path+'/'+fileOrDir.name);
                for(var fileOrDir2 of value2){
                    value.push(fileOrDir2);
                }
            }
        }
        return value;
    }

};