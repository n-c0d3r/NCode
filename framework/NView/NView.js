



var fs=require("fs");

module.exports = (name,__class,debug)=>{

    var result=class extends __class{
        constructor(){
            super();
            this.name=name;
            this.childs=new Object();

            if(debug!=null){
                debug.SetUpFor(this);
            }
            this.NClassPaths=[];
            this.NClassesRenderResult="";
        }
        baseSetUp(){
            this.UseNClasses("*");
            
            if(this.SetUp!=null)
                this.SetUp();
            
            this.NClassesRender();
        }
        baseStart(){
            if(this.Start!=null)
                this.Start();
        }

        baseOnRequest(req,res){
            this.req=req;
            this.res=res;
            if(this.OnRequest!=null){
                this.OnRequest(req,res);
            }
        }

        Routing(path){
            var view=this;
            var event=this.baseOnRequest;
            this.routingPath=path;
            this.framework.express_server.get(path,(req,res)=>{event.call(view,req,res)});
        }

        NClassesRender(){
            //console.log("NClassesRender");
            var result="";
            
            var NClassPaths=this.GetLevels(this.NClassPaths);
            this.NClassPaths=NClassPaths;

            //render default framework
            var client_framework_str=fs.readFileSync(this.framework.client_framework_path).toString();
            var client_nclass_str=fs.readFileSync(this.framework.client_nclass_path).toString();
            var client_nclassmanager_str=fs.readFileSync(this.framework.client_nclassmanager_path).toString();

            result+=client_framework_str;
            result+=`
                var module=new Object();
            `;
            result+=client_nclass_str;
            result+=`
                framework.NClass=module.exports
            `;
            result+=client_nclassmanager_str;


            for(var i=0;i<NClassPaths.length;i++){
                var NClassPath=NClassPaths[i];
                var NClass=this.framework.ImportNClass(NClassPath);
                var filePath=NClass.filePath;
                
                //var str=fs.readFileSync(filePath).toString();

                var str=this.framework.nfjsRenderer.ImportJS(filePath);

                var view=this;

                fs.watch(filePath, function (event, filename) {
                    if(event=="change"){
                        view.NClassesRender();
                    }
                });

                var str_head=`
                    var module = new Object();
                    module.path="${NClassPath}";
                    var path=module.path;
                    var base=framework.NClassManager.global;
                    var parts=path.split(".");
                    for(var i=0;i<parts.length-1;i++){
                        base=base.childs[parts[i]];
                    }
                `;

                var pathStr="[";
                for(var j=0;j<NClass.path.length;j++){
                    pathStr+="'"+NClass.path[j]+"'";
                    if(NClass.path.length-1!=j){
                        pathStr+=",";
                    }
                }
                pathStr+="]";

                var str_end=`
                    base.childs[parts[parts.length-1]]=module.exports;
                    base.childs[parts[parts.length-1]].path=${pathStr};
                `;

                str=str_head+"\n" +`
                var test=(framework)=>{
                `+str+`

                    
                    return module.exports;

                }

                var test2 = (test(framework))(framework);
                
                module.exports=test2;

                
                
                
                `+"\n"+str_end;

                result+=str;
            }


            var nviewPath="";
            for(var j=0;j<this.path.length;j++){
                nviewPath+=this.path[j];
                if(j!=this.path.length-1){
                    nviewPath+=".";
                }
            }

            result+=`
                framework.nviewPath="${nviewPath}";
                framework.SetUp();
                framework.Start();
            `;

            result="<script src='/socket.io/socket.io.js'></script><script>"+result+"</script>";


            this.NClassesRenderResult=result;
        }

        GetLevels(NClassPaths){
            var result=NClassPaths;
            for(var i=0;i<result.length;i++){
                for(var j=0;j<result.length;j++){
                    if(result[i].length<result[j].length){
                        var t=result[i];
                        result[i]=result[j];
                        result[j]=t;
                    }
                }
            }
            return result;
        }

        Render(src,option){
            var opt=new Object();

            opt.framework=this.NClassesRenderResult;

            if(option!=null)
            {
                for(var key of Object.keys(option)){
                    opt[key]=option[key];
                }
            }
            this.res.render(src,opt);
        }

        Send(data){
            this.res.send(data);
        }

        UseNClasses(paths){
            var NClassPaths=[];
            if(paths=="*"){
                for(var NClassPath of this.framework.NClassManager.paths){
                    if(NClassPath.NClassPath[0]=="client")
                        NClassPaths.push(NClassPath.NClassPathStr);
                }
            }
            else
            {
                NClassPaths=paths;
                var haveClientNClass=false;
                var haveClientRouterNClass=false;
                for(var NClassPath of paths){
                    if(NClassPath=="client"){
                        haveClientNClass=true;
                    }
                    if(NClassPath=="client.router"){
                        haveClientRouterNClass=true;
                    }
                }
                if(!haveClientNClass){
                    NClassPaths.push("client");
                }
                if(!haveClientRouterNClass){
                    NClassPaths.push("client.router");
                }
            }

            this.framework.NClassManager.DoWithAllNClass((NClass)=>{
                if(NClass.useForAllNView==true){
                    var array=NClass.path;
                    var strPath="[";
                    for(var i=0;i<array.length;i++){
                        strPath+=array[i];
                        if(i!=array.length-1){
                            strPath+=".";
                        }
                    }
                    strPath+="]"
                    console.log(strPath);
                    NClassPaths.push(strPath);
                }
            });

            this.NClassPaths=NClassPaths;
        }

    }

    

    result=new result();
    return result;

}
