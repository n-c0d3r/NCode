module.exports = class{
    constructor(framework){
        this.framework=framework;
        this.global=framework.CreateNClass("global",class{
            constructor(){
                this.path=[];
            }
            
            SetUp(){

            }

            Start(){

            }

        });

        
    }

    SetUp(){
        this.SetUpNClass(this.global);
    }
    Start(){
        
        this.StartNClass(this.global);
    }

    SetUpNClass(NClass){
        if(NClass.path[0]!="client" || this.framework.isClient==true){
            NClass.baseSetUp();
            
        }
        else
        {
            if(NClass.path[0]=="client"){
                NClass.SetUpClientMethod();

            }
        }

        var childNames=Object.keys(NClass.childs);
        for(var childName of childNames){
            var child=NClass.childs[childName];
            this.SetUpNClass(child);
        }

        if(NClass.server__Log!=null){
            //console.log(NClass.server__Log.toString());
        }
        
    }

    StartNClass(NClass){
        
        if(NClass.path[0]!="client" || this.framework.isClient==true){
            NClass.baseStart();
            var childNames=Object.keys(NClass.childs);
            for(var childName of childNames){
                var child=NClass.childs[childName];
                this.StartNClass(child);
            }
        }
        
    }

    DoWithAllNClass(method){
        this.DoWithAllChilds(this.global,method);
    }

    DoWithAllChilds(NClass,method){
        method(NClass);
        var childs=NClass.childs;
        var childNames=Object.keys(childs);
        for(var childName of childNames){
            var child=NClass.childs[childName];
            this.DoWithAllChilds(child,method);
        }
    }
    
}



