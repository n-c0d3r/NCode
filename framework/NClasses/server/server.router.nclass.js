module.exports=(framework)=>{
    return framework.CreateNClass("router",class{

        constructor(){
            this.socket_io_events=[
                {
                    query:"test",
                    e:(data)=>{
                        console.log(data);
                    }
                }

            ];
        }

        SetUp(){
            this.CreateServer();
            this.StartServer();
        }

        CreateIORouting(query,e){
            this.socket_io_events.push(
                {
                    query:query,
                    e:e
                }
            );
        }

        SendToIOClient(query,data,client_socket){
            client_socket.emit(query,data);
        }

        Start(){

            

        }

        CreateServer(){
            var express=require('express');
            var express_server=express();
            express_server.set('view engine','ejs');
            express_server.use(express.static("public"));
            this.express_server=express_server;
            this.framework.express_server=express_server;
        }

        StartServer(){
            var server=this.express_server.listen(framework.PORT);
            var socket_io=require('socket.io');
            var socket=socket_io(server);
            this.socket=socket;
            this.framework.socket=socket;
            this.framework.server=server;

            var router=this;

            var socket_io_events=this.socket_io_events;

            socket.on("connection",function(client_socket) {
                for(var socket_io_event of socket_io_events){
                    client_socket.on(socket_io_event.query,(data)=>socket_io_event.e.call(router,data,client_socket));
                }
            });

        }

    });
}