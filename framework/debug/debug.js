module.exports=(framework)=>{
    return new class{
        constructor(){
            this.framework=framework;
            
        }

        SetUpFor(obj){
            obj.Log=this.Log;
        }

        Log(...args){
            console.log();
            console.log("\x1b[30m","<\x1b[30m\\Night\x1b[30m>","\x1b[37m",...args);
            console.log();
        }
        
        Start(){
            this.StartGUITerminal();
        }

        StartGUITerminal(){

        }

    }();
}