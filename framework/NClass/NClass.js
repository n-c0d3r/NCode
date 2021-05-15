const getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
  }

try{

    var fs=require('fs');
}
catch{

}

module.exports = (name,__class,debug)=>{

    var result=class extends __class{
        constructor(){
            super();
            this.name=name;
            this.childs=new Object();
            this.JSModuleImportEvent=new Object();

            if(debug!=null){
                debug.SetUpFor(this);
            }


        }
        baseSetUp(){
            if(this.path[0]=="client" && this.framework.isClient==true)
            {
                this.SetUpServerMethod();

            }
            if(this.SetUp!=null)
                this.SetUp();
            
        }

        

        baseStart(){
            
            if(this.Start!=null)
                this.Start();
    
        }

        Server(func){
            
        }

        ImportJS(name,callback){
            if(this.JSModuleImportEvent[name]==null){
                this.JSModuleImportEvent[name]=[];
            }
            this.JSModuleImportEvent[name].push((module)=>{
                callback(module);
                
            });
            this.server__ImportJS(name);
        }

        ServerImportJS(name){

        }

        server__ImportJS(name,client_socket){
            

            var parts=this.filePath.split("/");
            parts.splice(parts.length-1,1);
            var newPath="";
            for(var i=0;i<parts.length;i++){
                newPath+=parts[i];
                if(i!=parts.length-1){
                    newPath+="/";
                }
            }
            newPath+="/"+name;
            
            var str=fs.readFileSync(newPath).toString();

            this.client__ImportJS(name,str,client_socket);
            
        }

        client__ImportJS(name,str){
            var newStr="var module=new Object();\n";
            newStr+=str+"\n";
            newStr+="return module.exports\n";

            var f=new Function(newStr);

            var module=f();
            
            for(var f of this.JSModuleImportEvent[name]){
                f(module);
            }
        }

        SetUpServerMethod(){
            var methods=(getMethods(this));
            for(var i=0;i<methods.length;i++){
                var method=methods[i];
                var check=this.IsTaggedMethod(method);
                //console.log(check);
                if(check.result){
                    let hashtag=check.hashtag;
                    if(hashtag=="server"){
                        //let m=this[methodStr];
                        const methodStr=method;
                        this[methodStr]=function(...args){
                            //send args to server
                            this.framework.ImportNClass("client").RunServerMethod(methodStr,args,this.path);

                        }
                    }
                }
            }
        }

        SetUpClientMethod(){
            var methods=(getMethods(this));
            for(var i=0;i<methods.length;i++){
                var method=methods[i];
                var check=this.IsTaggedMethod(method);
                if(check.result){
                    let hashtag=check.hashtag;
                    var methodStr=method;
                    if(hashtag=="client"){
                        const methodStr=method;
                        this[method]=function(...args){
                            let client_socket;
                            if(args.length>=1)
                                client_socket=args[args.length-1];
                            else
                                client_socket=args[1];
                            //send args to server
                            this.framework.ImportNClass("server.clientBridge").RunClientMethod(methodStr,args,this.path,client_socket);

                        }
                    }
                }
            }
        }

        IO_Routing(query,e){
            var socket;
            if(this.framework.isClient==true){
                var client_router=framework.ImportNClass("client.router");
                client_router.CreateIORouting(query,e);
            }  
            else{
                var server_router=this.framework.ImportNClass("server.router");
                var nclass=this;
                server_router.CreateIORouting(query,(data,client_socket)=>e.call(nclass,data,client_socket));
            }
            
        }

        IO_Sending(query,data,client_socket){
            var socket;
            if(this.framework.isClient==true){
                var client_router=framework.ImportNClass("client.router");
                client_router.SendToIOServer(query,data);
            }  
            else{
                var server_router=this.framework.ImportNClass("server.router");
                server_router.SendToIOClient(query,data,client_socket);
            }
           
        }

        IsTaggedMethod(methodName){
            var result=new Object();
            result.result=false;
            var parts=methodName.split("__");
            if(parts[0]!=null && methodName.includes("__") && parts[0]!=""){
                result.result=true;
                result.hashtag=parts[0];
            }
            return result;
        }

        Routing(path,event){
            var view=this;
            this.routingPath=path;
            this.framework.express_server.get(path,(req,res)=>{event.call(view,req,res)});
        }

        UseForAllNView(){
            this.useForAllNView=true;
        }

    }

    

    result=new result();
    return result;

} 
