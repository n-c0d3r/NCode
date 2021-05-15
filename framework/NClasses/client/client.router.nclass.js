module.exports=(framework)=>{
    return framework.CreateNClass("router",class{
        constructor(){
            
        }

        SetUp(){
            this.Connect();
        }

        Connect(){
            var socket=io.connect(window.origin);
            this.socket=socket;
        }

        Start(){

        }

        CreateIORouting(query,e){
            var nclass=this;
            this.socket.on(query,(data)=>e.call(nclass,data));
        }
        
        SendToIOServer(query,data){
            this.socket.emit(query,data);
        }

    });
}