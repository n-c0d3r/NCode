var framework=new class{
    
    constructor(){
        this.isClient=true;
    }

    CreateNClass(name,__class){
        var nclass = this.NClass(name,__class,this.debug);
        nclass.framework=this;
        nclass.NClassManager=this.NClassManager;
        return nclass;
    }

    SetUp(){
        this.NClassManager.SetUp();
    }

    Start(){
        this.NClassManager.Start();
    }

    ImportNClass(path){
        var result;
        var nodes=path.split('.');
        var base=this.NClassManager.global;
        for(var node of nodes){
            base=base.childs[node];
        }
        result=base;
        return result;
    }

    AddCustomRequires(){
        
    }

}();

