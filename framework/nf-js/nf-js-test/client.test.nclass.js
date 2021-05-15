[Render("nf-js")]

[NClass("test")]

class{
    constructor(){
        
    }

    SetUp(){
    }

    Start(){
        
        this.server__SayHello();
    }

    server__SayHello(client){
        console.log('Server HELLO');
        this.client__SayHello(client);
    }


    client__SayHello(){
        console.log("Client Hello");
    }
    

};