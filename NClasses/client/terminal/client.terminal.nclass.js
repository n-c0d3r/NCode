[Render("nf-js")]

[NClass("terminal")]

class{
    constructor(){

        this.commands=new Object();

    }

    SetUp(){
        var defaultCommandsNClass=framework.ImportNClass('client.terminal.defaultCommands');
        this.defaultCommandsNClass=defaultCommandsNClass;
        this.commands = defaultCommandsNClass.LoadCommands();
    }

    Start(){
        
    }

    GetCommandPath(command){
        var result="";
        var started=false;
        var inputStart=-1;
        for(var i=0;i<command.length;i++){
            if(started){
                if(command[i]==":"){
                    inputStart=i+1;
                    break;
                }
                result+=command[i];
            }
            else{
                if(command[i]=="@"){
                    started=true;
                    continue;
                }
            }
            

        }
        var path=result.split('.');
        result={
            "path":path,
            "inputStart":inputStart
        };
        return result;
    }

    GetCommand(path){
        var result=this.commands;
        for(var i=0;i<path.length;i++){
            result=result[path[i]];
        }
        return result;
    }

    ExecuteCommand(command){
        try{
            var getCommandResult=this.GetCommandPath(command);
            var commandPath=getCommandResult.path;
            var input=command.substring(getCommandResult.inputStart, command.length);
            var command=this.GetCommand(commandPath);
            command.method(input);
        }
        catch(err){
            this.commands.terminal.log.jsMethod("ERROR","COMMAND NOT FOUND!!!","red");
        }
        
    }

    


}