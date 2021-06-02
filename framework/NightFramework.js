const fs = require('fs')

function DoWithFiles(path,method) {

    var fileAndDirs=(fs.readdirSync(path, { withFileTypes: true }));
    for(var fileOrDir of fileAndDirs){
        if(fileOrDir.isFile()){
            fileOrDir.path=path+"/"+fileOrDir.name;
            method(fileOrDir);
        }
        else
        {
            DoWithFiles(path+'/'+fileOrDir.name,method);
        }
    }

}


module.exports=(option)=>{ return new (
    class{
        constructor(){
            if(option.Customize!=null){
                option.Customize(this);
            }

            this.afterImportNClassEvents=[];

            this.projectDir=__dirname+"/../";

            this.client_framework_path=__dirname+'/client_instance/framework.js';
            this.client_nclass_path=__dirname+'/NClass/NClass.js';
            this.client_nclassmanager_path=__dirname+'/client_instance/NClassManager.js';

            this.ClientInstancer=require("./ClientInstancer")(this);

            this.PrintLogo();

            this.nfjsRenderer= (require('./nf-js/NFJSRender'))(this);

            this.PORT=option.PORT;
            if(option.PORT==null){
                this.PORT=7007;
            }
            else{
                this.PORT=option.PORT;
            }

            this.dataPath=option.dataPath;

            if(this.dataPath==null)
            {
                this.dataPath=__dirname+"/../data.json";
            }

            if(option.debug==null){
                this.debug=false;
            }
            else{
                this.debug=option.debug;
            }

            if(this.debug){
                this.debug=require('./debug/debug')(this);
            }
            else
                this.debug=null;

            this.customerPaths=[];

            this.nclasses=new Object();
            this.NClass=require('./NClass/NClass');
            this.NClassManager=new (require('./NClassManager/NClassManager'))(this);
            this.NClassBuilder=new (require('./NClassBuilder/NClassBuilder'))(this);
            this.NView=require('./NView/NView');
            this.NViewManager=new (require('./NViewManager/NViewManager'))(this);
            this.NViewBuilder=new (require('./NViewBuilder/NViewBuilder'))(this);

            this.StartCustomers();

            this.customRequireForNClassesAndNViews=new Object();

            this.Build();

            this.CustomRequireForNClassesAndNViews();
            
            this.InstanceForClient();

            this.SetUp();

            this.Start();
        
            this.Start_afterImportNClassEvents();
        }

        AddCustomRequires(requires){
            var keys=Object.keys(requires);
            for(var i=0;i<keys.length;i++){
                var key=keys[i];
                this.customRequireForNClassesAndNViews[key]=requires[key];
            }
        }

        CustomRequireForNClassesAndNViews(){
            var keys=Object.keys(this.customRequireForNClassesAndNViews);
            this.modules=new Object();
            for(var i=0;i<keys.length;i++){
                var key=keys[i];
                var requirePath=this.customRequireForNClassesAndNViews[key];
                var module=require(requirePath);
                this.modules[key]=module;
            }
        }

        Start_afterImportNClassEvents(){
            for(var e of this.afterImportNClassEvents){
                e();
            }
        }

        AfterImportNClass(f){
            this.afterImportNClassEvents.push(f);
        }

        StartCustomers(){
            var customerPaths=[];
            DoWithFiles(__dirname+"/../NClasses",(file)=>{
                var parts=file.name.split(".");
                var type=parts[parts.length-2];
                if(type=="customer"){
                    customerPaths.push(file);
                }
            });

            this.customerPaths=customerPaths;

            this.customers=new Object();

            for(var customerPath of this.customerPaths){
                var path=customerPath.path;
                var parts=customerPath.name.split(".");
                var name="";
                for(var i=0;i<parts.length-1;i++)
                {
                    name+=parts[i];
                    if(i!=parts.length-2){
                        name+=".";
                    }
                }
                
                this.customers[name]=require(path)(this);
            }
            if(Object.keys(this.customers).length>0)
                this.LogCustomers();
        }

        LogCustomers(){
            console.log();
            console.log();
            console.log("\x1b[30m","<Customers>","\x1b[37m");
            console.log(Object.keys(this.customers));
            console.log();
            console.log();
        }

        InstanceForClient(){
            //this.ImportNClass("client").InstanceForClient();\
            this.ClientInstancer.CreateInstance();
        }

        PrintLogo(){
            require('./logo_printer/logo_printer');
        }

        Build(){
            this.NClassBuilder.Build();
            this.NViewBuilder.Build();
        }

        CreateNClass(name,__class){
            var nclass = this.NClass(name,__class,this.debug);
            nclass.framework=this;
            nclass.NClassManager=this.NClassManager;
            return nclass;
        }

        CreateNView(name,__class){
            var nview = this.NView(name,__class,this.debug);
            nview.framework=this;
            nview.NViewManager=this.NViewManager;
            return nview;
        }

        SetUp(){
            this.NClassManager.SetUp();
            this.NViewManager.SetUp();
        }

        Start(){
            this.NClassManager.Start();
            this.NViewManager.Start();
            if(this.debug!=null)
                this.debug.Start();
        }

        SetUpNClass(nclass){
            nclass.baseSetUp(this);
        }

        StartNClass(nclass){
            nclass.baseStart();
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

        ImportNView(path){
            var result;
            var nodes=path.split('.');
            var base=this.NViewManager.global;
            for(var node of nodes){
                base=base.childs[node];
            }
            result=base;
            return result;
        }

        ImportWithFilePath(NClassPath,path){

        }

        customRequire(module){
            //return require(module);
            return require("module");
        }
    }
)};