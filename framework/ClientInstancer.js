module.exports=(framework)=>{
    return new class{
        constructor(){
            this.framework=framework;
        }

        CreateInstance(){
            var NClassPaths=this.framework.NClassManager.paths;
            //console.log(NClassPaths);
        }

        CreateFiles(){

        }

    }();
}