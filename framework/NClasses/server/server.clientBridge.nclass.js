
module.exports=(framework)=>{
    return framework.CreateNClass("clientBridge",class{
        
        constructor(){
        }
        SetUp(){
        }
        Start(){
            this.IO_Routing("run_server_method",(data,client_socket)=>{
                var path="";
                for(var i=0;i<data.NClassPath.length;i++){
                    path+=data.NClassPath[i];
                    if(i!=data.NClassPath.length-1){
                        path+=".";
                    }
                }
                var args=data.args;
                var client_nclass=this.framework.ImportNClass(path);
                args.push(client_socket);
                client_nclass[data.methodName](...args);
            });
        }

        RunClientMethod(methodName,args,NClassPath,client_socket){
            var data=new Object();
            args.splice(args.length-1,1);
            data.args=args;
            data.methodName=methodName;
            data.NClassPath=NClassPath;
            this.IO_Sending("run_client_method",data,client_socket);
        }
        
    });
}