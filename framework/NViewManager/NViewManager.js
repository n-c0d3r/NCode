// module.exports = class{
//     constructor(framework){
//         this.framework=framework;
//         this.global=framework.CreateNClass("global",class{
//             constructor(){
//             }
//             SetUp(){
    
//             }
//             Start(){
                
//             }
//         });
 

//     }

    
    
// }

module.exports = class{
    constructor(framework){
        this.framework=framework;
        this.global=framework.CreateNView("global",class{
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
        this.SetUpNView(this.global);
    }
    Start(){
        
        this.StartNView(this.global);
    }

    SetUpNView(NView){
        NView.baseSetUp();
        var childNames=Object.keys(NView.childs);
        for(var childName of childNames){
            var child=NView.childs[childName];
            this.SetUpNView(child);
        }
        
    }

    DoWithAllNView(method){
        this.DoWithAllChilds(this.global,method);
    }

    DoWithAllChilds(NView,method){
        method(NView);
        var childs=NView.childs;
        var childNames=Object.keys(childs);
        for(var childName of childNames){
            var child=NView.childs[childName];
            this.DoWithAllChilds(child,method);
        }
    }

    StartNView(NView){
        
        if(NView.path[0]!="client"){
            NView.baseStart();
            var childNames=Object.keys(NView.childs);
            for(var childName of childNames){
                var child=NView.childs[childName];
                this.StartNView(child);
            }
        }
        
    }
    
}



