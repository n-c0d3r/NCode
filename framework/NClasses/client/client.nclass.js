[Render("nf-js")]

[NClass("client")]

class{
    constructor(){
        
    }

    SetUp(){
    }

    Start(){
        this.IO_Routing("run_client_method",(data)=>{
            var path="";
            for(var i=0;i<data.NClassPath.length;i++){
                path+=data.NClassPath[i];
                if(i!=data.NClassPath.length-1){
                    path+=".";
                }
            }
            var args=data.args;
            var client_nclass=this.framework.ImportNClass(path);
            client_nclass[data.methodName](...args);
        });
    }

    GetClientSource(nview){
        var result;
        return result;
    }

    RunServerMethod(methodName,args,NClassPath){
        var data=new Object();
        data.methodName=methodName;
        data.NClassPath=NClassPath;
        data.args=args;
        this.IO_Sending("run_server_method",data);
    }

}