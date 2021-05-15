framework.NClassManager=new class{
    constructor(){
        this.framework=framework;
        framework.NClassManager=this;
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
            var childNames=Object.keys(NClass.childs);
            for(var childName of childNames){
                var child=NClass.childs[childName];
                this.SetUpNClass(child);
            }
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


}();